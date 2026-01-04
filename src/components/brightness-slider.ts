import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { expandedPanelStyles } from '../styles';
import { debounce } from '../utils/debounce';

/**
 * Brightness slider component for controlling light brightness
 */
@customElement('brightness-slider')
export class BrightnessSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Boolean }) disabled = false;

  @state() private _localValue = 0;

  private _debouncedChange: (value: number) => void;

  constructor() {
    super();
    this._debouncedChange = debounce((value: number) => {
      this.dispatchEvent(
        new CustomEvent('brightness-change', {
          detail: { value },
          bubbles: true,
          composed: true,
        })
      );
    }, 150);
  }

  static get styles(): CSSResultGroup {
    return [
      expandedPanelStyles,
      css`
        :host {
          display: block;
        }

        .brightness-container {
          margin-bottom: 0;
        }
      `,
    ];
  }

  protected willUpdate(changedProps: Map<string, unknown>): void {
    if (changedProps.has('value')) {
      this._localValue = this.value;
    }
  }

  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._localValue = parseInt(target.value, 10);

    // Update the slider visual immediately
    this.requestUpdate();

    // Debounce the actual service call
    this._debouncedChange(this._localValue);
  }

  private _handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);

    // Fire the change event immediately on release
    this.dispatchEvent(
      new CustomEvent('brightness-change', {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render() {
    const progress = this._localValue;

    return html`
      <div class="brightness-container">
        <input
          type="range"
          class="brightness-slider"
          min="0"
          max="100"
          .value=${String(this._localValue)}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
          aria-label="Brightness"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this._localValue}
          style="--slider-progress: ${progress}%"
        />
        <span class="brightness-label">${this._localValue}%</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brightness-slider': BrightnessSlider;
  }
}
