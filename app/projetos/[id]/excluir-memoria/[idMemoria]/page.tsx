import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function ExcluirMemoriaPage({
  params,
}: {
  params: Promise<{ id: string; idMemoria: string }>;
}) {
  const { id, idMemoria } = await params;

  const { data: memoria } = await supabase
    .from("memorias")
    .select("*")
    .eq("id", idMemoria)
    .single();

  async function excluirMemoria() {
    "use server";

    await supabase
      .from("memorias")
      .delete()
      .eq("id", idMemoria);

    redirect(`/projetos/${id}`);
  }

  if (!memoria) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1>Memória não encontrada</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <Link href={`/projetos/${id}`} className="text-blue-400 underline">
        Voltar para o projeto
      </Link>

      <section className="mt-8 bg-zinc-900 border border-red-900/50 rounded-2xl p-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[4px] text-red-400 mb-4">
          Excluir Memória
        </p>

        <h1 className="text-4xl font-bold mb-6">
          Tem certeza?
        </h1>

        <div className="bg-black border border-zinc-800 rounded-xl p-5 mb-6">
          <p className="text-sm text-zinc-500 mb-2">Título</p>
          <h2 className="text-2xl font-semibold mb-4">
            {memoria.titulo}
          </h2>

          <p className="text-sm text-zinc-500 mb-2">Conteúdo</p>
          <p className="text-zinc-300">
            {memoria.conteudo}
          </p>
        </div>

        <p className="text-red-300 mb-8">
          Esta ação vai excluir esta memória definitivamente.
        </p>

        <form action={excluirMemoria} className="flex gap-4 flex-wrap">
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
        </form>
      </section>
    </main>
  );
}