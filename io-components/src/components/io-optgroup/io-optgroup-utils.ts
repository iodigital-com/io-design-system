export function getOptgroupClass(disabled: boolean): string {
  return ['optgroup', disabled ? 'optgroup--disabled' : ''].filter(Boolean).join(' ');
}
