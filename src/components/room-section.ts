import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { RoomConfig, SceneInfo, HassEntity } from '../types';
import { roomStyles } from '../styles';
import { ICONS } from '../const';
import './light-row';

/**
 * Room section component containing a group of lights
 */
@customElement('room-section')
export class RoomSection extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: RoomConfig;
  @property({ type: Boolean }) collapsed = false;
  @property({ attribute: false }) expandedLights: Set<string> = new Set();
  @property({ attribute: false }) scenesMap: Map<string, SceneInfo[]> = new Map();
  @property({ attribute: false }) activeScenes: Map<string, string> = new Map();

  static get styles(): CSSResultGroup {
    return [
      roomStyles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  /**
   * Calculate total power consumption for the room
   */
  private _calculateRoomPower(): number | null {
    let total = 0;
    let hasAnyPower = false;

    for (const light of this.config.lights) {
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

    return hasAnyPower ? total : null;
  }

  /**
   * Handle room header click to toggle collapse
   */
  private _handleHeaderClick(): void {
    this.dispatchEvent(
      new CustomEvent('room-collapse-toggle', {
        detail: { roomName: this.config.name },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle light expand toggle
   */
  private _handleLightExpandToggle(e: CustomEvent): void {
    const entityId = e.detail.entityId;
    this.dispatchEvent(
      new CustomEvent('light-expand-toggle', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle scene activation from a light row
   */
  private _handleSceneActivated(e: CustomEvent): void {
    // Re-emit the event to bubble up to the main card
    this.dispatchEvent(
      new CustomEvent('scene-activated', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Render the room header
   */
  private _renderHeader() {
    const power = this._calculateRoomPower();

    return html`
      <div class="room-header" @click=${this._handleHeaderClick}>
        <div class="room-header-left">
          <ha-icon
            class="collapse-icon ${this.collapsed ? 'collapsed' : ''}"
            icon=${ICONS.chevronDown}
          ></ha-icon>
          <span class="room-header-name">${this.config.name}</span>
        </div>
        <div class="room-header-right">
          ${power !== null
            ? html`<span class="room-header-power">${Math.round(power)} W</span>`
            : ''}
        </div>
      </div>
    `;
  }

  /**
   * Render the lights in this room
   */
  private _renderLights() {
    return html`
      <div class="room-content ${this.collapsed ? 'collapsed' : ''}">
        ${this.config.lights.map(
          (lightConfig) => html`
            <light-row
              .hass=${this.hass}
              .config=${lightConfig}
              .expanded=${this.expandedLights.has(lightConfig.entity)}
              .scenes=${this.scenesMap.get(lightConfig.entity) ?? []}
              .activeSceneId=${this.activeScenes.get(lightConfig.entity)}
              @expand-toggle=${this._handleLightExpandToggle}
              @scene-activated=${this._handleSceneActivated}
            ></light-row>
          `
        )}
      </div>
    `;
  }

  protected render() {
    return html`
      <div class="room-section">
        ${this._renderHeader()}
        ${this._renderLights()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'room-section': RoomSection;
  }
}
