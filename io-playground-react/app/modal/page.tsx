'use client';

import { useState, useRef } from 'react';
import { IoButton, IoModal, IoInput } from '@iodigital-com/components-react';

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');
  const [name, setName] = useState('');
  // Ref tracks whether handleSave() initiated the close — prevents
  // the dismiss side-effect from overwriting the saved result (stale closure issue).
  const savedRef = useRef(false);

  const handleCancel = () => {
    setOpen(false);
    setResult('cancel-clicked');
  };

  const handleDismiss = () => {
    if (!savedRef.current) handleCancel();
    savedRef.current = false;
  };

  const handleSave = () => {
    if (!name.trim()) {
      setResult('validation-error: name is required');
      return;
    }
    savedRef.current = true;
    setOpen(false);
    setResult(`saved: ${name}`);
  };

  return (
    <main suppressHydrationWarning>
      <h1>io-modal — Footer Button Click Test</h1>

      <IoButton onClick={() => { setOpen(true); setResult(''); setName(''); }}>
        Open modal
      </IoButton>

      <div className="result" data-testid="result">{result || 'No action yet'}</div>

      <IoModal
        open={open}
        heading="Create item"
        onDismiss={handleDismiss}
      >
        <IoInput
          label="Name"
          name="name"
          value={name}
          onInput={(e: CustomEvent) =>
            setName((e.target as HTMLInputElement).value)
          }
        />

        <IoButton
          slot="footer"
          variant="ghost"
          onClick={handleCancel}
        >
          Cancel
        </IoButton>
        <IoButton
          slot="footer"
          onClick={handleSave}
        >
          Save
        </IoButton>
      </IoModal>
    </main>
  );
}
