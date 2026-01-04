import { LitElement, html, css, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SceneInfo } from '../types';
import { sceneChipStyles } from '../styles';
import { ICONS } from '../const';

/**
 * Scene chip component for displaying and activating scenes
 */
@customElement('scene-chip')
export class SceneChip extends LitElement {
  @property({ attribute: false }) scene!: SceneInfo;
  @property({ type: Boolean }) active = false;

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
    const swatchColor = this.scene.color ?? '#888888';

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
        ></div>
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
