import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ErrosPage() {
  const { data: erros } = await supabase
    .from("erros_registrados")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-300 uppercase tracking-[6px] mb-4">
            GASTE O JUSTO AI
          </p>

          <h1 className="text-6xl font-bold mb-4">
            Erros Registrados
          </h1>

          <p className="text-zinc-400">
            Histórico permanente de falhas e soluções.
          </p>
        </div>

        <Link
          href="/erros/novo"
          className="bg-red-600 hover:bg-red-500 px-6 py-4 rounded-2xl font-medium"
        >
          + Novo Erro
        </Link>
      </div>

      <div className="grid gap-6">
        {erros?.map((erro) => (
          <div
            key={erro.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
          >
            <p className="text-red-400 uppercase tracking-[5px] mb-6">
              ERRO REGISTRADO
            </p>

            <h2 className="text-4xl font-bold mb-6">
              {erro.erro}
            </h2>

            {erro.causa && (
              <>
                <p className="text-zinc-500 uppercase tracking-[4px] mb-2">
                  CAUSA
                </p>

                <p className="text-zinc-200 mb-6">
                  {erro.causa}
                </p>
              </>
            )}

            {erro.solucao && (
              <>
                <p className="text-zinc-500 uppercase tracking-[4px] mb-2">
                  SOLUÇÃO
                </p>

                <p className="text-green-400 mb-6">
                  {erro.solucao}
                </p>
              </>
            )}

            {erro.created_at && (
              <p className="text-sm text-zinc-500">
                Registrado em:{" "}
                {new Date(erro.created_at).toLocaleString("pt-BR")}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}