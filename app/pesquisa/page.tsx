import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PesquisaPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const termo = params?.q?.trim() || "";

  const resultados: any[] = [];

  if (termo) {
    const [memorias, decisoes, erros, auditorias, notas] = await Promise.all([
      supabase.from("memorias").select("*").or(`titulo.ilike.%${termo}%,conteudo.ilike.%${termo}%`),
      supabase.from("decisoes").select("*").or(`decisao.ilike.%${termo}%,descricao.ilike.%${termo}%,motivo.ilike.%${termo}%`),
      supabase.from("erros_registrados").select("*").or(`erro.ilike.%${termo}%,causa.ilike.%${termo}%,solucao.ilike.%${termo}%`),
      supabase.from("auditorias").select("*").or(`analise.ilike.%${termo}%,resultado.ilike.%${termo}%`),
      supabase.from("notas_mentais").select("*").or(`nota.ilike.%${termo}%`),
    ]);

    resultados.push(
      ...((memorias.data || []).map((item) => ({
        tipo: "MEMÓRIA",
        titulo: item.titulo || "Memória registrada",
        texto: item.conteudo,
        data: item.created_at,
        projeto_id: item.projeto_id,
      }))),
      ...((decisoes.data || []).map((item) => ({
        tipo: "DECISÃO",
        titulo: item.decisao || item.titulo || "Decisão registrada",
        texto: item.descricao || item.motivo,
        data: item.created_at,
        projeto_id: item.projeto_id,
      }))),
      ...((erros.data || []).map((item) => ({
        tipo: "ERRO",
        titulo: item.erro,
        texto: item.causa || item.solucao,
        data: item.created_at,
        projeto_id: item.projeto_id,
      }))),
      ...((auditorias.data || []).map((item) => ({
        tipo: "AUDITORIA",
        titulo: item.resultado || "Auditoria registrada",
        texto: item.analise,
        data: item.created_at,
        projeto_id: item.projeto_id,
      }))),
      ...((notas.data || []).map((item) => ({
        tipo: "NOTA MENTAL",
        titulo: item.nota,
        texto: "",
        data: item.created_at,
        projeto_id: item.projeto_id,
      })))
    );

    resultados.sort(
      (a, b) =>
        new Date(b.data || "").getTime() -
        new Date(a.data || "").getTime()
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-sm uppercase tracking-[4px] text-blue-400">
        Gaste o Justo AI
      </p>

      <h1 className="text-5xl font-bold mb-6">Pesquisa Global</h1>

      <p className="text-zinc-400 mb-10 max-w-3xl">
        Pesquise no cérebro do projeto: memórias, decisões, erros, auditorias e notas mentais.
      </p>

      <form className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
        <input
          name="q"
          defaultValue={termo}
          type="text"
          placeholder="Digite algo como payment_method, login, Supabase, autenticação..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white outline-none focus:border-blue-500"
        />

        <button className="mt-5 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold">
          Pesquisar
        </button>
      </form>

      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Resultados</h2>

          {termo && (
            <span className="text-zinc-400">
              {resultados.length} encontrado(s)
            </span>
          )}
        </div>

        {!termo && (
          <p className="text-zinc-500">
            Nenhuma pesquisa realizada.
          </p>
        )}

        {termo && resultados.length === 0 && (
          <p className="text-zinc-500">
            Nenhum resultado encontrado para: {termo}
          </p>
        )}

        <div className="space-y-5">
          {resultados.map((item, index) => (
            <Link
              key={`${item.tipo}-${index}`}
              href={item.projeto_id ? `/projetos/${item.projeto_id}` : "/projetos"}
              className="block bg-zinc-950 border border-zinc-800 hover:border-blue-500 rounded-2xl p-6 transition"
            >
              <p className="text-xs uppercase tracking-[4px] text-blue-400 mb-3">
                {item.tipo}
              </p>

              <h3 className="text-2xl font-bold mb-3">
                {item.titulo}
              </h3>

              {item.texto && (
                <p className="text-zinc-400 mb-4">
                  {item.texto}
                </p>
              )}

              {item.data && (
                <p className="text-sm text-zinc-500">
                  {new Date(item.data).toLocaleString("pt-BR")}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}