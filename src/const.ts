import { LightsRoomCardConfig } from './types';

export const CARD_VERSION = '1.0.0';

export const CARD_NAME = 'lights-room-card';

export const DEFAULT_CONFIG: Partial<LightsRoomCardConfig> = {
  title: 'Lights',
  show_total_power: true,
  rooms: [],
};

// Icon mappings
export const ICONS = {
  lightOn: 'mdi:lightbulb',
  lightOff: 'mdi:lightbulb-outline',
  expand: 'mdi:cog',
  collapse: 'mdi:chevron-up',
  chevronDown: 'mdi:chevron-down',
  chevronRight: 'mdi:chevron-right',
  power: 'mdi:flash',
  check: 'mdi:check',
  add: 'mdi:plus',
  delete: 'mdi:delete',
} as const;

// Animation durations (ms)
export const ANIMATION = {
  fast: 150,
  normal: 200,
  slow: 300,
  color: 500,
} as const;

// Debounce delays (ms)
export const DEBOUNCE = {
  brightness: 150,
  sceneCache: 5000,
} as const;

// Scene color hints for common Hue scene names
export const SCENE_COLOR_HINTS: Record<string, string> = {
  'relax': '#FF9500',           // Warm orange
  'energize': '#66B2FF',        // Cool blue
  'concentrate': '#FFFFFF',     // White
  'read': '#FFD700',            // Warm yellow
  'dimmed': '#FF8C00',          // Dim orange
  'nightlight': '#FF6B6B',      // Soft red
  'bright': '#FFFFFF',          // White
  'tropical twilight': '#FF69B4', // Pink
  'arctic aurora': '#00CED1',   // Cyan
  'spring blossom': '#FFB7C5',  // Light pink
  'savanna sunset': '#FF6347',  // Tomato
  'tokyo': '#DA70D6',           // Orchid
  'galaxy': '#9400D3',          // Dark violet
  'nebula': '#8A2BE2',          // Blue violet
  'sunset': '#FF4500',          // Orange red
  'forest': '#228B22',          // Forest green
  'ocean': '#0077BE',           // Ocean blue
};
