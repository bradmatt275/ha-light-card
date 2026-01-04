import { css } from 'lit';

/**
 * CSS Custom Properties for theming
 */
export const cssVariables = css`
  :host {
    /* ============================================
       SPACING SCALE (4px base unit)
       ============================================ */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    /* ============================================
       BORDER RADIUS
       ============================================ */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;

    /* ============================================
       COLORS - Inherited from HA Theme
       ============================================ */
    --card-background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --text-primary: var(--primary-text-color, #fff);
    --text-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --border-color: var(--divider-color, rgba(255, 255, 255, 0.12));
    --accent-color: var(--primary-color, #03a9f4);

    /* ============================================
       LIGHT STATE COLORS
       ============================================ */
    --light-on-color: #fbbf24;
    --light-off-color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
    --light-unavailable-color: var(--disabled-text-color, #666);

    /* ============================================
       COMPONENT COLORS
       ============================================ */
    --row-background: rgba(255, 255, 255, 0.03);
    --row-background-hover: rgba(255, 255, 255, 0.06);
    --expanded-panel-background: rgba(0, 0, 0, 0.2);
    --slider-track-color: var(--divider-color, rgba(255, 255, 255, 0.12));
    --slider-active-color: var(--light-on-color);
    --scene-chip-background: rgba(255, 255, 255, 0.05);
    --scene-chip-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --scene-chip-active-border: var(--accent-color, #03a9f4);

    /* ============================================
       ANIMATION TIMING
       ============================================ */
    --transition-fast: 150ms ease;
    --transition-normal: 200ms ease;
    --transition-slow: 300ms ease-out;
    --transition-color: 500ms ease;
  }
`;

/**
 * Card container styles
 */
export const cardStyles = css`
  ${cssVariables}

  ha-card {
    padding: var(--spacing-lg);
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--card-background);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  .card-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0;
  }

  .total-power {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 14px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .total-power ha-icon {
    --mdc-icon-size: 16px;
    color: var(--light-on-color);
  }

  .rooms-container {
    display: flex;
    flex-direction: column;
  }

  /* Multi-column layout */
  .rooms-container.columns-2,
  .rooms-container.columns-3,
  .rooms-container.columns-4 {
    display: grid;
    gap: var(--spacing-lg);
  }

  .rooms-container.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .rooms-container.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .rooms-container.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Column containers */
  .column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Responsive: wrap to fewer columns on smaller screens */
  @media (max-width: 1200px) {
    .rooms-container.columns-4 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .rooms-container.columns-3,
    .rooms-container.columns-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .rooms-container.columns-2,
    .rooms-container.columns-3,
    .rooms-container.columns-4 {
      grid-template-columns: 1fr;
    }
  }

  .no-rooms-message {
    text-align: center;
    color: var(--text-secondary);
    padding: var(--spacing-xl);
    font-size: 14px;
  }
`;

/**
 * Room section styles
 */
export const roomStyles = css`
  ${cssVariables}

  .room-section {
    margin-bottom: var(--spacing-md);
  }

  .room-section:last-child {
    margin-bottom: 0;
  }

  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
    cursor: pointer;
    user-select: none;
  }

  .room-header:hover {
    opacity: 0.8;
  }

  .room-header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .room-header-name {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
  }

  .room-header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .room-header-power {
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .collapse-icon {
    --mdc-icon-size: 20px;
    color: var(--text-secondary);
    transition: transform var(--transition-fast);
  }

  .collapse-icon.collapsed {
    transform: rotate(-90deg);
  }

  .room-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    overflow: hidden;
    transition: max-height var(--transition-slow), opacity var(--transition-normal);
    max-height: 2000px;
    opacity: 1;
  }

  .room-content.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .room-divider {
    height: 1px;
    background: var(--border-color);
    margin: var(--spacing-md) 0;
    opacity: 0.5;
  }
`;

/**
 * Light row styles
 */
