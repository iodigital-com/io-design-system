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

  it('renders with heading slot', async () => {
    const { root } = await render(
      <io-carousel>
        <h2 slot="heading">Featured Articles</h2>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with description slot', async () => {
    const { root } = await render(
      <io-carousel>
        <p slot="description">Browse our latest content.</p>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with controls slot', async () => {
    const { root } = await render(
      <io-carousel>
        <div slot="controls">
          <span>● ○ ○</span>
        </div>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with heading and description slots together', async () => {
    const { root } = await render(
      <io-carousel>
        <h2 slot="heading">Our Team</h2>
        <p slot="description">Meet the people behind the product.</p>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </io-carousel>
    );
    expect(root).toMatchSnapshot();
  });
});