import { Suspense } from 'react';

import BrandsClient from './BrandsClient';

export const dynamic = 'force-dynamic';

export default function BrandsPage() {
  return (
    <Suspense fallback={<div className="p-6">Ładowanie…</div>}>
      <BrandsClient />
    </Suspense>
  );
}
