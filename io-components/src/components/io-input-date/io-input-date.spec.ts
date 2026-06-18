import { describe, it, expect } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputDate } from './io-input-date';

describe('io-input-date', () => {
  it('renders with required label', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    expect(page.root).toBeDefined();
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Birth date');
  });

  it('renders a date input', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('date');
  });

  it('applies disabled attribute', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" disabled></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('passes min and max to native input', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" min="2000-01-01" max="2026-12-31"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.min).toBe('2000-01-01');
    expect(input?.max).toBe('2026-12-31');
  });

  it('applies error state class', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" state="error" message="Invalid date"></io-input-date>',
    });
    const wrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
    expect(wrapper?.classList.contains('input-wrapper--state-error')).toBe(true);
  });

  it('renders calendar icon', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const icon = page.root?.shadowRoot?.querySelector('.date-suffix');
    expect(icon).toBeDefined();
  });

  it('label is permanently floated', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label?.classList.contains('input-label--date-float')).toBe(true);
  });

  it('renders required asterisk when required', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" required></io-input-date>',
    });
    const asterisk = page.root?.shadowRoot?.querySelector('.input-required');
    expect(asterisk).toBeDefined();
  });

  it('renders size class', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" size="lg"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.classList.contains('input-field--lg')).toBe(true);
  });

  it('renders helper text when provided', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" helper-text="Format: YYYY-MM-DD"></io-input-date>',
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper');
    expect(helper?.textContent).toContain('Format: YYYY-MM-DD');
  });
});
