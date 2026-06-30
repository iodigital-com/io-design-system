/**
 * Returns true when the host element is a direct child of an io-checkbox-group
 * or io-radio-group that has `required` set to true.
 *
 * Used by io-checkbox and io-radio to suppress their own required asterisk (` *`)
 * when the parent group already carries the required indicator — preventing
 * duplicate visual markers and double "required" AT announcements.
 *
 * @param host - The host HTMLElement of the checkbox or radio component.
 */
export function isParentGroupRequired(host: HTMLElement): boolean {
  const parent = host.parentElement;
  if (!parent) return false;

  const tag = parent.tagName.toLowerCase();
  if (tag !== 'io-checkbox-group' && tag !== 'io-radio-group') return false;

  // The `required` attribute is reflected so checking the attribute is sufficient
  // for both attribute and prop assignment.
  return parent.hasAttribute('required') || (parent as HTMLElement & { required?: boolean }).required === true;
}
