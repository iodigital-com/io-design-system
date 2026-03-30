/**
 * PropDefinition — describes a single prop that ConfiguratorControls can render.
 * Authored by hand alongside each component's stories file.
 *
 * `group` — optional section label. Props with the same group are rendered under
 *   a shared section header. Ungrouped props render in a default group at the top.
 */
type BasePropDefinition = {
  name: string;
  group?: string;
  description?: string;
};

export type PropDefinition =
  | (BasePropDefinition & { type: 'boolean'; defaultValue?: boolean })
  | (BasePropDefinition & { type: 'number'; defaultValue?: number })
  | (BasePropDefinition & { type: 'string'; defaultValue?: string })
  | (BasePropDefinition & { type: 'select'; options: string[]; defaultValue?: string });
