import { LitElement, html, css, CSSResultGroup, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { LightsRoomCardConfig, RoomConfig, LightConfig } from './types';
import { editorStyles } from './styles';
import { ICONS } from './const';

/**
 * Visual editor for the Lights Room Card
 */
@customElement('lights-room-card-editor')
export class LightsRoomCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LightsRoomCardConfig;
  @state() private _expandedRooms: Set<number> = new Set([0]);

  static get styles(): CSSResultGroup {
    return [
      editorStyles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  public setConfig(config: LightsRoomCardConfig): void {
    this._config = config;
  }

  /**
   * Fire config changed event
   */
  private _fireConfigChanged(): void {
    fireEvent(this, 'config-changed', { config: this._config });
  }

  /**
   * Handle value change for card-level properties
   */
  private _valueChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    const configValue = target.getAttribute('data-config-value') || target.getAttribute('configValue');

    if (!configValue) return;

    let value: string | boolean = target.value;
    if (target.type === 'checkbox') {
      value = target.checked;
    }

    this._config = {
      ...this._config,
      [configValue]: value,
    };

    this._fireConfigChanged();
  }

  /**
   * Toggle a room's expanded state in the editor
   */
  private _toggleRoomExpanded(roomIndex: number): void {
    const newExpanded = new Set(this._expandedRooms);
    if (newExpanded.has(roomIndex)) {
      newExpanded.delete(roomIndex);
    } else {
      newExpanded.add(roomIndex);
    }
    this._expandedRooms = newExpanded;
  }

  /**
   * Add a new room
   */
  private _addRoom(): void {
    const newRoom: RoomConfig = {
      name: `Room ${(this._config.rooms?.length ?? 0) + 1}`,
      lights: [],
    };

    this._config = {
      ...this._config,
      rooms: [...(this._config.rooms ?? []), newRoom],
    };

    // Expand the new room
    this._expandedRooms = new Set([...this._expandedRooms, this._config.rooms.length - 1]);

    this._fireConfigChanged();
  }

  /**
   * Delete a room
   */
  private _deleteRoom(e: Event, roomIndex: number): void {
    e.stopPropagation();

    const rooms = [...(this._config.rooms ?? [])];
    rooms.splice(roomIndex, 1);

    this._config = {
      ...this._config,
      rooms,
    };

    // Update expanded rooms indices
    const newExpanded = new Set<number>();
    for (const index of this._expandedRooms) {
      if (index < roomIndex) {
        newExpanded.add(index);
      } else if (index > roomIndex) {
        newExpanded.add(index - 1);
      }
    }
    this._expandedRooms = newExpanded;

    this._fireConfigChanged();
  }

  /**
   * Handle room property change
   */
  private _roomValueChanged(e: Event, roomIndex: number, key: keyof RoomConfig): void {
    const target = e.target as HTMLInputElement;
    let value: string | boolean = target.value;

    if (target.type === 'checkbox') {
      value = target.checked;
    }

    const rooms = [...(this._config.rooms ?? [])];
    rooms[roomIndex] = {
      ...rooms[roomIndex],
      [key]: value,
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Add a new light to a room
   */
  private _addLight(roomIndex: number): void {
    const newLight: LightConfig = {
      entity: '',
      type: 'switch',
    };

    const rooms = [...(this._config.rooms ?? [])];
    rooms[roomIndex] = {
      ...rooms[roomIndex],
      lights: [...rooms[roomIndex].lights, newLight],
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Remove a light from a room
   */
  private _removeLight(roomIndex: number, lightIndex: number): void {
    const rooms = [...(this._config.rooms ?? [])];
    const lights = [...rooms[roomIndex].lights];
    lights.splice(lightIndex, 1);

    rooms[roomIndex] = {
      ...rooms[roomIndex],
      lights,
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Move a light up in the list
   */
  private _moveLightUp(roomIndex: number, lightIndex: number): void {
    if (lightIndex === 0) return;

    const rooms = [...(this._config.rooms ?? [])];
    const lights = [...rooms[roomIndex].lights];
    
    // Swap with previous item
    [lights[lightIndex - 1], lights[lightIndex]] = [lights[lightIndex], lights[lightIndex - 1]];

    rooms[roomIndex] = {
      ...rooms[roomIndex],
      lights,
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Move a light down in the list
   */
  private _moveLightDown(roomIndex: number, lightIndex: number): void {
    const rooms = [...(this._config.rooms ?? [])];
    const lights = [...rooms[roomIndex].lights];
    
    if (lightIndex >= lights.length - 1) return;

    // Swap with next item
    [lights[lightIndex], lights[lightIndex + 1]] = [lights[lightIndex + 1], lights[lightIndex]];

    rooms[roomIndex] = {
      ...rooms[roomIndex],
      lights,
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Handle light property change
   */
  private _lightValueChanged(
    value: string,
    roomIndex: number,
    lightIndex: number,
    key: keyof LightConfig
  ): void {
    const rooms = [...(this._config.rooms ?? [])];
    const lights = [...rooms[roomIndex].lights];

    lights[lightIndex] = {
      ...lights[lightIndex],
      [key]: value || undefined, // Remove empty strings
    };

    rooms[roomIndex] = {
      ...rooms[roomIndex],
      lights,
    };

    this._config = {
      ...this._config,
      rooms,
    };

    this._fireConfigChanged();
  }

  /**
   * Render a light editor
   */
  private _renderLightEditor(
    light: LightConfig,
    roomIndex: number,
    lightIndex: number,
    totalLights: number
  ) {
    const isFirst = lightIndex === 0;
    const isLast = lightIndex === totalLights - 1;

    return html`
      <div class="light-editor">
        <div class="light-editor-header">
          <div class="reorder-buttons">
            <mwc-icon-button
              .disabled=${isFirst}
              @click=${() => this._moveLightUp(roomIndex, lightIndex)}
              title="Move up"
            >
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </mwc-icon-button>
            <mwc-icon-button
              .disabled=${isLast}
              @click=${() => this._moveLightDown(roomIndex, lightIndex)}
              title="Move down"
            >
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </mwc-icon-button>
          </div>
          <span class="light-index">#${lightIndex + 1}</span>
        </div>

        <div class="form-group">
          <label>Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['light', 'switch'] } }}
            .value=${light.entity || ''}
            @value-changed=${(e: CustomEvent) =>
              this._lightValueChanged(e.detail.value || '', roomIndex, lightIndex, 'entity')}
          ></ha-selector>
        </div>

        <div class="type-selection">
          <label>Type</label>
          <ha-formfield label="Hue">
            <ha-radio
              name="type-${roomIndex}-${lightIndex}"
              .checked=${light.type === 'hue'}
              @change=${() =>
                this._lightValueChanged('hue', roomIndex, lightIndex, 'type')}
            ></ha-radio>
          </ha-formfield>
          <ha-formfield label="Switch">
            <ha-radio
              name="type-${roomIndex}-${lightIndex}"
              .checked=${light.type === 'switch'}
              @change=${() =>
                this._lightValueChanged('switch', roomIndex, lightIndex, 'type')}
            ></ha-radio>
          </ha-formfield>
        </div>

        <div class="form-group">
          <label>Power Entity (optional)</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['sensor'] } }}
            .value=${light.power_entity || ''}
            @value-changed=${(e: CustomEvent) =>
              this._lightValueChanged(e.detail.value || '', roomIndex, lightIndex, 'power_entity')}
          ></ha-selector>
        </div>

        <ha-textfield
          label="Name Override (optional)"
          .value=${light.name ?? ''}
          @input=${(e: Event) =>
            this._lightValueChanged(
              (e.target as HTMLInputElement).value,
              roomIndex,
              lightIndex,
              'name'
            )}
        ></ha-textfield>

        <mwc-button class="remove-button" @click=${() => this._removeLight(roomIndex, lightIndex)}>
          Remove
        </mwc-button>
      </div>
    `;
  }

  /**
   * Render a room editor
   */
  private _renderRoomEditor(room: RoomConfig, roomIndex: number) {
    const isExpanded = this._expandedRooms.has(roomIndex);

    return html`
      <div class="room-editor">
        <div class="room-editor-header" @click=${() => this._toggleRoomExpanded(roomIndex)}>
          <ha-icon icon=${isExpanded ? ICONS.chevronDown : ICONS.chevronRight}></ha-icon>
          <span class="room-name">${room.name || 'Unnamed Room'}</span>
          <mwc-icon-button @click=${(e: Event) => this._deleteRoom(e, roomIndex)}>
            <ha-icon icon=${ICONS.delete}></ha-icon>
          </mwc-icon-button>
        </div>

        ${isExpanded
          ? html`
              <div class="room-editor-content">
                <ha-textfield
                  label="Room Name"
                  .value=${room.name}
                  @input=${(e: Event) => this._roomValueChanged(e, roomIndex, 'name')}
                ></ha-textfield>

                ${(this._config.columns ?? 1) > 1
                  ? html`
                      <div class="column-assignment">
                        <label>Assign to Column</label>
                        <div class="column-buttons">
                          ${Array.from({ length: this._config.columns ?? 1 }, (_, i) => i + 1).map(
                            (num) => html`
                              <mwc-button
                                class="column-button ${(room.column ?? 1) === num ? 'active' : ''}"
                                @click=${() => this._setRoomColumn(roomIndex, num)}
                              >
                                ${num}
                              </mwc-button>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : nothing}

                <ha-formfield label="Start collapsed">
                  <ha-switch
                    .checked=${room.collapsed ?? false}
                    @change=${(e: Event) => this._roomValueChanged(e, roomIndex, 'collapsed')}
                  ></ha-switch>
                </ha-formfield>

                <div class="lights-header">
                  <span class="section-title">LIGHTS</span>
                  <mwc-button @click=${() => this._addLight(roomIndex)}>
                    <ha-icon icon=${ICONS.add}></ha-icon>
                    Add Light
                  </mwc-button>
                </div>

                ${room.lights?.map((light, lightIndex) =>
                  this._renderLightEditor(light, roomIndex, lightIndex, room.lights.length)
                )}

                ${room.lights?.length === 0
                  ? html`<div class="no-lights-message">No lights added yet</div>`
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const columns = this._config.columns ?? 1;

    return html`
      <div class="card-config">
        <ha-textfield
          label="Title"
          .value=${this._config.title ?? 'Lights'}
          data-config-value="title"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-formfield label="Show total power consumption">
          <ha-switch
            .checked=${this._config.show_total_power ?? true}
            data-config-value="show_total_power"
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <div class="section-header">
          <span class="section-title">LAYOUT</span>
        </div>

        <ha-select
          label="Number of Columns"
          .value=${String(columns)}
          @selected=${this._columnsChanged}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
        >
          ${[1, 2, 3, 4].map(
            (num) => html`
              <mwc-list-item .value=${String(num)}>${num}</mwc-list-item>
            `
          )}
        </ha-select>

        <div class="section-header">
          <span class="section-title">POWER ENTITIES (Optional)</span>
        </div>

        <div class="power-entities-info">
          Custom entities for total power calculation. Leave empty to sum individual light power values.
        </div>

        ${(this._config.power_entities ?? []).map((entityId, index) =>
          this._renderPowerEntityEditor(entityId, index)
        )}

        <mwc-button @click=${this._addPowerEntity}>
          <ha-icon icon=${ICONS.add}></ha-icon>
          Add Power Entity
        </mwc-button>

        <div class="section-header">
          <span class="section-title">ROOMS</span>
          <mwc-button @click=${this._addRoom}>
            <ha-icon icon=${ICONS.add}></ha-icon>
            Add Room
          </mwc-button>
        </div>

        ${this._config.rooms?.map((room, roomIndex) =>
          this._renderRoomEditor(room, roomIndex)
        )}

        ${!this._config.rooms || this._config.rooms.length === 0
          ? html`<div class="no-rooms-message">No rooms configured yet</div>`
          : nothing}
      </div>
    `;
  }

  /**
   * Handle columns dropdown change
   */
  private _columnsChanged(e: CustomEvent): void {
    const value = (e.target as HTMLSelectElement).value;
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 4) {
      this._config = {
        ...this._config,
        columns: num,
      };
      this._fireConfigChanged();
    }
  }

  /**
   * Set the column assignment for a room
   */
  private _setRoomColumn(roomIndex: number, column: number): void {
    const rooms = [...(this._config.rooms ?? [])];
    rooms[roomIndex] = {
      ...rooms[roomIndex],
      column,
    };
    this._config = {
      ...this._config,
      rooms,
    };
    this._fireConfigChanged();
  }

  /**
   * Render a power entity editor row
   */
  private _renderPowerEntityEditor(entityId: string, index: number) {
    return html`
      <div class="power-entity-row">
        <div class="form-group" style="flex: 1;">
          <label>Power Entity ${index + 1}</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['sensor'] } }}
            .value=${entityId || ''}
            @value-changed=${(e: CustomEvent) => this._powerEntityChanged(e.detail.value || '', index)}
          ></ha-selector>
        </div>
        <mwc-icon-button @click=${() => this._removePowerEntity(index)}>
          <ha-icon icon=${ICONS.delete}></ha-icon>
        </mwc-icon-button>
      </div>
    `;
  }

  /**
   * Add a new power entity
   */
  private _addPowerEntity(): void {
    const powerEntities = [...(this._config.power_entities ?? []), ''];
    this._config = {
      ...this._config,
      power_entities: powerEntities,
    };
    this._fireConfigChanged();
  }

  /**
   * Remove a power entity
   */
  private _removePowerEntity(index: number): void {
    const powerEntities = [...(this._config.power_entities ?? [])];
    powerEntities.splice(index, 1);
    this._config = {
      ...this._config,
      power_entities: powerEntities.length > 0 ? powerEntities : undefined,
    };
    this._fireConfigChanged();
  }

  /**
   * Handle power entity value change
   */
  private _powerEntityChanged(value: string, index: number): void {
    const powerEntities = [...(this._config.power_entities ?? [])];
    powerEntities[index] = value;
    
    this._config = {
      ...this._config,
      power_entities: powerEntities,
    };
    this._fireConfigChanged();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lights-room-card-editor': LightsRoomCardEditor;
  }
}
