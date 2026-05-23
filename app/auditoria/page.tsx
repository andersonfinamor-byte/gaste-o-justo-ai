"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuditoriaPage() {
  const [auditorias, setAuditorias] = useState<any[]>([]);

  useEffect(() => {
    carregarAuditorias();
  }, []);

  async function carregarAuditorias() {
    const { data } = await supabase
      .from("auditorias")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setAuditorias(data);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-blue-300 uppercase tracking-[6px] mb-6">
        GASTE O JUSTO AI
      </p>

      <h1 className="text-6xl font-bold mb-8">
        Auditorias
      </h1>

      <p className="text-zinc-400 mb-12">
        Histórico de análises realizadas pelo projeto.
      </p>

      <div className="space-y-6">
        {auditorias.map((auditoria) => (
          <div
            key={auditoria.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
          >
            <p className="text-blue-300 uppercase tracking-[4px] mb-4">
              AUDITORIA REGISTRADA
            </p>

            <h2 className="text-3xl font-bold mb-6">
              {auditoria.analise}
            </h2>

            <div>
              <p className="text-zinc-500 uppercase tracking-[4px] mb-3">
                Resultado
              </p>

              <p className="text-green-400">
                {auditoria.resultado}
              </p>
            </div>

            <p className="text-zinc-500 mt-8 text-sm">
              Registrado em:
              {" "}
              {new Date(auditoria.created_at).toLocaleString("pt-BR")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}