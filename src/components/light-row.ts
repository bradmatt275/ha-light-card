import { LitElement, html, css, CSSResultGroup, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { LightConfig, SceneInfo, HassEntity } from '../types';
import { lightRowStyles, expandedPanelStyles } from '../styles';
import { ICONS } from '../const';
import { getLightCurrentColor, getDefaultOnColor } from '../utils/color-utils';
import './scene-chip';
import './brightness-slider';

/**
 * Light row component displaying a single light with controls
 */
@customElement('light-row')
export class LightRow extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LightConfig;
  @property({ type: Boolean }) expanded = false;
  @property({ attribute: false }) scenes: SceneInfo[] = [];
  @property({ type: String }) activeSceneId?: string;

  @state() private _turningOn = false;

  static get styles(): CSSResultGroup {
    return [
      lightRowStyles,
      expandedPanelStyles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  /**
   * Get the entity state from Home Assistant
   */
  private _getEntityState(): HassEntity | undefined {
    return this.hass.states[this.config.entity] as HassEntity | undefined;
  }

  /**
   * Get the power entity state if configured
   */
  private _getPowerState(): HassEntity | undefined {
    if (!this.config.power_entity) return undefined;
    return this.hass.states[this.config.power_entity] as HassEntity | undefined;
  }

  /**
   * Determine if the light is on
   */
  private _isOn(): boolean {
    const state = this._getEntityState();
    return state?.state === 'on';
  }

  /**
   * Determine if the light is available
   */
  private _isAvailable(): boolean {
    const state = this._getEntityState();
    return state?.state !== 'unavailable' && state?.state !== undefined;
  }

  /**
   * Get brightness percentage (0-100)
   */
  private _getBrightnessPercent(): number | null {
    if (this.config.type !== 'hue') return null;

    const state = this._getEntityState();
    if (!state || state.state !== 'on') return null;

    const brightness = state.attributes.brightness;
    if (brightness === undefined) return null;

    return Math.round((brightness / 255) * 100);
  }

  /**
   * Get current color from the light state
   */
  private _getCurrentColor(): string | null {
    const state = this._getEntityState();
    if (!state || state.state !== 'on') return null;

    return getLightCurrentColor(state);
  }

  /**
   * Get display name for the light
   */
  private _getDisplayName(): string {
    if (this.config.name) return this.config.name;

    const state = this._getEntityState();
    return state?.attributes.friendly_name ?? this.config.entity.split('.')[1] ?? this.config.entity;
  }

  /**
   * Get power value if available
   */
  private _getPower(): number | null {
    const powerState = this._getPowerState();
    if (!powerState || powerState.state === 'unavailable') return null;

    const value = parseFloat(powerState.state);
    return isNaN(value) ? null : value;
  }

  /**
   * Render the status text (power, brightness, or "Off")
   */
  private _renderStatus() {
    const isAvailable = this._isAvailable();
    const isOn = this._isOn();

    if (!isAvailable) {
      return html`<span class="light-status unavailable">Unavailable</span>`;
    }

    if (!isOn) {
      return html`<span class="light-status">Off</span>`;
    }

    const power = this._getPower();
    if (power !== null) {
      return html`<span class="light-status">${Math.round(power)} W</span>`;
    }

    const brightness = this._getBrightnessPercent();
    if (brightness !== null && this.config.type === 'hue') {
      return html`<span class="light-status">${brightness}%</span>`;
    }

    return html`<span class="light-status">On</span>`;
  }

  /**
   * Handle light toggle
   */
  private _handleToggle(e: Event): void {
    e.stopPropagation();

    const wasOff = !this._isOn();

    this.hass.callService('homeassistant', 'toggle', {
      entity_id: this.config.entity,
    });

    // Trigger animation if turning on
    if (wasOff) {
      this._turningOn = true;
      setTimeout(() => {
        this._turningOn = false;
      }, 300);
    }
  }

  /**
   * Handle expand button click
   */
  private _handleExpandClick(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('expand-toggle', {
        detail: { entityId: this.config.entity },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle brightness change
   */
  private _handleBrightnessChange(e: CustomEvent): void {
    const brightness = e.detail.value;
    this.hass.callService('light', 'turn_on', {
      entity_id: this.config.entity,
      brightness_pct: brightness,
    });
  }

  /**
   * Handle scene activation
   */
  private _handleSceneActivate(e: CustomEvent): void {
    const sceneId = e.detail.sceneId;
    this.hass.callService('scene', 'turn_on', {
      entity_id: sceneId,
    });

    // Emit event to track active scene
    this.dispatchEvent(
      new CustomEvent('scene-activated', {
        detail: { entityId: this.config.entity, sceneId },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Render the expanded panel with brightness slider and scenes
   */
  private _renderExpandedPanel() {
    if (!this.expanded) return nothing;

    const brightness = this._getBrightnessPercent() ?? 0;
    const isAvailable = this._isAvailable();

    return html`
      <div class="expanded-panel">
        <brightness-slider
          .value=${brightness}
          ?disabled=${!isAvailable}
          @brightness-change=${this._handleBrightnessChange}
        ></brightness-slider>

        ${this.scenes.length > 0
          ? html`
              <div class="scene-grid">
                ${this.scenes.map(
                  (scene) => html`
                    <scene-chip
                      .scene=${scene}
                      .active=${this.activeSceneId === scene.entity_id}
                      @scene-activate=${this._handleSceneActivate}
                    ></scene-chip>
                  `
                )}
              </div>
            `
          : html`<div class="no-scenes-message">No scenes found for this light</div>`}
      </div>
    `;
  }

  protected render() {
    const isOn = this._isOn();
    const isAvailable = this._isAvailable();
    const currentColor = this._getCurrentColor();
    const hasSceneColor = isOn && currentColor !== null;
    const isHue = this.config.type === 'hue';

    // Determine icon style
    let iconClass = 'light-icon';
    if (!isAvailable) {
      iconClass += ' unavailable';
    } else if (isOn) {
      iconClass += ' on';
      if (hasSceneColor) {
        iconClass += ' colored';
      }
    }
    if (this._turningOn) {
      iconClass += ' turning-on';
    }

    const icon = isOn ? ICONS.lightOn : ICONS.lightOff;
    const iconColor = hasSceneColor ? currentColor : isOn ? getDefaultOnColor() : null;

    return html`
      <div
        class="light-row ${hasSceneColor ? 'has-scene-color' : ''}"
        style="${hasSceneColor ? `--scene-color: ${currentColor}` : ''}"
      >
        <div class="light-row-main" @click=${this._handleToggle}>
          <ha-icon
            class=${iconClass}
            icon=${icon}
            style="${iconColor ? `color: ${iconColor}` : ''}"
          ></ha-icon>
          <span class="light-name">${this._getDisplayName()}</span>
          ${this._renderStatus()}
          ${isHue
            ? html`
                <div
                  class="expand-button ${this.expanded ? 'expanded' : ''}"
                  @click=${this._handleExpandClick}
                  role="button"
                  tabindex="0"
                  aria-label="Expand light controls"
                  aria-expanded=${this.expanded}
                >
                  <ha-icon icon=${ICONS.expand}></ha-icon>
                </div>
              `
            : nothing}
        </div>
        ${this._renderExpandedPanel()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'light-row': LightRow;
  }
}
