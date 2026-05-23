"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NovoRiscoPage() {
  const router = useRouter();

  const projetoId = "65f399b2-9500-4c5c-8a6b-3c1aa1e16ba5";

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivel, setNivel] = useState("Baixo");
  const [area, setArea] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!titulo.trim() || !descricao.trim()) {
      alert("Preencha o título e a descrição do risco.");
      return;
    }

    setSalvando(true);

    const { error } = await supabase.from("riscos").insert({
  projeto_id: projetoId,
  risco: titulo,
  descricao,
  nivel,
  area,
  status: "ativo",
});

    setSalvando(false);

    if (error) {
      console.error(error);
      alert("Erro ao salvar risco.");
      return;
    }

    router.push("/riscos");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <button
        onClick={() => router.push("/riscos")}
        className="mb-6 text-sm text-zinc-400 hover:text-white"
      >
        ← Voltar para riscos
      </button>

      <h1 className="text-3xl font-bold mb-2">Novo Risco</h1>

      <p className="text-zinc-400 mb-8">
        Registre um risco que pode prejudicar a estabilidade do projeto.
      </p>

      <div className="max-w-2xl space-y-5">
        <div>
          <label className="block mb-2 text-sm text-zinc-300">Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white"
            placeholder="Ex: Lovable alterar arquivos fora do escopo"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-zinc-300">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white min-h-32"
            placeholder="Explique o risco e por que ele merece atenção."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-zinc-300">Nível</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white"
          >
            <option>Baixo</option>
            <option>Médio</option>
            <option>Alto</option>
            <option>Crítico</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-zinc-300">Área</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white"
            placeholder="Ex: Autenticação, Supabase, Deploy, Visual"
          />
        </div>

        <button
          onClick={salvar}
          disabled={salvando}
          className="bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Salvar risco"}
        </button>
      </div>
    </main>
  );
}