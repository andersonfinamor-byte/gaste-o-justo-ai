"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NovaMemoriaPage() {
  const params = useParams();
  const router = useRouter();

  const [tipo, setTipo] = useState("memoria");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    setSalvando(true);

    const { error } = await supabase
      .from("memorias")
      .insert({
        projeto_id: params.id,
        tipo,
        titulo,
        conteudo,
      });

    if (error) {
      alert(error.message);
      setSalvando(false);
      return;
    }

    alert("Salvo com sucesso");

    router.push(`/projetos/${params.id}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Nova Memória
      </h1>

      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block mb-2">Tipo</label>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
          >
            <option value="memoria">Memória</option>
            <option value="decisao">Decisão</option>
            <option value="erro">Erro</option>
            <option value="risco">Risco</option>
            <option value="nota">Nota</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Título</label>

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2">Conteúdo</label>

          <textarea
            rows={8}
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
          />
        </div>

        <button
          onClick={salvar}
          disabled={salvando}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </main>
  );
}