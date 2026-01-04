import { HomeAssistant } from 'custom-card-helpers';
import { HassSearchRelatedResult } from '../types';

/**
 * WebSocket client for Home Assistant API calls
 */
export class HassWsClient {
  constructor(private hass: HomeAssistant) {}

  /**
   * Send a WebSocket message and wait for the response
   */
  private async sendMessage<T>(message: { type: string; [key: string]: unknown }): Promise<T> {
    // Access connection through hass object
    const connection = (this.hass as unknown as { connection: { sendMessagePromise: <R>(msg: unknown) => Promise<R> } }).connection;
    return connection.sendMessagePromise<T>(message);
  }

  /**
   * Get the area ID for a given entity
   */
  async getEntityArea(entityId: string): Promise<string | null> {
    try {
      const result = await this.sendMessage<HassSearchRelatedResult>({
        type: 'search/related',
        item_type: 'entity',
        item_id: entityId,
      });

      return result?.area?.[0] ?? null;
    } catch (error) {
      console.error(`Error getting area for entity ${entityId}:`, error);
      return null;
    }
  }

  /**
   * Get all scene entity IDs for a given area
   */
  async getAreaScenes(areaId: string): Promise<string[]> {
    try {
      const result = await this.sendMessage<HassSearchRelatedResult>({
        type: 'search/related',
        item_type: 'area',
        item_id: areaId,
      });

      return result?.scene ?? [];
    } catch (error) {
      console.error(`Error getting scenes for area ${areaId}:`, error);
      return [];
    }
  }

  /**
   * Get all entities related to a device
   */
  async getDeviceEntities(deviceId: string): Promise<string[]> {
    try {
      const result = await this.sendMessage<HassSearchRelatedResult>({
        type: 'search/related',
        item_type: 'device',
        item_id: deviceId,
      });

      return result?.entity ?? [];
    } catch (error) {
      console.error(`Error getting entities for device ${deviceId}:`, error);
      return [];
    }
  }
}
