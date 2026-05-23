import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoFileUpload } from './io-file-upload';

function makeFile(name: string, size: number, type = 'application/pdf'): File {
  const file = new File(['x'.repeat(size)], name, { type });
  return file;
}

describe('io-file-upload — event behavior', () => {
  let component: IoFileUpload;
  let fileSelectEmit: ReturnType<typeof vi.fn>;
  let fileRejectEmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoFileUpload();
    (component as any).el = document.createElement('io-file-upload');
    fileSelectEmit = vi.fn();
    fileRejectEmit = vi.fn();
    (component as any).fileSelect = { emit: fileSelectEmit };
    (component as any).fileReject = { emit: fileRejectEmit };
    component.label = 'Upload files';
    component.accept = '*';
    (component as any).componentWillLoad();
  });

  // ── fileSelect ────────────────────────────────────────────────

  it('emits fileSelect for valid files', () => {
    const file = makeFile('report.pdf', 100);
    (component as any).processFiles([file]);

    expect(fileSelectEmit).toHaveBeenCalledOnce();
    expect(fileSelectEmit).toHaveBeenCalledWith({ files: [file] });
  });

  it('adds valid file to selectedFiles', () => {
    const file = makeFile('report.pdf', 100);
    (component as any).processFiles([file]);

    expect((component as any).selectedFiles).toHaveLength(1);
    expect((component as any).selectedFiles[0]).toBe(file);
  });

  it('accumulates multiple files when multiple=true', () => {
    component.multiple = true;
    const file1 = makeFile('a.pdf', 100);
    const file2 = makeFile('b.pdf', 200);
    (component as any).processFiles([file1]);
    (component as any).processFiles([file2]);

    expect((component as any).selectedFiles).toHaveLength(2);
  });

  it('replaces file list when multiple=false', () => {
    component.multiple = false;
    const file1 = makeFile('a.pdf', 100);
    const file2 = makeFile('b.pdf', 200);
    (component as any).processFiles([file1]);
    (component as any).processFiles([file2]);

    expect((component as any).selectedFiles).toHaveLength(1);
    expect((component as any).selectedFiles[0]).toBe(file2);
  });

  it('emits fileSelect with only the first file when multiple=false and multiple files given', () => {
    component.multiple = false;
    const file1 = makeFile('a.pdf', 100);
    const file2 = makeFile('b.pdf', 200);
    (component as any).processFiles([file1, file2]);

    expect(fileSelectEmit).toHaveBeenCalledWith({ files: [file1] });
  });

  // ── fileReject: size ──────────────────────────────────────────

  it('emits fileReject with reason=size for oversized files', () => {
    component.maxFileSize = 500;
    const file = makeFile('big.pdf', 1000);
    (component as any).processFiles([file]);

    expect(fileRejectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).toHaveBeenCalledWith({ file, reason: 'size' });
    expect(fileSelectEmit).not.toHaveBeenCalled();
  });

  it('does not add oversized file to selectedFiles', () => {
    component.maxFileSize = 500;
    const file = makeFile('big.pdf', 1000);
    (component as any).processFiles([file]);

    expect((component as any).selectedFiles).toHaveLength(0);
  });

  it('accepts file exactly at maxFileSize limit', () => {
    component.maxFileSize = 100;
    const file = makeFile('exact.pdf', 100);
    (component as any).processFiles([file]);

    expect(fileSelectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).not.toHaveBeenCalled();
  });

  // ── fileReject: type ──────────────────────────────────────────

  it('emits fileReject with reason=type for wrong MIME type', () => {
    component.accept = 'image/*';
    const file = makeFile('report.pdf', 100, 'application/pdf');
    (component as any).processFiles([file]);

    expect(fileRejectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).toHaveBeenCalledWith({ file, reason: 'type' });
    expect(fileSelectEmit).not.toHaveBeenCalled();
  });

  it('accepts file matching MIME type', () => {
    component.accept = 'application/pdf';
    const file = makeFile('report.pdf', 100, 'application/pdf');
    (component as any).processFiles([file]);

    expect(fileSelectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).not.toHaveBeenCalled();
  });

  it('accepts file matching wildcard MIME type', () => {
    component.accept = 'image/*';
    const file = makeFile('photo.jpg', 100, 'image/jpeg');
    (component as any).processFiles([file]);

    expect(fileSelectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).not.toHaveBeenCalled();
  });

  it('accepts file matching extension', () => {
    component.accept = '.pdf,.docx';
    const file = makeFile('report.pdf', 100, 'application/pdf');
    (component as any).processFiles([file]);

    expect(fileSelectEmit).toHaveBeenCalledOnce();
    expect(fileRejectEmit).not.toHaveBeenCalled();
  });

  it('rejects file with wrong extension', () => {
    component.accept = '.pdf,.docx';
    const file = makeFile('photo.jpg', 100, 'image/jpeg');
    (component as any).processFiles([file]);

    expect(fileRejectEmit).toHaveBeenCalledWith({ file, reason: 'type' });
    expect(fileSelectEmit).not.toHaveBeenCalled();
  });

  // ── Mixed valid/invalid ───────────────────────────────────────

  it('processes mixed valid and invalid files independently', () => {
    component.multiple = true;
    component.accept = 'image/*';
    component.maxFileSize = 500;

    const validFile = makeFile('photo.jpg', 100, 'image/jpeg');
    const tooLarge = makeFile('big.jpg', 1000, 'image/jpeg');
    const wrongType = makeFile('doc.pdf', 100, 'application/pdf');

    (component as any).processFiles([validFile, tooLarge, wrongType]);

    expect(fileSelectEmit).toHaveBeenCalledWith({ files: [validFile] });
    expect(fileRejectEmit).toHaveBeenCalledTimes(2);
  });

  // ── removeFile ────────────────────────────────────────────────

  it('removes a file by index', () => {
    const file1 = makeFile('a.pdf', 100);
    const file2 = makeFile('b.pdf', 200);
    component.multiple = true;
    (component as any).processFiles([file1, file2]);
    (component as any).removeFile(0);

    expect((component as any).selectedFiles).toHaveLength(1);
    expect((component as any).selectedFiles[0]).toBe(file2);
  });

  it('updates liveMessage when file is removed', () => {
    const file = makeFile('report.pdf', 100);
    (component as any).processFiles([file]);
    (component as any).removeFile(0);

    expect((component as any).liveMessage).toBe('report.pdf removed.');
  });

  // ── Drag handlers ─────────────────────────────────────────────

  it('sets isDragOver on dragenter', () => {
    const ev = { preventDefault: vi.fn() } as unknown as DragEvent;
    (component as any).handleDragEnter(ev);

    expect((component as any).isDragOver).toBe(true);
  });

  it('clears isDragOver on drop', () => {
    (component as any).isDragOver = true;

    const ev = { preventDefault: vi.fn(), dataTransfer: { files: null } } as unknown as DragEvent;
    (component as any).handleDrop(ev);

    expect((component as any).isDragOver).toBe(false);
  });

  it('does not process files when disabled', () => {
    component.disabled = true;
    const ev = { preventDefault: vi.fn() } as unknown as DragEvent;
    (component as any).handleDragEnter(ev);

    expect((component as any).isDragOver).toBe(false);
  });

  // ── liveMessage ───────────────────────────────────────────────

  it('sets liveMessage after adding a single file', () => {
    const file = makeFile('report.pdf', 100);
    (component as any).processFiles([file]);

    expect((component as any).liveMessage).toBe('report.pdf added.');
  });

  it('sets liveMessage after adding multiple files', () => {
    component.multiple = true;
    const files = [makeFile('a.pdf', 100), makeFile('b.pdf', 100)];
    (component as any).processFiles(files);

    expect((component as any).liveMessage).toBe('2 files added.');
  });
});
