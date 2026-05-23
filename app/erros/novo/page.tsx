"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NovoErroPage() {
  const router = useRouter();

  const [erro, setErro] = useState("");
  const [causa, setCausa] = useState("");
  const [solucao, setSolucao] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!erro.trim()) {
      alert("Preencha o erro.");
      return;
    }

    setSalvando(true);

    const projetoId =
      "65f399b2-9500-4c5c-8a6b-3c1aa1e16ba5";

    const { error } = await supabase
      .from("erros_registrados")
      .insert({
        projeto_id: projetoId,
        erro,
        causa,
        solucao,
      });

    setSalvando(false);

    if (error) {
      console.error(error);
      alert("Erro ao salvar.");
      return;
    }

    router.push("/erros");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <button
        onClick={() => router.push("/erros")}
        className="mb-6 text-sm text-zinc-400 hover:text-white"
      >
        ← Voltar para erros
      </button>

      <h1 className="text-4xl font-bold mb-2">
        Novo Erro
      </h1>

      <p className="text-zinc-400 mb-8">
        Registrar um erro ocorrido no projeto.
      </p>

      <div className="max-w-3xl space-y-5">
        <div>
          <label className="block mb-2">
            Erro
          </label>

          <input
            value={erro}
            onChange={(e) => setErro(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
            placeholder="Ex: Coluna payment_method ausente"
          />
        </div>

        <div>
          <label className="block mb-2">
            Causa
          </label>

          <textarea
            value={causa}
            onChange={(e) => setCausa(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 min-h-32"
            placeholder="O que causou o problema?"
          />
        </div>

        <div>
          <label className="block mb-2">
            Solução
          </label>

          <textarea
            value={solucao}
            onChange={(e) => setSolucao(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 min-h-32"
            placeholder="Como foi resolvido?"
          />
        </div>

        <button
          onClick={salvar}
          disabled={salvando}
          className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-medium"
        >
          {salvando ? "Salvando..." : "Salvar erro"}
        </button>
      </div>
    </main>
  );
}