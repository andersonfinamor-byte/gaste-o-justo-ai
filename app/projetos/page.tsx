import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function ProjetosPage() {
  const { data: projetos, error } = await supabase
    .from("projetos")
    .select("*");

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-sm uppercase tracking-[4px] text-blue-400">
        Gaste o Justo AI
      </p>

      <h1 className="text-5xl font-bold mb-6">Projetos</h1>

      <p className="text-zinc-400 mb-10">
        Cadastro e gerenciamento de projetos.
      </p>

      {error && (
        <div className="bg-red-950 border border-red-800 rounded-2xl p-6 mb-6">
          <p className="text-red-300 font-semibold">
            Erro ao buscar projetos no Supabase.
          </p>
          <pre className="text-red-200 mt-4 whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="space-y-6">
        {projetos?.map((projeto) => (
          <Link
            key={projeto.id}
            href={`/projetos/${projeto.id}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {projeto.nome}
            </h2>

            <p className="text-zinc-400 mb-3">
              {projeto.descricao}
            </p>

            <p className="text-zinc-400 mb-3">
              Stack: {projeto.stack}
            </p>

            <p className="text-green-400 font-semibold">
              Status: {projeto.status}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}