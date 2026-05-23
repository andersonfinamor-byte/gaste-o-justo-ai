"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NovaMemoriaPage() {
  const params = useParams();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!titulo.trim() || !conteudo.trim()) {
      alert("Preencha o título e o conteúdo da memória.");
      return;
    }

    setSalvando(true);

    const { error } = await supabase.from("memorias").insert({
      projeto_id: params.id,
      tipo: "memoria",
      titulo,
      conteudo,
    });

    if (error) {
      alert(error.message);
      setSalvando(false);
      return;
    }

    router.push(`/projetos/${params.id}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-sm uppercase tracking-[4px] text-blue-400 mb-4">
        Gaste o Justo AI
      </p>

      <h1 className="text-5xl font-bold mb-6">Nova Memória</h1>

      <p className="text-zinc-400 mb-10 max-w-3xl">
        Registre uma informação importante que o projeto deve lembrar antes de
        qualquer alteração futura.
      </p>

      <div className="max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-zinc-300">Título</label>

            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Campo payment_method é obrigatório"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-zinc-300">Conteúdo</label>

            <textarea
              rows={8}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Descreva a memória que o sistema deve preservar..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={salvar}
              disabled={salvando}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-6 py-3 rounded-xl font-semibold"
            >
              {salvando ? "Salvando..." : "Salvar Memória"}
            </button>

            <button
              type="button"
              onClick={() => router.push(`/projetos/${params.id}`)}
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}