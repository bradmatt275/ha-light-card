import { LitElement, html, css, CSSResultGroup, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { LightsRoomCardConfig, SceneInfo, HassEntity, LightConfig } from './types';
import { cardStyles, roomStyles } from './styles';
import { CARD_NAME, CARD_VERSION, DEFAULT_CONFIG, ICONS } from './const';
import { getSceneCache } from './utils/scene-discovery';
import './components/room-section';

// Log card info
console.info(
  `%c LIGHTS-ROOM-CARD %c v${CARD_VERSION} `,
  'color: white; background: #FF6B35; font-weight: bold;',
  'color: #FF6B35; background: white; font-weight: bold;'
);

/**
 * Main Lights Room Card component
 */
@customElement(CARD_NAME)
export class LightsRoomCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LightsRoomCardConfig;
  @state() private _expandedLights: Set<string> = new Set();
  @state() private _collapsedRooms: Set<string> = new Set();
  @state() private _scenesMap: Map<string, SceneInfo[]> = new Map();
  @state() private _activeScenes: Map<string, string> = new Map();
  @state() private _loadingScenes: Set<string> = new Set();

  static get styles(): CSSResultGroup {
    return [
      cardStyles,
      roomStyles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  /**
   * Set the card configuration
   */
  public setConfig(config: LightsRoomCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    if (!config.rooms || !Array.isArray(config.rooms)) {
      throw new Error('You must define at least one room');
    }

    // Validate each room
    for (const room of config.rooms) {
      if (!room.name) {
        throw new Error('Each room must have a name');
      }
      if (!room.lights || !Array.isArray(room.lights)) {
        throw new Error(`Room "${room.name}" must have a lights array`);
      }
      for (const light of room.lights) {
        if (!light.entity) {
          throw new Error(`Each light in room "${room.name}" must have an entity`);
        }
        if (!light.type || !['hue', 'switch'].includes(light.type)) {
          throw new Error(`Light "${light.entity}" must have type "hue" or "switch"`);
        }
      }
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    // Initialize collapsed rooms based on config
    this._collapsedRooms = new Set(
      config.rooms
        .filter((room) => room.collapsed)
        .map((room) => room.name)
    );
  }

  /**
   * Get the card size for dashboard layout
   */
  public getCardSize(): number {
    if (!this._config?.rooms) return 1;

    // Estimate based on number of visible lights
    let lightCount = 0;
    for (const room of this._config.rooms) {
      if (!this._collapsedRooms.has(room.name)) {
        lightCount += room.lights.length;
      }
    }

    // Header + rooms + lights (each light row is ~1 unit)
    return 1 + this._config.rooms.length + lightCount;
  }

  /**
   * Return the config element for the visual editor
   */
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('lights-room-card-editor') as LovelaceCardEditor;
  }

  /**
   * Return a stub config for new cards
   */
  public static getStubConfig(): Partial<LightsRoomCardConfig> {
    return {
      title: 'Lights',
      show_total_power: true,
      rooms: [
        {
          name: 'Living Room',
          lights: [
            { entity: 'light.living_room', type: 'hue' },
          ],
        },
      ],
    };
  }

  /**
   * Called when properties change
   */
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Load scenes for newly expanded Hue lights
    if (changedProps.has('_expandedLights') || changedProps.has('hass')) {
      this._loadScenesForExpandedLights();
    }
  }

  /**
   * Determine if the card should update
   */
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config') || 
        changedProps.has('_expandedLights') ||
        changedProps.has('_collapsedRooms') ||
        changedProps.has('_scenesMap') ||
        changedProps.has('_activeScenes') ||
        changedProps.has('_loadingScenes')) {
      return true;
    }

    if (changedProps.has('hass')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;

      // Check if any entity we care about has changed
      const relevantEntities = this._getRelevantEntities();
      for (const entityId of relevantEntities) {
        if (oldHass.states[entityId] !== this.hass.states[entityId]) {
          return true;
        }
      }

      return false;
    }

    return true;
  }

  /**
   * Get all entity IDs that affect this card
   */
  private _getRelevantEntities(): string[] {
    if (!this._config?.rooms) return [];

    const entities: string[] = [];
    for (const room of this._config.rooms) {
      for (const light of room.lights) {
        entities.push(light.entity);
        if (light.power_entity) {
          entities.push(light.power_entity);
        }
      }
    }
    return entities;
  }

  /**
   * Load scenes for any expanded Hue lights that don't have scenes yet
   */
  private async _loadScenesForExpandedLights(): Promise<void> {
    if (!this.hass || !this._config?.rooms) return;

    const sceneCache = getSceneCache();

    for (const room of this._config.rooms) {
      for (const light of room.lights) {
        if (
          light.type === 'hue' &&
          this._expandedLights.has(light.entity) &&
          !this._scenesMap.has(light.entity) &&
          !this._loadingScenes.has(light.entity)
        ) {
          // Mark as loading
          this._loadingScenes = new Set([...this._loadingScenes, light.entity]);

          try {
            const scenes = await sceneCache.getScenesForLight(this.hass, light.entity);
            this._scenesMap = new Map([...this._scenesMap, [light.entity, scenes]]);
          } catch (error) {
            console.error(`Failed to load scenes for ${light.entity}:`, error);
            this._scenesMap = new Map([...this._scenesMap, [light.entity, []]]);
          } finally {
            const newLoading = new Set(this._loadingScenes);
            newLoading.delete(light.entity);
            this._loadingScenes = newLoading;
          }
        }
      }
    }
  }

  /**
   * Calculate total power consumption across all rooms
   */
  private _calculateTotalPower(): number | null {
    if (!this._config?.rooms) return null;

    let total = 0;
    let hasAnyPower = false;

    for (const room of this._config.rooms) {
      for (const light of room.lights) {
        if (light.power_entity) {
          const powerState = this.hass.states[light.power_entity] as HassEntity | undefined;
          if (powerState && powerState.state !== 'unavailable') {
            const value = parseFloat(powerState.state);
            if (!isNaN(value)) {
              total += value;
              hasAnyPower = true;
            }
          }
        }
      }
    }

    return hasAnyPower ? total : null;
  }

  /**
   * Handle room collapse toggle
   */
  private _handleRoomCollapseToggle(e: CustomEvent): void {
    const roomName = e.detail.roomName;
    const newCollapsed = new Set(this._collapsedRooms);

    if (newCollapsed.has(roomName)) {
      newCollapsed.delete(roomName);
    } else {
      newCollapsed.add(roomName);
    }

    this._collapsedRooms = newCollapsed;
  }

  /**
   * Handle light expand toggle
   */
  private _handleLightExpandToggle(e: CustomEvent): void {
    const entityId = e.detail.entityId;
    const newExpanded = new Set(this._expandedLights);

    if (newExpanded.has(entityId)) {
      newExpanded.delete(entityId);
    } else {
      newExpanded.add(entityId);
    }

    this._expandedLights = newExpanded;
  }

  /**
   * Handle scene activation
   */
  private _handleSceneActivated(e: CustomEvent): void {
    const { entityId, sceneId } = e.detail;
    this._activeScenes = new Map([...this._activeScenes, [entityId, sceneId]]);
  }

  /**
   * Render the card header
   */
  private _renderHeader() {
    const title = this._config.title ?? 'Lights';
    const showPower = this._config.show_total_power ?? true;
    const totalPower = showPower ? this._calculateTotalPower() : null;

    return html`
      <div class="card-header">
        <h1 class="card-title">${title}</h1>
        ${totalPower !== null
          ? html`
              <div class="total-power">
                <ha-icon icon=${ICONS.power}></ha-icon>
                <span>${Math.round(totalPower)} W</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /**
   * Render all room sections
   */
  private _renderRooms() {
    if (!this._config.rooms || this._config.rooms.length === 0) {
      return html`
        <div class="no-rooms-message">
          No rooms configured. Open the card editor to add rooms.
        </div>
      `;
    }

    return html`
      <div class="rooms-container">
        ${this._config.rooms.map(
          (room, index) => html`
            <room-section
              .hass=${this.hass}
              .config=${room}
              .collapsed=${this._collapsedRooms.has(room.name)}
              .expandedLights=${this._expandedLights}
              .scenesMap=${this._scenesMap}
              .activeScenes=${this._activeScenes}
              @room-collapse-toggle=${this._handleRoomCollapseToggle}
              @light-expand-toggle=${this._handleLightExpandToggle}
              @scene-activated=${this._handleSceneActivated}
            ></room-section>
            ${index < this._config.rooms.length - 1
              ? html`<div class="room-divider"></div>`
              : nothing}
          `
        )}
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    return html`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderRooms()}
      </ha-card>
    `;
  }
}

// Register card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: 'Lights Room Card',
  description: 'A card for managing lights grouped by room with Hue scene support',
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: LightsRoomCard;
  }
}
