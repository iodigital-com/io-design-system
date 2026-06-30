import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const productTileStory: Story<'io-product-tile'> = {
  state: {
    properties: {
      heading: 'Product name',
      price: '€ 49,00',
      priceOriginal: undefined,
      description: 'Short product description',
      likeButton: false,
      liked: false,
      aspect: 'square',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-product-tile' as const,
      properties: properties ?? {},
    },
  ],
};

export const productTileSaleStory: Story<'io-product-tile'> = {
  state: {
    properties: {
      heading: 'Sale product',
      price: '€ 39,00',
      priceOriginal: '€ 79,00',
      description: 'Was €79,00 — now only €39,00',
      likeButton: true,
    },
  },
  generator: () => [
    {
      tag: 'io-product-tile' as const,
      properties: {
        heading: 'Sale product',
        price: '€ 39,00',
        priceOriginal: '€ 79,00',
        description: 'Was €79,00 — now only €39,00',
        likeButton: true,
      },
    },
  ],
};

export const productTileLikedStory: Story<'io-product-tile'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-product-tile' as const,
      properties: {
        heading: 'Saved product',
        price: '€ 99,00',
        likeButton: true,
        liked: true,
      },
    },
  ],
};

export const productTilePropDefinitions: PropDefinition[] = [
  {
    name: 'heading',
    type: 'string',
    defaultValue: 'Product name',
    description: 'Product name displayed as the tile heading.',
  },
  {
    name: 'price',
    type: 'string',
    defaultValue: '€ 49,00',
    description: 'Current or sale price.',
  },
  {
    name: 'priceOriginal',
    type: 'string',
    defaultValue: '',
    description: 'Original price (shown with strikethrough). Leave empty to hide.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Short descriptive text shown below the heading.',
  },
  {
    name: 'aspect',
    type: 'select',
    options: ['square', 'portrait', 'landscape'],
    defaultValue: 'square',
    description: 'Aspect ratio of the product image container.',
  },
  {
    name: 'likeButton',
    type: 'boolean',
    defaultValue: false,
    description: 'Show a wishlist/like toggle button over the product image.',
  },
  {
    name: 'liked',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls the active state of the like button.',
  },
];
