# Lights Room Card

A custom Home Assistant Lovelace card for managing lights organized by room. Features include brightness control for smart lights, scene selection with automatic discovery, power monitoring, and a responsive multi-column layout with full visual editor support.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1+-blue)
![HACS](https://img.shields.io/badge/HACS-Default-orange)

## Features

### Core Features

- **Room-Based Organization**: Group lights by room with collapsible sections and customizable ordering
- **Multi-Column Layout**: Display rooms in 1-4 columns with responsive design that adapts to screen size
- **Two Light Types**:
  - **Hue/Smart Lights**: Brightness slider, scene selection, and colored icon reflecting light state
  - **Switch Lights**: Simple on/off toggle with power monitoring support
- **Visual Configuration Editor**: Full UI-based setup - no YAML required

### Smart Features

- **Scene Auto-Discovery**: Automatically finds scenes associated with your lights via Home Assistant's entity relationships
- **Scene Deduplication**: When lights belong to room groups, duplicate scenes are automatically filtered to show each scene only once
- **Power Monitoring**: Track power consumption per light, per room, or at circuit level with multiple sensor support
- **Turn Off All**: Quick action button in the header to turn off all lights with one tap

### Editor Features

- **Room Reordering**: Move rooms up/down to customize display order
- **Light Reordering**: Move lights up/down within each room
- **Entity Picker Integration**: Modern Home Assistant entity selectors with domain filtering
- **Multiple Power Entities**: Associate multiple power sensors with a single light

---

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click **Frontend** → **+ Explore & Download Repositories**
3. Search for "Lights Room Card"
4. Click **Download**
5. Refresh your browser (clear cache if needed)

### Manual Installation

1. Download `lights-room-card.js` from the [latest release](https://github.com/matt.brady/ha-light-card/releases)
2. Copy to `/config/www/lights-room-card.js`
3. Add resource in **Settings** → **Dashboards** → **Resources**:
   - URL: `/local/lights-room-card.js`
   - Type: JavaScript Module
4. Refresh your browser

---

## Quick Start

### Using the Visual Editor

1. Add a new card to your dashboard
2. Search for "Lights Room Card"
3. Use the visual editor to:
   - Set card title and column count
   - Add rooms and configure their settings
   - Add lights to each room with entity selection
   - Reorder rooms and lights using the up/down buttons
   - Configure power monitoring entities

### Minimal YAML Configuration

```yaml
type: custom:lights-room-card
rooms:
  - name: Living Room
    lights:
      - entity: light.living_room
        type: hue
```

---

## Configuration Reference

### Card Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `type` | string | **Yes** | - | Must be `custom:lights-room-card` |
| `title` | string | No | `"Lights"` | Card header title |
| `show_total_power` | boolean | No | `true` | Show total power consumption in header |
| `columns` | number | No | `1` | Number of columns (1-4) |
| `power_entities` | string[] | No | - | Array of power sensor entity IDs for total calculation |
| `rooms` | array | **Yes** | - | Array of room configurations |

### Room Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `name` | string | **Yes** | - | Display name for the room |
| `collapsed` | boolean | No | `false` | Whether room starts collapsed |
| `column` | number | No | `1` | Column placement (1-based index) |
| `lights` | array | **Yes** | - | Array of light configurations |

### Light Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | **Yes** | - | Entity ID (`light.*` or `switch.*`) |
| `type` | string | No | `"switch"` | Light type: `"hue"` or `"switch"` |
| `name` | string | No | Entity's friendly_name | Override display name |
| `power_entities` | string[] | No | - | Array of power sensor entity IDs |

---

## Feature Details

### Multi-Column Layout

Configure 1-4 columns for your layout. Assign rooms to specific columns using the `column` property.

**Responsive Breakpoints:**
| Screen Width | Max Columns |
|--------------|-------------|
| > 1200px | All configured |
| 900-1200px | 3 |
| 600-900px | 2 |
| < 600px | 1 |

### Power Monitoring

Track power consumption at multiple levels:

1. **Per-Light Power**: Assign one or more power sensors to individual lights
2. **Card-Level Power**: Define `power_entities` at the card level for circuit monitoring (e.g., Shelly EM)

When card-level `power_entities` is configured, it takes precedence over summing individual light values.

**Multiple Power Sensors Per Light:**
Some installations have multiple circuits feeding a single light fixture. The `power_entities` array lets you associate multiple sensors:

```yaml
lights:
  - entity: light.kitchen_ceiling
    type: hue
    power_entities:
      - sensor.kitchen_circuit_1_power
      - sensor.kitchen_circuit_2_power
```

### Scene Discovery

Scenes are automatically discovered through Home Assistant's entity relationship system. The card queries Home Assistant for scenes that target each light entity.

**Scene Deduplication:**
When lights belong to room groups (e.g., "Living Room Lights" group), the same scene may appear multiple times. The card automatically deduplicates scenes by name, showing each unique scene only once.

### Turn Off All

The card header includes a "Turn off all" button that turns off every light in the card with a single tap. The button only appears when at least one light is on.

### Light Types

**Hue/Smart Lights (`type: hue`):**
- Brightness slider with real-time feedback
- Scene chips for quick scene activation
- Icon color reflects the current light color/state

**Switch Lights (`type: switch`):**
- Simple on/off toggle
- Power monitoring (if configured)
- Default type when not specified

---

## Full Configuration Example

```yaml
type: custom:lights-room-card
title: Home Lighting
show_total_power: true
columns: 2
power_entities:
  - sensor.lighting_circuit_total_power
rooms:
  - name: Living Room
    column: 1
    lights:
      - entity: light.living_room_ceiling
        type: hue
        power_entities:
          - sensor.living_room_ceiling_power
      - entity: light.floor_lamp
        type: hue
      - entity: switch.accent_lights
        type: switch
        power_entities:
          - sensor.accent_lights_power

  - name: Kitchen
    column: 1
    lights:
      - entity: switch.kitchen_main
        power_entities:
          - sensor.kitchen_main_power
      - entity: switch.under_cabinet
        name: Cabinet Lights

  - name: Master Bedroom
    column: 2
    collapsed: true
    lights:
      - entity: light.bedroom_ceiling
        type: hue
      - entity: light.bedside_left
        type: hue
        name: Left Bedside
      - entity: light.bedside_right
        type: hue
        name: Right Bedside

  - name: Office
    column: 2
    lights:
      - entity: light.desk_lamp
        type: hue
        power_entities:
          - sensor.desk_lamp_power
      - entity: switch.monitor_bias
        name: Monitor Backlight
```

---

## Visual Editor Guide

The card includes a full visual configuration editor accessible from the dashboard edit mode.

### Card Settings
- **Title**: Customize the card header text
- **Columns**: Dropdown to select 1-4 column layout
- **Show Total Power**: Toggle power display in header
- **Power Entities**: Add/remove card-level power sensors

### Room Management
- **Add Room**: Button at bottom of rooms section
- **Reorder Rooms**: Up/down arrow buttons on each room
- **Room Settings**: Name, column assignment, initial collapsed state
- **Remove Room**: Delete button on each room

### Light Management
- **Add Light**: Button within each room section
- **Reorder Lights**: Up/down arrow buttons on each light
- **Entity Selection**: Home Assistant entity picker (filtered to lights and switches)
- **Light Type**: Dropdown for hue or switch
- **Custom Name**: Override the entity's friendly name
- **Power Entities**: Add multiple power sensors per light
- **Remove Light**: Delete button on each light

---

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/matt.brady/ha-light-card.git
cd ha-light-card
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run watch` | Development watch mode |

### Project Structure

```
ha-light-card/
├── src/
│   ├── lights-room-card.ts      # Main card component
│   ├── editor.ts                # Visual configuration editor
│   ├── types.ts                 # TypeScript interfaces
│   ├── const.ts                 # Constants
│   ├── styles.ts                # All CSS styles
│   ├── components/
│   │   ├── room-section.ts      # Collapsible room container
│   │   ├── light-row.ts         # Individual light row
│   │   ├── brightness-slider.ts # Brightness control
│   │   └── scene-chip.ts        # Scene button
│   └── utils/
│       ├── hass-ws-client.ts    # WebSocket client wrapper
│       ├── scene-discovery.ts   # Scene auto-discovery
│       ├── color-utils.ts       # Color manipulation
│       └── debounce.ts          # Debounce utility
├── dist/                        # Built output
├── docs/                        # Design documentation
├── package.json
├── rollup.config.js
├── tsconfig.json
└── hacs.json
```

---

## Troubleshooting

### Scenes Not Appearing
- Ensure scenes target the light entity directly
- Check that scenes are enabled in Home Assistant
- Scenes are discovered via entity relationships, not area assignments

### Power Not Displaying
- Verify power sensor entities exist and have numeric values
- Check entity IDs are correct (must be `sensor.*` domain)
- Ensure `show_total_power` is `true`

### Editor Entity Pickers Empty
- Refresh the browser after installation
- Clear browser cache
- Ensure Home Assistant version is 2024.1 or newer

---

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.
