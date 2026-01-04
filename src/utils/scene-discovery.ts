import { HomeAssistant } from 'custom-card-helpers';
import { SceneInfo, HassEntity } from '../types';
import { HassWsClient } from './hass-ws-client';
import { SCENE_COLOR_HINTS } from '../const';

/**
 * Extract a representative color for a scene
 */
export function extractSceneColor(hass: HomeAssistant, sceneEntityId: string): string | null {
  const sceneState = hass.states[sceneEntityId] as HassEntity | undefined;

  if (!sceneState) return null;

  // Check scene name for color hints
  const sceneName = sceneState.attributes?.friendly_name?.toLowerCase() ?? '';

  for (const [hint, color] of Object.entries(SCENE_COLOR_HINTS)) {
    if (sceneName.includes(hint)) {
      return color;
    }
  }

  return null;
}

/**
 * Extract just the scene name without the area/device prefix
 * Hue scenes often have format "Area Name Scene Name" or "Device Name Scene Name"
 */
function extractSceneName(fullName: string, areaId: string | null): string {
  if (!fullName) return fullName;

  // Common patterns to remove:
  // - "Master Bedroom Amethyst valley" -> "Amethyst valley"
  // - "Living Room Relax" -> "Relax"
  
  // Try to find and remove area name prefix (case-insensitive)
  if (areaId) {
    // Convert area_id format (e.g., "master_bedroom") to possible display formats
    const areaVariants = [
      areaId.replace(/_/g, ' '),  // "master bedroom"
      areaId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),  // "Master Bedroom"
    ];

    for (const areaName of areaVariants) {
      // Check if the name starts with the area name (case-insensitive)
      if (fullName.toLowerCase().startsWith(areaName.toLowerCase())) {
        const remainder = fullName.slice(areaName.length).trim();
        if (remainder) return remainder;
      }
    }
  }

  // Also try to detect common patterns like "DeviceName SceneName"
  // If the name has multiple words and the first part matches a known device pattern, strip it
  const words = fullName.split(' ');
  if (words.length > 1) {
    // Check for common Hue scene name patterns at the end
    const knownSceneNames = [
      'relax', 'energize', 'concentrate', 'read', 'dimmed', 'nightlight', 'bright',
      'tropical twilight', 'arctic aurora', 'spring blossom', 'savanna sunset',
      'tokyo', 'galaxy', 'nebula', 'sunset', 'forest', 'ocean',
      'amethyst valley', 'baby\'s breath', 'frosty dawn', 'still waters',
      'soho', 'chinatown', 'golden pond', 'honolulu', 'fairfax', 'hal',
      'tyrell', 'painted sky', 'rolling hills', 'starlight', 'moonlight',
      'lake placid', 'lake mist', 'disturbia', 'ibiza', 'miami', 'cancun',
      'rio', 'palm beach', 'motown', 'memphis', 'hampton', 'bossa nova'
    ];

    const lowerName = fullName.toLowerCase();
    for (const sceneName of knownSceneNames) {
      if (lowerName.endsWith(sceneName)) {
        // Extract just the scene name portion with proper casing
        const index = lowerName.lastIndexOf(sceneName);
        return fullName.slice(index);
      }
    }
  }

  return fullName;
}

/**
 * Discover scenes for a light entity using the search/related API
 */
export async function discoverScenesForLight(
  hass: HomeAssistant,
  entityId: string
): Promise<SceneInfo[]> {
  const client = new HassWsClient(hass);

  // Find the area for this light
  const areaId = await client.getEntityArea(entityId);
  if (!areaId) return [];

  // Get all scenes in that area
  const sceneEntityIds = await client.getAreaScenes(areaId);

  // Convert to SceneInfo objects
  return sceneEntityIds.map((sceneId) => {
    const sceneState = hass.states[sceneId] as HassEntity | undefined;
    const fullName = sceneState?.attributes?.friendly_name ?? sceneId.split('.')[1] ?? sceneId;
    
    // Get entity_picture for Hue scenes (used for color extraction)
    const entityPicture = sceneState?.attributes?.entity_picture as string | undefined;
    
    return {
      entity_id: sceneId,
      name: extractSceneName(fullName, areaId),
      color: extractSceneColor(hass, sceneId) ?? undefined,
      entity_picture: entityPicture,
      is_active: false,
    };
  });
}

/**
 * Cache for discovered scenes to avoid repeated WebSocket calls
 */
export class SceneCache {
  private cache: Map<string, SceneInfo[]> = new Map();
  private loadingPromises: Map<string, Promise<SceneInfo[]>> = new Map();
  private timestamps: Map<string, number> = new Map();
  private readonly cacheTimeout: number;

  constructor(cacheTimeoutMs: number = 5 * 60 * 1000) {
    this.cacheTimeout = cacheTimeoutMs;
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheValid(entityId: string): boolean {
    const timestamp = this.timestamps.get(entityId);
    if (!timestamp) return false;
    return Date.now() - timestamp < this.cacheTimeout;
  }

  /**
   * Get scenes for a light, using cache when available
   */
  async getScenesForLight(
    hass: HomeAssistant,
    entityId: string
  ): Promise<SceneInfo[]> {
    // Return cached if available and valid
    if (this.cache.has(entityId) && this.isCacheValid(entityId)) {
      return this.cache.get(entityId)!;
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(entityId)) {
      return this.loadingPromises.get(entityId)!;
    }

    // Start loading
    const promise = discoverScenesForLight(hass, entityId);
    this.loadingPromises.set(entityId, promise);

    try {
      const scenes = await promise;
      this.cache.set(entityId, scenes);
      this.timestamps.set(entityId, Date.now());
      return scenes;
    } finally {
      this.loadingPromises.delete(entityId);
    }
  }

  /**
   * Invalidate cache for a specific entity or all entities
   */
  invalidate(entityId?: string): void {
    if (entityId) {
      this.cache.delete(entityId);
      this.timestamps.delete(entityId);
    } else {
      this.cache.clear();
      this.timestamps.clear();
    }
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    this.cache.clear();
    this.loadingPromises.clear();
    this.timestamps.clear();
  }
}

// Singleton instance for the scene cache
let sceneCacheInstance: SceneCache | null = null;

/**
 * Get the singleton scene cache instance
 */
export function getSceneCache(): SceneCache {
  if (!sceneCacheInstance) {
    sceneCacheInstance = new SceneCache();
  }
  return sceneCacheInstance;
}
