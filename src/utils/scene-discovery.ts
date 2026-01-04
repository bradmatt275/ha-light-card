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
    return {
      entity_id: sceneId,
      name: sceneState?.attributes?.friendly_name ?? sceneId.split('.')[1] ?? sceneId,
      color: extractSceneColor(hass, sceneId) ?? undefined,
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
