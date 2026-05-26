import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function ExcluirDecisaoPage({
  params,
}: {
  params: Promise<{ id: string; idDecisao: string }>;
}) {
  const { id, idDecisao } = await params;

  const { data: decisao } = await supabase
    .from("decisoes")
    .select("*")
    .eq("id", idDecisao)
    .single();

  async function excluirDecisao() {
    "use server";

    await supabase
      .from("decisoes")
      .delete()
      .eq("id", idDecisao);

    redirect(`/projetos/${id}`);
  }

  if (!decisao) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1>Decisão não encontrada</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <Link href={`/projetos/${id}`} className="text-blue-400 underline">
        Voltar para o projeto
      </Link>

      <section className="mt-8 bg-zinc-900 border border-red-800 rounded-2xl p-8 max-w-4xl">
        <p className="text-sm uppercase tracking-[4px] text-red-400 mb-4">
          Excluir Decisão
        </p>

        <h1 className="text-4xl font-bold mb-8">
          Tem certeza?
        </h1>

        <div className="bg-black border border-zinc-800 rounded-xl p-6 mb-8">
          <p className="text-zinc-400 text-sm mb-2">
            Decisão
          </p>

          <h2 className="text-2xl font-bold mb-4">
            {decisao.decisao}
          </h2>

          <p className="text-zinc-400 text-sm mb-2">
            Descrição
          </p>

          <p>{decisao.descricao}</p>
        </div>

        <p className="text-red-400 mb-8">
          Esta ação excluirá esta decisão definitivamente.
        </p>

        <form action={excluirDecisao}>
          <div className="flex gap-4 flex-wrap">
            <Link
              href={`/projetos/${id}`}
              className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-medium"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl font-medium"
            >
              Excluir definitivamente
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}