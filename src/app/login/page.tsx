import { Suspense } from 'react';

import LoginInner from './LoginInner';

export const revalidate = 0;

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6">Ładowanie…</div>}>
      <LoginInner />
    </Suspense>
  );
}
