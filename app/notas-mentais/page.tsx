"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotasMentaisPage() {
  const [notas, setNotas] = useState<any[]>([]);

  useEffect(() => {
    carregarNotas();
  }, []);

  async function carregarNotas() {
    const { data } = await supabase
      .from("notas_mentais")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setNotas(data);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-blue-300 uppercase tracking-[6px] mb-4">
            GASTE O JUSTO AI
          </p>

          <h1 className="text-6xl font-bold mb-4">
            Notas Mentais
          </h1>

          <p className="text-zinc-400">
            Observações importantes aprendidas pelo projeto.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {notas.map((nota) => (
          <div
            key={nota.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
          >
            <p className="text-blue-300 uppercase tracking-[4px] mb-4">
              NOTA MENTAL
            </p>

            <p className="text-xl text-zinc-200">
              {nota.nota}
            </p>

            <p className="text-zinc-500 mt-6 text-sm">
              Registrado em:
              {" "}
              {new Date(nota.created_at).toLocaleString("pt-BR")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}