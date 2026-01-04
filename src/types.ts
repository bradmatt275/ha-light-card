import { HomeAssistant } from 'custom-card-helpers';

// ============================================================
// CONFIGURATION INTERFACES
// ============================================================

/**
 * Main card configuration
 */
export interface LightsRoomCardConfig {
  type: string;
  title?: string;
  show_total_power?: boolean;
  power_entities?: string[];        // Custom entities for total power calculation
  columns?: number;                 // Number of columns (1-4, default: 1)
  rooms: RoomConfig[];
}

/**
 * Configuration for a single room
 */
export interface RoomConfig {
  name: string;
  collapsed?: boolean;
  column?: number;                  // Which column to place this room in (1-based)
  lights: LightConfig[];
}

/**
 * Configuration for a single light within a room
 */
export interface LightConfig {
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
export interface LightState {
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
export interface SceneInfo {
  entity_id: string;                 // scene.living_room_relax
  name: string;                      // "Relax" (friendly name)
  color?: string;                    // Hex color if extractable (e.g., "#FF9500")
  entity_picture?: string;           // URL to scene preview image (for color extraction)
  is_active?: boolean;               // Whether this scene appears to be active
}

/**
 * Room runtime state with computed values
 */
export interface RoomState {
  name: string;
  is_collapsed: boolean;
  total_power: number | null;        // Sum of all lights with power_entity
  lights: LightState[];
}

/**
 * Overall card UI state
 */
export interface CardUIState {
  expanded_lights: Set<string>;      // Entity IDs of expanded light rows
  collapsed_rooms: Set<string>;      // Room names that are collapsed
}

// ============================================================
// HOME ASSISTANT WEBSOCKET API INTERFACES
// ============================================================

/**
 * Response from search/related WebSocket API
 */
export interface HassSearchRelatedResult {
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
export interface HassSceneAttributes {
  friendly_name: string;
  entity_id: string[];               // Entities affected by this scene
  icon?: string;
}

// ============================================================
// EVENT INTERFACES
// ============================================================

/**
 * Custom event fired when config changes in editor
 */
export interface ConfigChangedEvent extends CustomEvent {
  detail: {
    config: LightsRoomCardConfig;
  };
}

/**
 * Value changed event from HA form components
 */
export interface ValueChangedEvent extends CustomEvent {
  detail: {
    value: unknown;
  };
}

// ============================================================
// HOME ASSISTANT TYPE EXTENSIONS
// ============================================================

/**
 * Extended HomeAssistant type with WebSocket connection
 * Note: This is a simplified type for our usage. The actual connection
 * has many more properties, but we only need sendMessagePromise.
 */
export type ExtendedHomeAssistant = HomeAssistant & {
  connection: {
    sendMessagePromise<T>(message: { type: string; [key: string]: unknown }): Promise<T>;
  };
};

/**
 * Home Assistant entity state
 */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    brightness?: number;
    rgb_color?: [number, number, number];
    hs_color?: [number, number];
    color_temp?: number;
    icon?: string;
    device_class?: string;
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

// ============================================================
// COMPONENT PROP INTERFACES
// ============================================================

export interface SceneChipProps {
  scene: SceneInfo;
  active: boolean;
}

export interface BrightnessSliderProps {
  value: number;
  disabled?: boolean;
}

export interface LightRowProps {
  hass: HomeAssistant;
  config: LightConfig;
  expanded: boolean;
  scenes: SceneInfo[];
  activeSceneId?: string;
}

export interface RoomSectionProps {
  hass: HomeAssistant;
  config: RoomConfig;
  collapsed: boolean;
  expandedLights: Set<string>;
  activeScenes: Map<string, string>;
}

// Declare global window types for custom cards
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
