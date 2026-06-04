'use client';

import { useState } from 'react';
import { IoSelect } from '@iodigital-com/components-react';

export default function SelectPage() {
  const [value, setValue] = useState('');

  return (
    <main>
      <h1>io-select — Value Change Test</h1>
      <IoSelect
        label="Fruit"
        name="fruit"
        value={value}
        onChange={(e: CustomEvent<{ value: string }>) => setValue(e.detail?.value ?? (e.target as HTMLSelectElement).value)}
      >
        <option value="">Choose fruit</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </IoSelect>
      <div className="result" data-testid="result">Selected: {value || 'none'}</div>
    </main>
  );
}
