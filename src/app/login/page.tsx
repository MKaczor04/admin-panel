'use client';
// Minimal supabase stub to avoid "Cannot find module '@/lib/supabaseClient'"
// Replace this with your actual client import when src/lib/supabaseClient.ts exists:
// import { supabase } from '@/lib/supabaseClient';
const supabase: any = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      return {
        data: null,
        error: { message: 'Supabase client not configured. Create src/lib/supabaseClient.ts and export supabase.' },
      };
    },
  },
};
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const sp = useSearchParams();
  const err = sp.get('e');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else router.replace('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-bold">Logowanie</h1>
        {err === 'forbidden' && <p className="mb-2 text-sm text-red-600">Brak uprawnień.</p>}
        <input className="mb-3 w-full rounded border p-2" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} />
        <input className="mb-4 w-full rounded border p-2" placeholder="Hasło" type="password" value={password}
          onChange={(e)=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded bg-slate-900 p-2 font-semibold text-white">
          {loading ? 'Loguję…' : 'Zaloguj'}
        </button>
      </form>
    </div>
  );
}
