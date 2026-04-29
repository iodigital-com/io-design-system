import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-carousel — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(
      <io-carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders configured navigation state', async () => {
    const { root } = await render(
      <io-carousel rewind slidesPerPage="auto" activeSlideIndex={1}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });
});