/**
 * @iodigital-com/tokens — token metadata
 *
 * Re-exports the full token catalogue from docs/tokens-meta.json
 * as a typed runtime object. Use for storefront docs auto-generation,
 * design tooling integration, and token introspection.
 *
 * @example
 * import { tokensMeta } from '@iodigital-com/tokens/meta';
 * const publicTokens = tokensMeta.tokens.filter(t => t.classification === 'public-api');
 */

export interface TokenMeta {
  cssVar: string;
  classification: 'public-api' | 'internal' | 'deprecated';
  component: string;
  description: string;
  defaultValue: string | null;
  deprecatedSince?: string;
  replacedBy?: string;
}

export interface TokensMetaCatalogue {
  $schemaVersion: number;
  $generated: string;
  $source: string;
  tokens: TokenMeta[];
}

/**
 * The full io Design System token catalogue.
 *
 * Generated from docs/public-css-api.json + io-components/src/global/app.css.
 * Run `npx tsx scripts/generate-tokens-meta.ts` to regenerate after token changes.
 */
// The catalogue is lazily imported to keep the main bundle lean.
// Consumers that need the full catalogue can import directly:
//   import tokensMetaJson from '@iodigital-com/tokens/meta';
export type { TokensMetaCatalogue as TokensMeta };
