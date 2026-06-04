'use client';

import { useState } from 'react';
import { IoInput, IoSelect, IoCheckbox, IoRadio, IoButton } from '@iodigital-com/components-react';

export default function FormPage() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(Object.fromEntries(data.entries()) as Record<string, string>);
  };

  return (
    <main suppressHydrationWarning>
      <h1>Forms — FACE Participation Test</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <IoInput label="Full name" name="name" required />
        <IoInput label="Email" name="email" type="email" required />
        <IoSelect label="Role" name="role">
          <option value="">Select role</option>
          <option value="dev">Developer</option>
          <option value="design">Designer</option>
          <option value="pm">Product Manager</option>
        </IoSelect>
        <IoCheckbox label="I agree to terms" name="terms" value="on" required />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <IoRadio label="Option A" name="choice" value="a" />
          <IoRadio label="Option B" name="choice" value="b" />
        </div>
        <IoButton type="submit">Submit</IoButton>
      </form>
      {submitted && (
        <div className="result" data-testid="result">
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
