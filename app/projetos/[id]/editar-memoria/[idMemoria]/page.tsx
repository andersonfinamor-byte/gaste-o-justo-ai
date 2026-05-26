import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function EditarMemoriaPage({
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

  async function atualizarMemoria(formData: FormData) {
    "use server";

    const titulo = String(formData.get("titulo"));
    const conteudo = String(formData.get("conteudo"));

    const { data, error } = await supabase
  .from("memorias")
  .update({
    titulo,
    conteudo,
  })
  .eq("id", idMemoria)
  .select();

console.log("RESULTADO UPDATE MEMORIA:", { data, error });

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

      <section className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[4px] text-blue-400 mb-4">
          Editar Memória
        </p>

        <h1 className="text-4xl font-bold mb-8">Atualizar memória</h1>

        <form action={atualizarMemoria} className="space-y-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Título
            </label>

            <input
              name="titulo"
              defaultValue={memoria.titulo}
              required
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Conteúdo
            </label>

            <textarea
              name="conteudo"
              defaultValue={memoria.conteudo}
              required
              rows={8}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
            >
              Salvar alterações
            </button>

            <Link
              href={`/projetos/${id}`}
              className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-medium"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}