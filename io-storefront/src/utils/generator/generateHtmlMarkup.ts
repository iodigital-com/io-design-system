import type { ElementConfig, HTMLTagOrComponent } from './generator';

/**
 * Serialises an `ElementConfig[]` tree to a formatted HTML string suitable
 * for display in the storefront code block.
 *
 * Rules:
 *  - Boolean attributes are written as bare attributes (e.g. `disabled`)
 *  - `className` is output as `class`
 *  - `htmlFor` is output as `for`
 *  - `undefined` / `null` / `false` values are omitted
 *  - Object/array values are JSON-serialised
 *  - Children are recursively indented
 */
export function generateHtmlMarkup(
  nodes: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
): string {
  return nodes
    .filter((n): n is string | ElementConfig<HTMLTagOrComponent> => n !== undefined)
    .map((n) => serializeNode(n, 0))
    .join('\n');
}

function serializeNode(
  node: string | ElementConfig<HTMLTagOrComponent>,
  depth: number,
): string {
  if (typeof node === 'string') {
    return indent(depth) + node;
  }

  const { tag, properties = {}, children = [] } = node;
  const attrs = buildAttributes(properties);
  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

  const filteredChildren = children.filter(
    (c): c is string | ElementConfig<HTMLTagOrComponent> => c !== undefined,
  );

  const tagStr = String(tag);

  // Void elements
  if (isVoidElement(tagStr)) {
    return `${indent(depth)}<${tagStr}${attrStr}>`;
  }

  if (filteredChildren.length === 0) {
    return `${indent(depth)}<${tagStr}${attrStr}></${tagStr}>`;
  }

  // Single text child on one line
  if (
    filteredChildren.length === 1 &&
    typeof filteredChildren[0] === 'string' &&
    !filteredChildren[0].includes('\n')
  ) {
    return `${indent(depth)}<${tagStr}${attrStr}>${filteredChildren[0]}</${tagStr}>`;
  }

  const inner = filteredChildren.map((c) => serializeNode(c, depth + 1)).join('\n');
  return `${indent(depth)}<${tagStr}${attrStr}>\n${inner}\n${indent(depth)}</${tagStr}>`;
}

function buildAttributes(props: Record<string, unknown>): string[] {
  const result: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;

    // Map JSX → HTML attribute names
    const attrName = jsxAttrToHtml(key);
    if (!attrName) continue; // skip internal/event props

    if (value === true) {
      result.push(attrName);
    } else if (typeof value === 'object') {
      result.push(`${attrName}='${JSON.stringify(value)}'`);
    } else {
      result.push(`${attrName}="${String(value)}"`);
    }
  }

  return result;
}

function jsxAttrToHtml(key: string): string | null {
  // Skip event handlers
  if (key.startsWith('on') && key[2] === key[2]?.toUpperCase()) return null;
  // Skip React internal props
  if (key === 'key' || key === 'ref') return null;
  if (key === 'className') return 'class';
  if (key === 'htmlFor') return 'for';
  return camelToKebab(key);
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

function indent(depth: number): string {
  return '  '.repeat(depth);
}

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function isVoidElement(tag: string): boolean {
  return VOID_ELEMENTS.has(tag);
}
