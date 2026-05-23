import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function RiscosPage() {
  const { data: riscos } = await supabase
    .from("riscos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-blue-300 uppercase tracking-[6px] mb-6">
        GASTE O JUSTO AI
      </p>

      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-6xl font-bold mb-4">Riscos</h1>

          <p className="text-zinc-400">
            Avaliação de risco antes de qualquer alteração no projeto.
          </p>
        </div>

        <Link
          href="/riscos/novo"
          className="bg-yellow-600 hover:bg-yellow-500 px-5 py-3 rounded-xl font-medium"
        >
          + Novo Risco
        </Link>
      </div>

      <div className="grid gap-5">
        {riscos?.map((risco) => (
          <div
            key={risco.id}
            className="bg-zinc-900 border border-yellow-900/40 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <p className="text-xs uppercase tracking-[4px] text-yellow-400">
                Risco registrado
              </p>

              {risco.nivel && (
                <span className="text-xs bg-yellow-950 border border-yellow-700 text-yellow-200 px-3 py-1 rounded-full">
                  Nível: {risco.nivel}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {risco.risco}
            </h2>

            {risco.descricao && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-1">
                  Descrição
                </p>

                <p className="text-zinc-300">{risco.descricao}</p>
              </div>
            )}

            {risco.area && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-1">
                  Área
                </p>

                <p className="text-zinc-300">{risco.area}</p>
              </div>
            )}

            {risco.status && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-1">
                  Status
                </p>

                <p className="text-zinc-300">{risco.status}</p>
              </div>
            )}

            {risco.created_at && (
              <p className="text-sm text-zinc-500 mt-5">
                Registrado em:{" "}
                {new Date(risco.created_at).toLocaleString("pt-BR")}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}