'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getSession();
      const uid = auth.session?.user?.id;
      if (!uid) {
        router.replace('/login');
        return;
      }

      // sprawdź role w profilu
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', uid)
        .maybeSingle();

      if (error || !data || data.role !== 'admin') {
        router.replace('/login?e=forbidden');
        return;
      }
      setReady(true);
    })();
  }, [router, supabase]);

  if (!ready) return <div className="p-6">Sprawdzam uprawnienia…</div>;
  return <>{children}</>;
}
