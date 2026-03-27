/**
 * PropDefinition — describes a single prop that ConfiguratorControls can render.
 * Authored by hand alongside each component's stories file.
 *
 * `group` — optional section label. Props with the same group are rendered under
 *   a shared section header. Ungrouped props render in a default group at the top.
 */
export type PropDefinition =
  | { name: string; type: 'boolean'; defaultValue?: boolean; group?: string }
  | { name: string; type: 'number'; defaultValue?: number; group?: string }
  | { name: string; type: 'string'; defaultValue?: string; group?: string }
  | { name: string; type: 'select'; options: string[]; defaultValue?: string; group?: string };
