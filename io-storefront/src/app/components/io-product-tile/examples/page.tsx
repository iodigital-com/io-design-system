'use client';

import { productTileStory, productTileSaleStory, productTileLikedStory } from '../io-product-tile.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoProductTileExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" description="A product tile with a heading and price. No image is slotted — the image area shows the surface background." />
        <ComponentStory story={productTileStory} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sale price" description="When priceOriginal is provided, the current price is shown in rouge and the original is displayed as a strikethrough with accessible screen-reader labels." />
        <ComponentStory story={productTileSaleStory} />
      </section>

      <section>
        <ExamplesSectionHeader title="Liked state" description="The like button in its active (liked) state. The heart icon fills with the rouge colour." />
        <ComponentStory story={productTileLikedStory} />
      </section>
    </div>
  );
}
