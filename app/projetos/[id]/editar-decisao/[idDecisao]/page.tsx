import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function EditarDecisaoPage({
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

  async function atualizarDecisao(formData: FormData) {
    "use server";

    const decisaoTexto = String(formData.get("decisao"));
    const descricao = String(formData.get("descricao"));
    const motivo = String(formData.get("motivo"));

    await supabase
      .from("decisoes")
      .update({
        decisao: decisaoTexto,
        descricao,
        motivo,
      })
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

      <section className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-4xl">
        <p className="text-sm uppercase tracking-[4px] text-purple-400 mb-4">
          Editar Decisão
        </p>

        <h1 className="text-4xl font-bold mb-8">
          Atualizar decisão
        </h1>

        <form action={atualizarDecisao} className="space-y-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Decisão
            </label>

            <input
              name="decisao"
              defaultValue={decisao.decisao}
              required
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Descrição
            </label>

            <textarea
              name="descricao"
              defaultValue={decisao.descricao}
              rows={5}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Motivo
            </label>

            <textarea
              name="motivo"
              defaultValue={decisao.motivo}
              rows={5}
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