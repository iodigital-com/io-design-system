'use client';

import { useState } from 'react';
import { IoButton } from '@iodigital-com/components-react';

export default function ButtonPage() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>io-button — Click Event Test</h1>
      <IoButton onClick={() => setCount(c => c + 1)}>Click me</IoButton>
      <IoButton variant="ghost" onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}>Reset</IoButton>
      <div className="result" data-testid="result">Click count: {count}</div>
    </main>
  );
}
