'use client';

import { useRef } from 'react';
import { IoButton, IoToast } from '@iodigital-com/components-react';

export default function ToastPage() {
  const toastRef = useRef<HTMLElement>(null);

  const show = () => {
    (toastRef.current as any)?.show?.({ message: 'Hello from React!', variant: 'success' });
  };

  return (
    <main>
      <h1>io-toast — Show/Dismiss Test</h1>
      <IoButton onClick={show}>Show toast</IoButton>
      <IoToast ref={toastRef} data-testid="toast" />
    </main>
  );
}
