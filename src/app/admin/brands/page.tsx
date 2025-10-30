'use client';
import AdminGuard from '@/components/AdminGuard';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState, FormEvent } from 'react';

type Brand = { id: number; name: string };

export default function BrandsPage() {
  const [rows, setRows] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState<Brand | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('brands').select('id, name').order('name');
    if (error) alert(error.message);
    setRows((data ?? []) as Brand[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editing) {
      const { error } = await supabase.from('brands').update({ name: name.trim() }).eq('id', editing.id);
      if (error) return alert(error.message);
    } else {
      const { error } = await supabase.from('brands').insert({ name: name.trim() });
      if (error) return alert(error.message);
    }
    setName('');
    setEditing(null);
    await load();
  };

  const onEdit = (b: Brand) => { setEditing(b); setName(b.name); };
  const onDelete = async (b: Brand) => {
    if (!confirm(`Usunąć markę „${b.name}”?`)) return;
    const { error } = await supabase.from('brands').delete().eq('id', b.id);
    if (error) return alert(error.message);
    await load();
  };

  return (
    <AdminGuard>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-xl font-bold">Marki</h1>

        <form onSubmit={onSubmit} className="mb-6 flex gap-2">
          <input
            className="flex-1 rounded border p-2"
            placeholder={editing ? "Edytuj nazwę marki" : "Nazwa nowej marki"}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <button className="rounded bg-slate-900 px-4 py-2 font-semibold text-white">
            {editing ? 'Zapisz' : 'Dodaj'}
          </button>
          {editing && (
            <button type="button" className="rounded bg-slate-200 px-3 py-2"
              onClick={()=>{ setEditing(null); setName(''); }}>
              Anuluj
            </button>
          )}
        </form>

        {loading ? (
          <p>Ładowanie…</p>
        ) : rows.length === 0 ? (
          <p>Brak marek.</p>
        ) : (
          <ul className="divide-y rounded-xl bg-white shadow">
            {rows.map(b => (
              <li key={b.id} className="flex items-center justify-between p-3">
                <span>{b.name}</span>
                <div className="flex gap-2">
                  <button className="rounded bg-slate-100 px-3 py-1" onClick={()=>onEdit(b)}>Edytuj</button>
                  <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={()=>onDelete(b)}>Usuń</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminGuard>
  );
}
