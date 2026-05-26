/**
 * io-avatar does not have a `disabled` prop.
 * It is a purely presentational component and has no interactive or
 * form-associated state. Disabled semantics are handled by consumers
 * at the wrapping element level (e.g. a disabled button containing an avatar).
 */
import { beforeEach, describe, it, expect } from 'vitest';

import { IoAvatar } from './io-avatar';

describe('io-avatar — disabled state', () => {
  let component: IoAvatar;

  beforeEach(() => {
    component = new IoAvatar();
  });

  it('does not have a disabled prop', () => {
    // io-avatar is a display-only component — there is no disabled prop
    expect((component as unknown as Record<string, unknown>)['disabled']).toBeUndefined();
  });

  it('renders consistently regardless of surrounding disabled context', () => {
    // Verify the component renders in all size/color/shape combinations
    // that a consumer might use inside a disabled container.
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const colors = ['blue', 'orange', 'green', 'purple', 'grey'] as const;
    const shapes = ['circle', 'square'] as const;

    for (const size of sizes) {
      for (const color of colors) {
        for (const shape of shapes) {
          component.size = size;
          component.color = color;
          component.shape = shape;
          expect(() => component.render()).not.toThrow();
        }
      }
    }
  });
});
