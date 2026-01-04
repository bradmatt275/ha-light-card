import { LitElement, html, css, CSSResultGroup, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SceneInfo } from '../types';
import { sceneChipStyles } from '../styles';
import { ICONS } from '../const';
import { extractColorFromImage, getForegroundColor, ExtractedColor } from '../utils/scene-color-extractor';

/**
 * Scene chip component for displaying and activating scenes
 */
@customElement('scene-chip')
export class SceneChip extends LitElement {
  @property({ attribute: false }) scene!: SceneInfo;
  @property({ type: Boolean }) active = false;

  @state() private _extractedColor: ExtractedColor | null = null;
  @state() private _isLoadingColor = false;

  static get styles(): CSSResultGroup {
    return [
      sceneChipStyles,
      css`
        :host {
          display: inline-block;
        }
      `,
    ];
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has('scene') && this.scene) {
      this._extractColorFromPicture();
    }
  }

  /**
   * Extract color from scene's entity_picture if available
   */
  private async _extractColorFromPicture(): Promise<void> {
    // If we already have a manually configured color, use that
    if (this.scene.color) {
      this._extractedColor = null;
      return;
    }

    // If scene has an entity_picture, extract color from it
    if (this.scene.entity_picture) {
      this._isLoadingColor = true;
      
      try {
        const color = await extractColorFromImage(this.scene.entity_picture);
        this._extractedColor = color;
      } catch (error) {
        console.warn('Failed to extract scene color:', error);
        this._extractedColor = null;
      } finally {
        this._isLoadingColor = false;
      }
    }
  }

  private _handleClick(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('scene-activate', {
        detail: { sceneId: this.scene.entity_id },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render() {
    // Priority: 1) Extracted color from image, 2) Configured color hint, 3) Default gray
    const swatchColor = this._extractedColor?.hex ?? this.scene.color ?? '#888888';
    
    // Calculate appropriate text color based on background
    let textColor = 'inherit';
    if (this._extractedColor) {
      const [r, g, b] = this._extractedColor.rgb;
      textColor = getForegroundColor(r, g, b);
    }

    return html`
      <div
        class="scene-chip ${this.active ? 'active' : ''}"
        @click=${this._handleClick}
        role="button"
        tabindex="0"
        aria-label="Activate ${this.scene.name} scene"
        aria-pressed=${this.active}
      >
        <div
          class="scene-color-swatch"
          style="background-color: ${swatchColor}"
        >
          ${this.scene.entity_picture ? html`
            <img 
              src="${this.scene.entity_picture}" 
              alt="" 
              class="scene-picture"
              loading="lazy"
            />
          ` : nothing}
        </div>
        <span class="scene-chip-name">${this.scene.name}</span>
        ${this.active
          ? html`<ha-icon class="scene-chip-checkmark" icon=${ICONS.check}></ha-icon>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scene-chip': SceneChip;
  }
}
