import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoFileUpload } from './io-file-upload';

describe('io-file-upload — default props', () => {
  let component: IoFileUpload;

  beforeEach(() => {
    component = new IoFileUpload();
    (component as any).el = document.createElement('io-file-upload');
    (component as any).fileSelect = { emit: vi.fn() };
    (component as any).fileReject = { emit: vi.fn() };
  });

  it('has accept set to wildcard by default', () => {
    expect(component.accept).toBe('*');
  });

  it('does not allow multiple files by default', () => {
    expect(component.multiple).toBe(false);
  });

  it('has no maxFileSize by default', () => {
    expect(component.maxFileSize).toBeUndefined();
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not in error state by default', () => {
    expect(component.error).toBe(false);
  });

  it('has no errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has no helperText by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('has no name by default', () => {
    expect(component.name).toBeUndefined();
  });

  it('starts with empty selectedFiles', () => {
    expect((component as any).selectedFiles).toEqual([]);
  });

  it('starts with isDragOver false', () => {
    expect((component as any).isDragOver).toBe(false);
  });

  it('starts with empty liveMessage', () => {
    expect((component as any).liveMessage).toBe('');
  });
});

describe('io-file-upload — componentWillLoad', () => {
  it('generates unique IDs for each instance', () => {
    const c1 = new IoFileUpload();
    const c2 = new IoFileUpload();
    (c1 as any).fileSelect = { emit: vi.fn() };
    (c1 as any).fileReject = { emit: vi.fn() };
    (c2 as any).fileSelect = { emit: vi.fn() };
    (c2 as any).fileReject = { emit: vi.fn() };
    (c1 as any).componentWillLoad();
    (c2 as any).componentWillLoad();
    expect((c1 as any).fallbackId).not.toBe((c2 as any).fallbackId);
  });

  it('sets errorId derived from fallbackId', () => {
    const c = new IoFileUpload();
    (c as any).fileSelect = { emit: vi.fn() };
    (c as any).fileReject = { emit: vi.fn() };
    (c as any).componentWillLoad();
    expect((c as any).errorId).toContain('io-file-upload-');
    expect((c as any).errorId).toContain('-error');
  });

  it('sets helperId derived from fallbackId', () => {
    const c = new IoFileUpload();
    (c as any).fileSelect = { emit: vi.fn() };
    (c as any).fileReject = { emit: vi.fn() };
    (c as any).componentWillLoad();
    expect((c as any).helperId).toContain('-helper');
  });

  it('sets liveRegionId derived from fallbackId', () => {
    const c = new IoFileUpload();
    (c as any).fileSelect = { emit: vi.fn() };
    (c as any).fileReject = { emit: vi.fn() };
    (c as any).componentWillLoad();
    expect((c as any).liveRegionId).toContain('-live');
  });
});

describe('io-file-upload — render stability', () => {
  let component: IoFileUpload;

  beforeEach(() => {
    component = new IoFileUpload();
    component.label = 'Upload files';
    (component as any).el = document.createElement('io-file-upload');
    (component as any).fileSelect = { emit: vi.fn() };
    (component as any).fileReject = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('renders without throwing for default props', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when error=true and errorMessage set', () => {
    component.error = true;
    component.errorMessage = 'File type not accepted';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when helperText is set', () => {
    component.helperText = 'Accepted formats: PDF';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when disabled=true', () => {
    component.disabled = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with selectedFiles', () => {
    (component as any).selectedFiles = [new File(['x'], 'test.pdf', { type: 'application/pdf' })];
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when isDragOver=true', () => {
    (component as any).isDragOver = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with multiple=true', () => {
    component.multiple = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-file-upload — getZoneClass', () => {
  let component: IoFileUpload;

  beforeEach(() => {
    component = new IoFileUpload();
    component.label = 'Upload files';
    (component as any).fileSelect = { emit: vi.fn() };
    (component as any).fileReject = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('returns base class by default', () => {
    const cls = (component as any).getZoneClass();
    expect(cls).toBe('file-upload__zone');
  });

  it('includes drag-over class when isDragOver=true', () => {
    (component as any).isDragOver = true;
    const cls = (component as any).getZoneClass();
    expect(cls).toContain('file-upload__zone--drag-over');
  });

  it('includes error class when error=true', () => {
    component.error = true;
    const cls = (component as any).getZoneClass();
    expect(cls).toContain('file-upload__zone--error');
  });

  it('includes disabled class when disabled=true', () => {
    component.disabled = true;
    const cls = (component as any).getZoneClass();
    expect(cls).toContain('file-upload__zone--disabled');
  });
});

describe('io-file-upload — getDescribedBy', () => {
  let component: IoFileUpload;

  beforeEach(() => {
    component = new IoFileUpload();
    component.label = 'Upload files';
    (component as any).fileSelect = { emit: vi.fn() };
    (component as any).fileReject = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('returns undefined when no helper or error message', () => {
    expect((component as any).getDescribedBy()).toBeUndefined();
  });

  it('returns helperId when helperText is set and no error', () => {
    component.helperText = 'Hint text';
    const result = (component as any).getDescribedBy();
    expect(result).toContain((component as any).helperId);
  });

  it('returns errorId when error=true and errorMessage set', () => {
    component.error = true;
    component.errorMessage = 'Error message';
    const result = (component as any).getDescribedBy();
    expect(result).toContain((component as any).errorId);
  });

  it('does not include helperId when error=true', () => {
    component.error = true;
    component.helperText = 'Hint text';
    const result = (component as any).getDescribedBy();
    // No errorMessage set — result is undefined (helper is suppressed when error=true)
    expect(result).toBeUndefined();
  });
});
