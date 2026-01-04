# Lights Room Card - Design Specification

> **Document Version:** 1.0  
> **Last Updated:** January 2026  
> **Status:** Ready for Implementation

## Overview

A Home Assistant custom Lovelace card for managing lights grouped by user-defined rooms. The card supports both basic on/off switches (e.g., Shelly relays) and smart lights (Philips Hue) with brightness control and scene selection. Designed following Material You design principles to match existing dashboard aesthetics.

### Key Features

- **Dynamic room grouping** - Users can create unlimited rooms and assign lights to them
- **Dual light type support** - Basic switches and Hue smart lights with different control options
- **Scene integration** - Automatic discovery of Hue scenes via Home Assistant's WebSocket API
- **Visual scene feedback** - Active scenes are reflected through color accents on light rows
- **Power monitoring** - Optional per-light and per-room power consumption display
- **Collapsible sections** - Rooms can be expanded/collapsed to manage screen space

---

## Table of Contents

1. [Visual Design](#visual-design)
2. [Component Architecture](#component-architecture)
3. [Configuration Schema](#configuration-schema)
4. [TypeScript Interfaces](#typescript-interfaces)
5. [Interaction Behaviors](#interaction-behaviors)
6. [Scene Discovery](#scene-discovery)
7. [Styling Guidelines](#styling-guidelines)
8. [Editor Implementation](#editor-implementation)
9. [File Structure](#file-structure)
10. [Implementation Notes](#implementation-notes)

---

## Visual Design

### Card Layout Structure

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Lights                                                        ⚡ 156 W  │
│                                                                          │
│  LIVING ROOM                                              38 W    ▾      │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ●  │ Ceiling Light                                   12 W      ⚙   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ●  │ Floor Lamp                                                    │  │
│  │────│───────────────────────────────────────────────────────────────│  │
│  │    │ [====================○─────────────────] 58%                  │  │
│  │    │                                                               │  │
│  │    │ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐           │  │
│  │    │ │ Relax │ │Energiz│ │Concent│ │ Read  │ │Bright │           │  │
│  │    │ │  🟠   │ │  🔵   │ │  ⚪   │ │  🟡   │ │  ⚪   │           │  │
│  │    │ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘           │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ○  │ Table Lamp                                        Off         │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                                          │
│  MASTER BEDROOM                                           24 W    ▾      │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ●  │ Bedside Left                                       8 W    ⚙   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ⚡ │ Wardrobe                                           16 W        │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                                          │
│  KITCHEN                                                          ▸      │
│  (collapsed - content hidden)                                            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Light Row States

#### Basic Switch Light (Shelly) - OFF
```
┌────────────────────────────────────────────────────────────────────┐
│  ○   Wardrobe                                              Off     │
└────────────────────────────────────────────────────────────────────┘
     ↑ Dim lightbulb-outline icon, secondary text color
```

#### Basic Switch Light (Shelly) - ON with Power
```
┌────────────────────────────────────────────────────────────────────┐
│  ⚡  Wardrobe                                              16 W    │
└────────────────────────────────────────────────────────────────────┘
     ↑ Bright amber lightbulb icon, power displayed
```

#### Hue Light - OFF
```
┌────────────────────────────────────────────────────────────────────┐
│  ○   Ceiling Light                                     Off     ⚙   │
└────────────────────────────────────────────────────────────────────┘
     ↑ Dim icon                                                   ↑ Expand button (always visible for Hue)
```

#### Hue Light - ON (Default White / No Scene)
```
┌────────────────────────────────────────────────────────────────────┐
│  ●   Ceiling Light                                     58%     ⚙   │
└────────────────────────────────────────────────────────────────────┘
     ↑ Warm white/amber glow on icon, brightness percentage shown
```

#### Hue Light - ON with Active Scene (Colored)
```
┌────────────────────────────────────────────────────────────────────┐
│▌ ●   Ceiling Light                                     58%     ⚙   │
└────────────────────────────────────────────────────────────────────┘
 ↑ 3px left accent bar in scene color
     ↑ Icon tinted/colored to match scene
```

#### Hue Light - Expanded State
```
┌────────────────────────────────────────────────────────────────────┐
│▌ ●   Floor Lamp                                        72%     ⚙   │
│  ──────────────────────────────────────────────────────────────────│
│                                                                    │
│   [==================●───────────────────────]  72%                │
│                                                                    │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│   │  Relax  │ │Energize │ │Concentr.│ │  Read   │                 │
│   │   🟠    │ │   🔵    │ │   ⚪    │ │   🟡    │                 │
│   │    ✓   │ │         │ │         │ │         │                 │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Scene Chip Design

```
┌─────────────┐
│  ● Relax    │   ← Normal state: color swatch + name
└─────────────┘

┌─────────────┐
│  ● Relax ✓  │   ← Active state: highlighted border + checkmark
└─────────────┘
```

Scene chips display:
- A circular color swatch showing the scene's primary color
- The scene name (truncated with ellipsis if too long)
- A checkmark or highlighted border when active

---

## Component Architecture

### Component Hierarchy

```
LightsRoomCard (main card)
├── CardHeader
│   ├── Title ("Lights")
│   └── TotalPower ("⚡ 156 W")
│
├── RoomSection[] (one per configured room)
│   ├── RoomHeader
│   │   ├── RoomName ("LIVING ROOM")
│   │   ├── RoomPower ("38 W")
│   │   └── CollapseToggle (▾/▸)
│   │
│   └── LightRow[] (one per light in room)
│       ├── ColorAccentBar (3px left border, visible when scene active)
│       ├── IconContainer
│       │   └── ha-icon (mdi:lightbulb variants)
│       ├── LightName
│       ├── StatusArea
│       │   ├── PowerValue (if power_entity configured)
│       │   ├── BrightnessPercent (if Hue and on)
│       │   └── OffLabel (if light is off)
│       ├── ExpandButton (⚙ icon, Hue lights only)
│       │
│       └── ExpandedPanel (conditional, Hue lights only)
│           ├── BrightnessSlider
│           └── SceneGrid
│               └── SceneChip[]
│
└── RoomDivider (visual separator between rooms)
```

### Light Row Component Detail

```typescript
// Pseudo-structure for LightRow component
LightRow {
  // Props
  config: LightConfig;
  hass: HomeAssistant;
  expanded: boolean;
  onToggle: () => void;
  onExpandToggle: () => void;
  
  // Computed
  entityState: HassEntity;
  isOn: boolean;
  brightness: number | null;        // 0-100 for Hue
  currentColor: string | null;      // Hex color from scene or light state
  power: number | null;             // From power_entity if configured
  availableScenes: SceneInfo[];     // Discovered via WebSocket API
  
  // Render sections
  renderIcon();                     // Colored/dimmed based on state
  renderName();                     // Light friendly name
  renderStatus();                   // Power, brightness %, or "Off"
  renderExpandButton();             // Only for Hue lights
  renderExpandedPanel();            // Brightness + scenes
}
```

---

## Configuration Schema

### YAML Configuration

```yaml
type: custom:lights-room-card

# Optional: Card title (defaults to "Lights")
title: Lights

# Optional: Show total power consumption in header (defaults to true)
show_total_power: true

# Required: Array of room configurations
rooms:
  - name: Living Room                    # Required: Display name for the room
    collapsed: false                     # Optional: Start collapsed (default: false)
    lights:
      # Hue light example
      - entity: light.ceiling_light      # Required: Light entity ID
        type: hue                        # Required: 'hue' or 'switch'
        power_entity: sensor.ceiling_light_power  # Optional: Power monitoring entity
        name: Main Light                 # Optional: Override display name
      
      # Another Hue light (minimal config)
      - entity: light.floor_lamp
        type: hue
      
      # Basic switch example (Shelly)
      - entity: switch.table_lamp
        type: switch
        power_entity: sensor.table_lamp_power
        
  - name: Master Bedroom
    lights:
      - entity: light.bedside_left
        type: hue
      - entity: light.bedside_right
        type: hue
      - entity: switch.wardrobe
        type: switch
        power_entity: sensor.wardrobe_switch_power
        
  - name: Kitchen
    collapsed: true                      # This room starts collapsed
    lights:
      - entity: switch.kitchen_1
        type: switch
      - entity: switch.kitchen_2
        type: switch
      - entity: switch.kitchen_3
        type: switch
        
  - name: Theatre Room
    lights:
      - entity: light.theatre_ceiling
        type: hue
      - entity: light.theatre_bias
        type: hue
```

### Configuration Options Reference

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `type` | string | Yes | - | Must be `custom:lights-room-card` |
| `title` | string | No | `"Lights"` | Card header title |
| `show_total_power` | boolean | No | `true` | Show sum of all power entities in header |
| `rooms` | array | Yes | - | Array of room configurations |

#### Room Configuration

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `name` | string | Yes | - | Display name for the room |
| `collapsed` | boolean | No | `false` | Whether room starts collapsed |
| `lights` | array | Yes | - | Array of light configurations |

#### Light Configuration

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | Yes | - | Entity ID (`light.*` or `switch.*`) |
| `type` | string | Yes | - | Light type: `"hue"` or `"switch"` |
| `power_entity` | string | No | - | Power sensor entity ID (`sensor.*`) |
| `name` | string | No | Entity's friendly_name | Override display name |

---

## TypeScript Interfaces

```typescript
// ============================================================
// CONFIGURATION INTERFACES
// ============================================================

/**
 * Main card configuration
 */
interface LightsRoomCardConfig {
  type: string;
  title?: string;
  show_total_power?: boolean;
  rooms: RoomConfig[];
}

/**
 * Configuration for a single room
 */
interface RoomConfig {
  name: string;
  collapsed?: boolean;
  lights: LightConfig[];
}

/**
 * Configuration for a single light within a room
 */
interface LightConfig {
  entity: string;                    // light.* or switch.* entity ID
  type: 'hue' | 'switch';            // Determines available controls
  power_entity?: string;             // Optional sensor.* for power monitoring
  name?: string;                     // Optional display name override
}

// ============================================================
// RUNTIME STATE INTERFACES
// ============================================================

/**
 * Runtime state for a light entity
 * Computed from Home Assistant state + additional data
 */
interface LightState {
  entity_id: string;
  friendly_name: string;
  is_on: boolean;
  is_available: boolean;
  brightness?: number;               // 0-255 for Hue lights
  brightness_pct?: number;           // 0-100 computed percentage
  rgb_color?: [number, number, number];
  hs_color?: [number, number];       // Hue, Saturation
  color_temp?: number;               // Mireds
  power?: number;                    // Watts, from power_entity
  active_scene?: SceneInfo | null;   // Currently active scene if detected
  available_scenes: SceneInfo[];     // All scenes for this light's area
}

/**
 * Information about a scene
 */
interface SceneInfo {
  entity_id: string;                 // scene.living_room_relax
  name: string;                      // "Relax" (friendly name)
  color?: string;                    // Hex color if extractable (e.g., "#FF9500")
  is_active?: boolean;               // Whether this scene appears to be active
}

/**
 * Room runtime state with computed values
 */
interface RoomState {
  name: string;
  is_collapsed: boolean;
  total_power: number | null;        // Sum of all lights with power_entity
  lights: LightState[];
}

/**
 * Overall card UI state
 */
interface CardUIState {
  expanded_lights: Set<string>;      // Entity IDs of expanded light rows
  collapsed_rooms: Set<string>;      // Room names that are collapsed
}

// ============================================================
// HOME ASSISTANT WEBSOCKET API INTERFACES
// ============================================================

/**
 * Response from search/related WebSocket API
 */
interface HassSearchRelatedResult {
  area?: string[];
  automation?: string[];
  config_entry?: string[];
  device?: string[];
  entity?: string[];
  group?: string[];
  scene?: string[];
  script?: string[];
}

/**
 * Scene entity attributes from Home Assistant
 */
interface HassSceneAttributes {
  friendly_name: string;
  entity_id: string[];               // Entities affected by this scene
  icon?: string;
  // Hue scenes may have additional attributes
}

// ============================================================
// EVENT INTERFACES
// ============================================================

/**
 * Custom event fired when config changes in editor
 */
interface ConfigChangedEvent extends CustomEvent {
  detail: {
    config: LightsRoomCardConfig;
  };
}

/**
 * Value changed event from HA form components
 */
interface ValueChangedEvent extends CustomEvent {
  detail: {
    value: any;
  };
}
```

---

## Interaction Behaviors

### Light Row Interactions

| Action | Target | Behavior |
|--------|--------|----------|
| Single tap | Row body (not expand button) | Toggle light on/off |
| Single tap | Expand button (⚙) | Toggle expanded panel visibility |
| Long press | Row body | *(Future)* Open HA more-info dialog |

### Expanded Panel Interactions

| Action | Target | Behavior |
|--------|--------|----------|
| Drag/tap | Brightness slider | Adjust brightness (debounced 150ms) |
| Single tap | Scene chip | Activate scene via `scene.turn_on` |

### Room Section Interactions

| Action | Target | Behavior |
|--------|--------|----------|
| Single tap | Room header (anywhere) | Toggle room collapsed/expanded |

### Service Calls

```typescript
// Toggle light on/off
hass.callService('homeassistant', 'toggle', {
  entity_id: 'light.ceiling_light'
});

// Set brightness (for Hue lights)
hass.callService('light', 'turn_on', {
  entity_id: 'light.ceiling_light',
  brightness_pct: 75
});

// Activate a scene
hass.callService('scene', 'turn_on', {
  entity_id: 'scene.living_room_relax'
});
```

---

## Scene Discovery

### Overview

Scenes are discovered using Home Assistant's built-in `search/related` WebSocket API. This allows the card to find all Hue scenes associated with a light's area without direct communication with the Hue bridge.

### Implementation

```typescript
/**
 * WebSocket client for Home Assistant API calls
 */
class HassWsClient {
  constructor(private hass: HomeAssistant) {}

  /**
   * Get the area ID for a given entity
   */
  async getEntityArea(entityId: string): Promise<string | null> {
    const result = await this.hass.connection.sendMessagePromise<HassSearchRelatedResult>({
      type: 'search/related',
      item_type: 'entity',
      item_id: entityId
    });
    
    return result?.area?.[0] ?? null;
  }

  /**
   * Get all scene entity IDs for a given area
   */
  async getAreaScenes(areaId: string): Promise<string[]> {
    const result = await this.hass.connection.sendMessagePromise<HassSearchRelatedResult>({
      type: 'search/related',
      item_type: 'area',
      item_id: areaId
    });
    
    return result?.scene ?? [];
  }
}

/**
 * Discover scenes for a light entity
 */
async function discoverScenesForLight(
  hass: HomeAssistant,
  entityId: string
): Promise<SceneInfo[]> {
  const client = new HassWsClient(hass);
  
  // 1. Find the area for this light
  const areaId = await client.getEntityArea(entityId);
  if (!areaId) return [];
  
  // 2. Get all scenes in that area
  const sceneEntityIds = await client.getAreaScenes(areaId);
  
  // 3. Convert to SceneInfo objects
  return sceneEntityIds.map(sceneId => {
    const sceneState = hass.states[sceneId];
    return {
      entity_id: sceneId,
      name: sceneState?.attributes?.friendly_name ?? sceneId.split('.')[1],
      color: extractSceneColor(hass, sceneId)  // See color extraction below
    };
  });
}
```

### Scene Color Extraction

Extracting representative colors from Hue scenes:

```typescript
/**
 * Attempt to extract a representative color for a scene
 * Returns hex color string or null
 */
function extractSceneColor(hass: HomeAssistant, sceneEntityId: string): string | null {
  // Option 1: Check if scene state has color information
  const sceneState = hass.states[sceneEntityId];
  
  // Option 2: For Hue scenes, the name often hints at color
  // This is a fallback mapping for common Hue scene names
  const colorHints: Record<string, string> = {
    'relax': '#FF9500',      // Warm orange
    'energize': '#66B2FF',   // Cool blue
    'concentrate': '#FFFFFF', // White
    'read': '#FFD700',       // Warm yellow
    'dimmed': '#FF8C00',     // Dim orange
    'nightlight': '#FF6B6B', // Soft red
    'bright': '#FFFFFF',     // White
    'tropical twilight': '#FF69B4', // Pink
    'arctic aurora': '#00CED1',     // Cyan
    'spring blossom': '#FFB7C5',    // Light pink
  };
  
  const sceneName = sceneState?.attributes?.friendly_name?.toLowerCase() ?? '';
  
  for (const [hint, color] of Object.entries(colorHints)) {
    if (sceneName.includes(hint)) {
      return color;
    }
  }
  
  return null;
}

/**
 * Get current color from a light entity state
 * Used to reflect active scene color on the light row
 */
function getLightCurrentColor(state: HassEntity): string | null {
  const attrs = state.attributes;
  
  // RGB color takes priority
  if (attrs.rgb_color) {
    const [r, g, b] = attrs.rgb_color;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Convert HS color if available
  if (attrs.hs_color) {
    return hsToHex(attrs.hs_color[0], attrs.hs_color[1]);
  }
  
  // Color temp - map to warm/cool white
  if (attrs.color_temp) {
    // Lower mireds = cooler, higher = warmer
    const temp = attrs.color_temp;
    if (temp < 250) return '#F5F5FF';      // Cool white
    if (temp < 350) return '#FFFAF0';      // Neutral
    return '#FFE4B5';                       // Warm white
  }
  
  return null;
}
```

### Caching Strategy

```typescript
class SceneCache {
  private cache: Map<string, SceneInfo[]> = new Map();
  private loadingPromises: Map<string, Promise<SceneInfo[]>> = new Map();
  
  async getScenesForLight(
    hass: HomeAssistant,
    entityId: string
  ): Promise<SceneInfo[]> {
    // Return cached if available
    if (this.cache.has(entityId)) {
      return this.cache.get(entityId)!;
    }
    
    // Return existing promise if already loading
    if (this.loadingPromises.has(entityId)) {
      return this.loadingPromises.get(entityId)!;
    }
    
    // Start loading
    const promise = discoverScenesForLight(hass, entityId);
    this.loadingPromises.set(entityId, promise);
    
    const scenes = await promise;
    this.cache.set(entityId, scenes);
    this.loadingPromises.delete(entityId);
    
    return scenes;
  }
  
  invalidate(entityId?: string) {
    if (entityId) {
      this.cache.delete(entityId);
    } else {
      this.cache.clear();
    }
  }
}
```

---

## Styling Guidelines

### CSS Custom Properties

```css
:host {
  /* ============================================
     SPACING SCALE (4px base unit)
     ============================================ */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  
  /* ============================================
     BORDER RADIUS
     ============================================ */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* ============================================
     COLORS - Inherited from HA Theme
     ============================================ */
  --card-background: var(--ha-card-background, var(--card-background-color));
  --text-primary: var(--primary-text-color);
  --text-secondary: var(--secondary-text-color);
  --border-color: var(--divider-color);
  --accent-color: var(--primary-color);
  
  /* ============================================
     LIGHT STATE COLORS
     ============================================ */
  --light-on-color: #FBBF24;              /* Amber - default "on" state */
  --light-off-color: var(--secondary-text-color);
  --light-unavailable-color: var(--disabled-text-color, #666);
  
  /* ============================================
     COMPONENT COLORS
     ============================================ */
  --row-background: rgba(255, 255, 255, 0.03);
  --row-background-hover: rgba(255, 255, 255, 0.06);
  --expanded-panel-background: rgba(0, 0, 0, 0.2);
  --slider-track-color: var(--divider-color);
  --slider-active-color: var(--light-on-color);
  --scene-chip-background: rgba(255, 255, 255, 0.05);
  --scene-chip-border: var(--divider-color);
  --scene-chip-active-border: var(--accent-color);
  
  /* ============================================
     ANIMATION TIMING
     ============================================ */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease-out;
  --transition-color: 500ms ease;
}
```

### Typography

```css
/* Card title */
.card-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  font-family: var(--paper-font-headline_-_font-family, inherit);
}

/* Total power in header */
.total-power {
  font-size: 14px;
  font-weight: 500;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  color: var(--text-secondary);
}

/* Room header */
.room-header-name {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.room-header-power {
  font-size: 12px;
  font-weight: 500;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  color: var(--text-secondary);
}

/* Light row */
.light-name {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
}

.light-status {
  font-size: 12px;
  font-weight: 500;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  color: var(--text-secondary);
}

/* Scene chips */
.scene-chip-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary);
}

/* Brightness percentage */
.brightness-label {
  font-size: 12px;
  font-weight: 500;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  color: var(--text-secondary);
}
```

### Component Styles

#### Card Container
```css
ha-card {
  padding: var(--spacing-lg);
  border-radius: var(--ha-card-border-radius, 16px);
  background: var(--card-background);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
```

#### Room Section
```css
.room-section {
  margin-bottom: var(--spacing-md);
}

.room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  cursor: pointer;
  user-select: none;
}

.room-header:hover {
  opacity: 0.8;
}

.room-header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.room-header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.room-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  overflow: hidden;
  transition: max-height var(--transition-slow), opacity var(--transition-normal);
}

.room-content.collapsed {
  max-height: 0;
  opacity: 0;
}

.room-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-md) 0;
  opacity: 0.5;
}
```

#### Light Row
```css
.light-row {
  display: flex;
  flex-direction: column;
  background: var(--row-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: background var(--transition-fast);
}

.light-row:hover {
  background: var(--row-background-hover);
}

.light-row-main {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  gap: var(--spacing-md);
}

/* Color accent bar for active scenes */
.light-row.has-scene-color {
  border-left: 3px solid var(--scene-color, var(--light-on-color));
}

.light-icon {
  --mdc-icon-size: 24px;
  color: var(--light-off-color);
  transition: color var(--transition-color);
}

.light-icon.on {
  color: var(--light-on-color);
}

.light-icon.colored {
  color: var(--scene-color, var(--light-on-color));
}

.light-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.light-status {
  flex-shrink: 0;
}

.expand-button {
  --mdc-icon-size: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.expand-button:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

#### Expanded Panel
```css
.expanded-panel {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  background: var(--expanded-panel-background);
  border-top: 1px solid var(--border-color);
}

.brightness-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.brightness-slider {
  flex: 1;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--slider-track-color);
  border-radius: var(--radius-full);
  outline: none;
}

.brightness-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--slider-active-color);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.scene-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
```

#### Scene Chip
```css
.scene-chip {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--scene-chip-background);
  border: 1px solid var(--scene-chip-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.scene-chip:hover {
  background: rgba(255, 255, 255, 0.1);
}

.scene-chip.active {
  border-color: var(--scene-chip-active-border);
  background: rgba(var(--accent-color-rgb), 0.1);
}

.scene-color-swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.scene-chip-checkmark {
  --mdc-icon-size: 14px;
  color: var(--accent-color);
}
```

### Animations

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Room expand/collapse */
@keyframes expand {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
}

/* Light state transition */
@keyframes light-on {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.light-icon.turning-on {
  animation: light-on 300ms ease;
}
```

---

## Editor Implementation

### Editor Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Card Configuration                                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Title                                                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Lights                                                            │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ☑ Show total power consumption                                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  ROOMS                                                    [+ Add Room]  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ▾ Living Room                                               [🗑 Delete]│
│    ┌─────────────────────────────────────────────────────────────────┐  │
│    │  ☐ Start collapsed                                              │  │
│    └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│    LIGHTS                                              [+ Add Light]    │
│    ┌─────────────────────────────────────────────────────────────────┐  │
│    │  Entity                                                         │  │
│    │  [ha-entity-picker: light.ceiling_light                      ]  │  │
│    │                                                                 │  │
│    │  Type                                                           │  │
│    │  (●) Hue    ( ) Switch                                          │  │
│    │                                                                 │  │
│    │  Power Entity (optional)                                        │  │
│    │  [ha-entity-picker: sensor.ceiling_light_power               ]  │  │
│    │                                                                 │  │
│    │  Name Override (optional)                                       │  │
│    │  [                                                           ]  │  │
│    │                                                      [Remove]   │  │
│    └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│    ┌─────────────────────────────────────────────────────────────────┐  │
│    │  Entity                                                         │  │
│    │  [ha-entity-picker: switch.table_lamp                        ]  │  │
│    │                                                                 │  │
│    │  Type                                                           │  │
│    │  ( ) Hue    (●) Switch                                          │  │
│    │                                                                 │  │
│    │  Power Entity (optional)                                        │  │
│    │  [ha-entity-picker: sensor.table_lamp_power                  ]  │  │
│    │                                                      [Remove]   │  │
│    └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ▸ Master Bedroom                                            [🗑 Delete]│
│  ▸ Kitchen                                                   [🗑 Delete]│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Editor Component Code Structure

```typescript
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "custom-card-helpers";
import { LightsRoomCardConfig, RoomConfig, LightConfig } from "./types";

@customElement("lights-room-card-editor")
export class LightsRoomCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LightsRoomCardConfig;
  @state() private _expandedRooms: Set<number> = new Set([0]); // First room expanded by default

  public setConfig(config: LightsRoomCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <!-- Title -->
        <ha-textfield
          label="Title"
          .value=${this._config.title ?? "Lights"}
          .configValue=${"title"}
          @input=${this._valueChanged}
        ></ha-textfield>

        <!-- Show total power toggle -->
        <ha-formfield label="Show total power consumption">
          <ha-switch
            .checked=${this._config.show_total_power ?? true}
            .configValue=${"show_total_power"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <!-- Rooms section -->
        <div class="rooms-header">
          <span>ROOMS</span>
          <mwc-button @click=${this._addRoom}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add Room
          </mwc-button>
        </div>

        ${this._config.rooms?.map((room, roomIndex) => 
          this._renderRoomEditor(room, roomIndex)
        )}
      </div>
    `;
  }

  private _renderRoomEditor(room: RoomConfig, roomIndex: number): TemplateResult {
    const isExpanded = this._expandedRooms.has(roomIndex);

    return html`
      <div class="room-editor">
        <div class="room-editor-header" @click=${() => this._toggleRoomExpanded(roomIndex)}>
          <ha-icon icon=${isExpanded ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
          <span class="room-name">${room.name || "Unnamed Room"}</span>
          <mwc-icon-button @click=${(e: Event) => this._deleteRoom(e, roomIndex)}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </mwc-icon-button>
        </div>

        ${isExpanded ? html`
          <div class="room-editor-content">
            <!-- Room name -->
            <ha-textfield
              label="Room Name"
              .value=${room.name}
              @input=${(e: Event) => this._roomValueChanged(e, roomIndex, "name")}
            ></ha-textfield>

            <!-- Start collapsed toggle -->
            <ha-formfield label="Start collapsed">
              <ha-switch
                .checked=${room.collapsed ?? false}
                @change=${(e: Event) => this._roomValueChanged(e, roomIndex, "collapsed")}
              ></ha-switch>
            </ha-formfield>

            <!-- Lights section -->
            <div class="lights-header">
              <span>LIGHTS</span>
              <mwc-button @click=${() => this._addLight(roomIndex)}>
                <ha-icon icon="mdi:plus"></ha-icon>
                Add Light
              </mwc-button>
            </div>

            ${room.lights?.map((light, lightIndex) =>
              this._renderLightEditor(light, roomIndex, lightIndex)
            )}
          </div>
        ` : ""}
      </div>
    `;
  }

  private _renderLightEditor(
    light: LightConfig,
    roomIndex: number,
    lightIndex: number
  ): TemplateResult {
    return html`
      <div class="light-editor">
        <!-- Entity picker -->
        <ha-entity-picker
          .hass=${this.hass}
          .value=${light.entity}
          .label=${"Entity"}
          .includeDomains=${["light", "switch"]}
          @value-changed=${(e: CustomEvent) => 
            this._lightValueChanged(e.detail.value, roomIndex, lightIndex, "entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Type selection -->
        <div class="type-selection">
          <label>Type</label>
          <ha-formfield label="Hue">
            <ha-radio
              name="type-${roomIndex}-${lightIndex}"
              .checked=${light.type === "hue"}
              @change=${() => 
                this._lightValueChanged("hue", roomIndex, lightIndex, "type")}
            ></ha-radio>
          </ha-formfield>
          <ha-formfield label="Switch">
            <ha-radio
              name="type-${roomIndex}-${lightIndex}"
              .checked=${light.type === "switch"}
              @change=${() => 
                this._lightValueChanged("switch", roomIndex, lightIndex, "type")}
            ></ha-radio>
          </ha-formfield>
        </div>

        <!-- Power entity picker (optional) -->
        <ha-entity-picker
          .hass=${this.hass}
          .value=${light.power_entity ?? ""}
          .label=${"Power Entity (optional)"}
          .includeDomains=${["sensor"]}
          @value-changed=${(e: CustomEvent) => 
            this._lightValueChanged(e.detail.value, roomIndex, lightIndex, "power_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Name override (optional) -->
        <ha-textfield
          label="Name Override (optional)"
          .value=${light.name ?? ""}
          @input=${(e: Event) => 
            this._lightValueChanged((e.target as HTMLInputElement).value, roomIndex, lightIndex, "name")}
        ></ha-textfield>

        <mwc-button class="remove-button" @click=${() => this._removeLight(roomIndex, lightIndex)}>
          Remove
        </mwc-button>
      </div>
    `;
  }

  // ... event handlers and helper methods
}
```

### Required HA Components

Always use these native Home Assistant components:

| Component | Use Case |
|-----------|----------|
| `ha-entity-picker` | Selecting light, switch, and sensor entities |
| `ha-textfield` | Text input for title, room names, name overrides |
| `ha-switch` | Toggle for boolean options |
| `ha-radio` | Selection between Hue/Switch type |
| `ha-formfield` | Wrapper for labels on switches/radios |
| `ha-icon` | Icons throughout the editor |
| `mwc-button` | Action buttons (Add Room, Add Light, Remove) |
| `mwc-icon-button` | Icon-only buttons (Delete room) |

**Do NOT use deprecated components** like `paper-input`, `paper-dropdown-menu`, etc.

---

## File Structure

```
lights-room-card/
├── src/
│   ├── lights-room-card.ts          # Main card component
│   ├── editor.ts                    # Visual config editor
│   ├── types.ts                     # TypeScript interfaces
│   ├── const.ts                     # Constants, default config
│   ├── styles.ts                    # Shared CSS-in-JS styles
│   │
│   ├── components/
│   │   ├── room-section.ts          # Collapsible room container
│   │   ├── light-row.ts             # Individual light row
│   │   ├── brightness-slider.ts     # Brightness control slider
│   │   ├── scene-chip.ts            # Scene selection chip
│   │   └── expand-button.ts         # Expand/collapse button
│   │
│   └── utils/
│       ├── hass-ws-client.ts        # WebSocket API helpers
│       ├── scene-discovery.ts       # Scene loading and caching
│       ├── color-utils.ts           # Color extraction/conversion
│       └── debounce.ts              # Debounce utility for slider
│
├── dist/
│   └── lights-room-card.js          # Bundled output (generated)
│
├── package.json
├── rollup.config.js                 # Build configuration
├── tsconfig.json                    # TypeScript configuration
└── hacs.json                        # HACS integration manifest
```

---

## Implementation Notes

### Critical Implementation Details

1. **Scene Discovery Caching**
   - Cache discovered scenes to avoid repeated WebSocket calls
   - Invalidate cache when card configuration changes
   - Load scenes lazily (only when light row is expanded for the first time)

2. **Brightness Slider Debouncing**
   - Debounce brightness changes by 150-200ms
   - This prevents flooding Home Assistant with service calls while dragging
   - Show immediate visual feedback while debouncing the actual service call

3. **Active Scene Detection**
   - Home Assistant doesn't track "which scene is active"
   - Options for implementation:
     - Track the last scene activated via this card (stored in component state)
     - Compare current light RGB/brightness to known scene values (complex)
     - Accept that scene indicator may not survive HA restarts
   - Recommended: Track last activated scene in card state, clear when light is manually adjusted

4. **Power Calculation**
   - Sum all configured `power_entity` values for room totals
   - Handle unavailable entities gracefully (show "—" or exclude from sum)
   - Use null coalescing to handle missing/undefined values

5. **Entity Validation**
   - Filter entity pickers by domain:
     - Light entities: `light.*`
     - Switch entities: `switch.*`
     - Power entities: `sensor.*` (ideally filter by `device_class: power`)
   - Handle entities that become unavailable gracefully

6. **Responsive Behavior**
   - Scene chips should wrap to multiple rows on narrow cards
   - Consider reducing padding on mobile viewports
   - Test with different card widths in HA dashboard

### Performance Considerations

- Use `shouldUpdate()` to prevent unnecessary re-renders
- Only re-render light rows when their specific entities change
- Batch state reads at the start of render cycle
- Use CSS containment (`contain: content`) on room sections

### Accessibility

- Ensure touch targets are at least 44x44px
- Add ARIA labels to icon-only buttons
- Support keyboard navigation (Tab, Enter, Space)
- Maintain sufficient color contrast (WCAG AA)
- Don't rely solely on color to convey information (use icons/text too)

---

## Example Configurations

### Minimal Configuration

```yaml
type: custom:lights-room-card
rooms:
  - name: Living Room
    lights:
      - entity: light.living_room
        type: hue
```

### Typical Home Setup

```yaml
type: custom:lights-room-card
title: Lights
show_total_power: true
rooms:
  - name: Living Room
    lights:
      - entity: light.living_room_ceiling
        type: hue
        power_entity: sensor.living_room_ceiling_power
      - entity: light.floor_lamp
        type: hue
      - entity: switch.table_lamp
        type: switch
        power_entity: sensor.table_lamp_power

  - name: Master Bedroom
    lights:
      - entity: light.bedroom_ceiling
        type: hue
      - entity: light.bedside_left
        type: hue
      - entity: light.bedside_right
        type: hue
      - entity: switch.wardrobe
        type: switch
        power_entity: sensor.wardrobe_power

  - name: Kitchen
    collapsed: true
    lights:
      - entity: switch.kitchen_main
        type: switch
        power_entity: sensor.kitchen_main_power
      - entity: switch.kitchen_counter
        type: switch
        power_entity: sensor.kitchen_counter_power
      - entity: switch.kitchen_pantry
        type: switch

  - name: Theatre Room
    lights:
      - entity: light.theatre_ceiling
        type: hue
      - entity: light.theatre_bias_lighting
        type: hue
        name: Bias Lighting

  - name: Outdoor
    collapsed: true
    lights:
      - entity: switch.front_yard
        type: switch
        power_entity: sensor.front_yard_power
      - entity: switch.back_yard
        type: switch
        power_entity: sensor.back_yard_power
      - entity: switch.garage
        type: switch
```

---

## Appendix: Icon Reference

| Use Case | Icon |
|----------|------|
| Light (off) | `mdi:lightbulb-outline` |
| Light (on) | `mdi:lightbulb` |
| Expand button | `mdi:cog` or `mdi:chevron-down` |
| Collapse indicator | `mdi:chevron-right` |
| Expand indicator | `mdi:chevron-down` |
| Power | `mdi:flash` |
| Add | `mdi:plus` |
| Delete | `mdi:delete` |
| Active scene checkmark | `mdi:check` |

---

## Appendix: Color Utility Functions

```typescript
/**
 * Convert HSL to Hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convert HS (Hue, Saturation from HA) to Hex
 * HA uses hue 0-360, saturation 0-100
 */
function hsToHex(hue: number, saturation: number): string {
  return hslToHex(hue, saturation, 50);
}

/**
 * Convert RGB array to Hex
 */
function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Determine if a color is "light" or "dark"
 * Useful for choosing text color on colored backgrounds
 */
function isLightColor(hex: string): boolean {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}
```

---

*End of Design Specification*