export const lightRowStyles = css`
  ${cssVariables}

  .light-row {
    display: flex;
    flex-direction: column;
    background: var(--row-background);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: background var(--transition-fast);
  }

  .light-row:hover {
    background: var(--row-background-hover);
  }

  .light-row.has-scene-color {
    border-left: 3px solid var(--scene-color, var(--light-on-color));
  }

  .light-row-main {
    display: flex;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    gap: var(--spacing-md);
  }

  .light-icon {
    --mdc-icon-size: 24px;
    color: var(--light-off-color);
    transition: color var(--transition-color);
    flex-shrink: 0;
  }

  .light-icon.on {
    color: var(--light-on-color);
  }

  .light-icon.colored {
    color: var(--scene-color, var(--light-on-color));
  }

  .light-icon.unavailable {
    color: var(--light-unavailable-color);
  }

  .light-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-primary);
  }

  .light-status {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .light-status.unavailable {
    color: var(--light-unavailable-color);
  }

  .expand-button {
    --mdc-icon-size: 20px;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expand-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .expand-button.expanded {
    background: rgba(255, 255, 255, 0.05);
  }

  @keyframes light-on {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .light-icon.turning-on {
    animation: light-on 300ms ease;
  }
`;

/**
 * Expanded panel styles (brightness slider + scenes)
 */
export const expandedPanelStyles = css`
  ${cssVariables}

  .expanded-panel {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
    background: var(--expanded-panel-background);
    border-top: 1px solid var(--border-color);
  }

  .brightness-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .brightness-slider {
    flex: 1;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--slider-track-color);
    border-radius: var(--radius-full);
    outline: none;
    cursor: pointer;
  }

  .brightness-slider::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: var(--radius-full);
    background: linear-gradient(
      to right,
      var(--slider-active-color) 0%,
      var(--slider-active-color) var(--slider-progress, 0%),
      var(--slider-track-color) var(--slider-progress, 0%),
      var(--slider-track-color) 100%
    );
  }

  .brightness-slider::-moz-range-track {
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--slider-track-color);
  }

  .brightness-slider::-moz-range-progress {
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--slider-active-color);
  }

  .brightness-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--slider-active-color);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-top: -6px;
  }

  .brightness-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--slider-active-color);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: none;
  }

  .brightness-label {
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
    min-width: 36px;
    text-align: right;
  }

  .scene-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .no-scenes-message {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
  }
`;

/**
 * Scene chip styles - simplified without color swatches
 */
export const sceneChipStyles = css`
  ${cssVariables}

  .scene-chip {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--scene-chip-background);
    border: 1px solid var(--scene-chip-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color var(--transition-fast), background var(--transition-fast);
    user-select: none;
  }

  .scene-chip:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .scene-chip.active {
    border-color: var(--scene-chip-active-border);
    background: rgba(var(--accent-color-rgb, 3, 169, 244), 0.15);
  }

  .scene-chip-name {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-primary);
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scene-chip-checkmark {
    --mdc-icon-size: 14px;
    color: var(--accent-color);
    flex-shrink: 0;
  }
`;

/**
 * Editor styles
 */
export const editorStyles = css`
  ${cssVariables}

  .card-config {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  ha-textfield {
    display: block;
    width: 100%;
  }

  ha-formfield {
    display: block;
    margin: var(--spacing-sm) 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
  }

  .room-editor {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
    overflow: hidden;
  }

  .room-editor-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--row-background);
    cursor: pointer;
  }

  .room-editor-header:hover {
    background: var(--row-background-hover);
  }

  .room-name {
    flex: 1;
    font-weight: 500;
    color: var(--text-primary);
  }

  .room-editor-content {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .lights-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-sm);
  }

  .light-editor {
    padding: var(--spacing-md);
    background: var(--row-background);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-group label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-group ha-selector {
    display: block;
    width: 100%;
  }

  .type-selection {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .type-selection label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-right: var(--spacing-sm);
  }

  .remove-button {
    align-self: flex-end;
    --mdc-theme-primary: var(--error-color, #f44336);
  }

  mwc-button {
    --mdc-theme-primary: var(--accent-color);
  }

  mwc-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }

  /* Column assignment styles for room editor */
  .column-assignment {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .column-assignment label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .column-buttons {
    display: flex;
    gap: var(--spacing-xs);
  }

  .column-button {
    min-width: 48px;
    --mdc-theme-primary: var(--text-secondary);
  }

  .column-button.active {
    --mdc-theme-primary: var(--accent-color);
    background: rgba(var(--accent-color-rgb, 3, 169, 244), 0.1);
  }

  ha-select {
    width: 100%;
  }

  /* Power entities styles */
  .power-entities-info {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
    margin-bottom: var(--spacing-sm);
  }

  .power-entity-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    width: 100%;
  }

  .power-entity-row ha-entity-picker {
    flex: 1;
    min-width: 0;
    display: block;
  }

  .no-lights-message,
  .no-rooms-message {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
    padding: var(--spacing-md);
    text-align: center;
  }
`;

/**
 * Reduced motion support
 */
export const reducedMotionStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
