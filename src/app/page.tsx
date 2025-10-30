'use client';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  return (
    <AdminGuard>
      <div className="mx-auto max-w-4xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel admina</h1>
          <button
            className="rounded bg-slate-200 px-3 py-1 text-sm"
            onClick={async ()=>{ await supabase.auth.signOut(); location.href='/login'; }}
          >
            Wyloguj
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/admin/brands" className="rounded-xl bg-white p-5 shadow hover:shadow-md">
            <h2 className="font-semibold">Marki</h2><p className="text-sm text-slate-500">Dodaj/edytuj</p>
          </Link>
          <Link href="/admin/products" className="rounded-xl bg-white p-5 shadow hover:shadow-md">
            <h2 className="font-semibold">Produkty</h2><p className="text-sm text-slate-500">CRUD + miniatury</p>
          </Link>
          <Link href="/admin/ingredients" className="rounded-xl bg-white p-5 shadow hover:shadow-md">
            <h2 className="font-semibold">Składniki</h2><p className="text-sm text-slate-500">INCI</p>
          </Link>
        </div>
      </div>
    </AdminGuard>
  );
}
