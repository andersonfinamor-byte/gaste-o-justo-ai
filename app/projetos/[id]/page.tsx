import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProjetoDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: projetos } = await supabase.from("projetos").select("*");

  const projeto = projetos?.find((item) => String(item.id) === String(id));

  const { data: memorias } = await supabase
    .from("memorias")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const { data: decisoes } = await supabase
    .from("decisoes")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const { data: riscos } = await supabase
    .from("riscos")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const { data: erros } = await supabase
    .from("erros_registrados")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const { data: notas } = await supabase
    .from("notas_mentais")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const { data: auditorias } = await supabase
    .from("auditorias")
    .select("*")
    .eq("projeto_id", id)
    .order("created_at", { ascending: false });

  const timeline = [
    ...(memorias || []).map((item) => ({
      tipo: "MEMÓRIA",
      texto: item.titulo || item.conteudo,
      data: item.created_at,
    })),
    ...(decisoes || []).map((item) => ({
      tipo: "DECISÃO",
      texto: item.decisao || item.titulo || item.descricao,
      data: item.created_at,
    })),
    ...(erros || []).map((item) => ({
      tipo: "ERRO",
      texto: item.erro || item.causa || item.solucao,
      data: item.created_at,
    })),
    ...(auditorias || []).map((item) => ({
      tipo: "AUDITORIA",
      texto: item.resultado || item.analise,
      data: item.created_at,
    })),
  ].sort(
    (a, b) =>
      new Date(b.data || "").getTime() -
      new Date(a.data || "").getTime()
  );

  if (!projeto) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1>Projeto não encontrado</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <Link href="/projetos" className="text-blue-400 underline">
        Voltar para projetos
      </Link>

      <section className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <p className="text-sm uppercase tracking-[4px] text-blue-400 mb-4">
          Detalhes do Projeto
        </p>

        <h1 className="text-4xl font-bold mb-4">{projeto.nome}</h1>

        <p className="text-zinc-400 mb-4">{projeto.descricao}</p>

        <p className="text-zinc-400 mb-3">Stack: {projeto.stack}</p>

        <p className="text-green-400 font-semibold">
          Status: {projeto.status}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Memórias</p>
            <p className="text-2xl font-bold">{memorias?.length || 0}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Decisões</p>
            <p className="text-2xl font-bold">{decisoes?.length || 0}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Riscos</p>
            <p className="text-2xl font-bold">{riscos?.length || 0}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Erros</p>
            <p className="text-2xl font-bold">{erros?.length || 0}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Notas Mentais</p>
            <p className="text-2xl font-bold">{notas?.length || 0}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm">Auditorias</p>
            <p className="text-2xl font-bold">{auditorias?.length || 0}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8 flex-wrap">
          <Link
            href={`/projetos/${id}/nova-memoria`}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
          >
            + Nova Memória
          </Link>

          <Link
            href={`/projetos/${id}/nova-decisao`}
            className="bg-purple-600 hover:bg-purple-500 px-5 py-3 rounded-xl font-medium"
          >
            + Nova Decisão
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6">Memórias do Projeto</h2>

        <div className="grid gap-4">
          {memorias?.map((memoria) => (
            <div
              key={memoria.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold">
                  {memoria.titulo}
                </h3>

                <div className="flex gap-2">
                  <Link
                    href={`/projetos/${id}/editar-memoria/${memoria.id}`}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg text-sm"
                  >
                    Editar
                  </Link>

                  <Link
                    href={`/projetos/${id}/excluir-memoria/${memoria.id}`}
                    className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-sm"
                  >
                    Excluir
                  </Link>
                </div>
              </div>

              <p className="text-zinc-400">{memoria.conteudo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6">Decisões do Projeto</h2>

        <div className="grid gap-5">
          {decisoes?.map((decisao) => (
            <div
              key={decisao.id}
              className="bg-zinc-900 border border-purple-900/40 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                <p className="text-xs uppercase tracking-[4px] text-purple-400">
                  Decisão registrada
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  {decisao.impacto && (
                    <span className="text-xs bg-purple-950 border border-purple-700 text-purple-200 px-3 py-1 rounded-full">
                      Impacto: {decisao.impacto}
                    </span>
                  )}

                  <Link
                    href={`/projetos/${id}/editar-decisao/${decisao.id}`}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg text-sm"
                  >
                    Editar
                  </Link>

                  <Link
                    href={`/projetos/${id}/excluir-decisao/${decisao.id}`}
                    className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-sm"
                  >
                    Excluir
                  </Link>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {decisao.decisao || decisao.titulo}
              </h3>

              {decisao.descricao && (
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-1">
                    Descrição
                  </p>

                  <p className="text-zinc-300">{decisao.descricao}</p>
                </div>
              )}

              {decisao.motivo && (
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-1">
                    Motivo
                  </p>

                  <p className="text-zinc-300">{decisao.motivo}</p>
                </div>
              )}

              {decisao.created_at && (
                <p className="text-sm text-zinc-500 mt-5">
                  Registrada em:{" "}
                  {new Date(decisao.created_at).toLocaleString("pt-BR")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6">Timeline do Projeto</h2>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="space-y-5">
            {timeline.map((item, index) => (
              <div
                key={`${item.tipo}-${index}`}
                className="border-l-2 border-blue-500 pl-5"
              >
                <p className="text-xs uppercase tracking-[4px] text-blue-400 mb-2">
                  {item.tipo}
                </p>

                <p className="text-zinc-200 mb-2">{item.texto}</p>

                {item.data && (
                  <p className="text-sm text-zinc-500">
                    {new Date(item.data).toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}