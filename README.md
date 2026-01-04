# Lights Room Card

A Home Assistant custom Lovelace card for managing lights grouped by user-defined rooms. Supports both basic on/off switches (e.g., Shelly relays) and smart lights (Philips Hue) with brightness control and scene selection.

![GitHub release](https://img.shields.io/github/release/matt.brady/ha-light-card.svg)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

## Features

- **Dynamic room grouping** - Create unlimited rooms and assign lights to them
- **Multi-column layout** - Configure 1-4 columns with room assignment, responsive on mobile
- **Dual light type support** - Basic switches and Hue smart lights with different control options
- **Scene integration** - Automatic discovery of Hue scenes via Home Assistant's WebSocket API
- **Visual scene feedback** - Active scenes are reflected through color accents on light rows
- **Power monitoring** - Optional per-light, per-room, or custom entity power consumption display
- **Collapsible sections** - Rooms can be expanded/collapsed to manage screen space
- **Material You design** - Follows Material You design principles for a modern look

## Installation

### HACS (Recommended)

1. Add this repository as a custom repository in HACS
2. Search for "Lights Room Card"
3. Install the card
4. Refresh your browser

### Manual Installation

1. Download `lights-room-card.js` from the [latest release](https://github.com/matt.brady/ha-light-card/releases/latest)
2. Copy it to your `config/www/` folder
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/lights-room-card.js
    type: module
```

## Configuration

### Basic Example

```yaml
type: custom:lights-room-card
rooms:
  - name: Living Room
    lights:
      - entity: light.living_room
        type: hue
```

### Full Example

```yaml
type: custom:lights-room-card
title: Lights
show_total_power: true
columns: 2
power_entities:
  - sensor.lights_circuit_1_power
  - sensor.lights_circuit_2_power
rooms:
  - name: Living Room
    column: 1
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
    column: 1
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
    column: 2
    collapsed: true
    lights:
      - entity: switch.kitchen_main
        type: switch
        power_entity: sensor.kitchen_main_power
      - entity: switch.kitchen_counter
        type: switch

  - name: Theatre Room
    column: 2
    lights:
      - entity: light.theatre_ceiling
        type: hue
      - entity: light.theatre_bias_lighting
        type: hue
        name: Bias Lighting
```

## Configuration Options

### Card Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `type` | string | Yes | - | Must be `custom:lights-room-card` |
| `title` | string | No | `"Lights"` | Card header title |
| `show_total_power` | boolean | No | `true` | Show sum of all power entities in header |
| `columns` | number | No | `1` | Number of columns (1-4), responsive on smaller screens |
| `power_entities` | array | No | - | Array of sensor entity IDs for total power calculation |
| `rooms` | array | Yes | - | Array of room configurations |

### Room Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `name` | string | Yes | - | Display name for the room |
| `collapsed` | boolean | No | `false` | Whether room starts collapsed |
| `column` | number | No | `1` | Which column to place this room in (1-based) |
| `lights` | array | Yes | - | Array of light configurations |

### Light Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | Yes | - | Entity ID (`light.*` or `switch.*`) |
| `type` | string | Yes | - | Light type: `"hue"` or `"switch"` |
| `power_entity` | string | No | - | Power sensor entity ID (`sensor.*`) |
| `name` | string | No | Entity's friendly_name | Override display name |

## Multi-Column Layout

When `columns` is set to 2, 3, or 4, rooms are displayed in a grid layout. Each room can be assigned to a specific column using the `column` property.

The layout is responsive:
- **Desktop (>1200px)**: Shows all configured columns
- **Tablet (900-1200px)**: Max 3 columns
- **Small tablet (600-900px)**: Max 2 columns
- **Mobile (<600px)**: Single column

## Power Monitoring

You can track power consumption in two ways:

1. **Individual light power entities**: Set `power_entity` on each light to track per-light consumption
2. **Custom power entities**: Set `power_entities` at the card level for circuit-level monitoring (e.g., Shelly EM)

If `power_entities` is configured, it takes precedence over summing individual light values.

## Light Types

### Hue Lights (`type: hue`)

Smart lights with these features:
- Brightness slider
- Scene selection (auto-discovered from Home Assistant)
- Color accent bar showing current scene color
- Colored icon reflecting light state

### Switch Lights (`type: switch`)

Basic on/off switches with these features:
- Simple toggle control
- Power monitoring (if configured)

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

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

### Project Structure

```
ha-light-card/
├── src/
│   ├── lights-room-card.ts      # Main card component
│   ├── editor.ts                # Visual config editor
│   ├── types.ts                 # TypeScript interfaces
│   ├── const.ts                 # Constants
│   ├── styles.ts                # CSS styles
│   ├── components/
│   │   ├── room-section.ts      # Room container
│   │   ├── light-row.ts         # Light row
│   │   ├── brightness-slider.ts # Brightness control
│   │   └── scene-chip.ts        # Scene chip
│   └── utils/
│       ├── hass-ws-client.ts    # WebSocket client
│       ├── scene-discovery.ts   # Scene loading
│       ├── color-utils.ts       # Color utilities
│       └── debounce.ts          # Debounce utility
├── dist/                        # Built output
├── docs/                        # Documentation
├── package.json
├── rollup.config.js
├── tsconfig.json
└── hacs.json
```

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.
