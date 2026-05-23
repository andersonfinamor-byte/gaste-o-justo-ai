import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const menu = [
    { nome: "Dashboard", rota: "/" },
    { nome: "Projetos", rota: "/projetos" },
    { nome: "Pesquisa Global", rota: "/pesquisa" },
    { nome: "Configurações", rota: "/configuracoes" },
  ];

  async function contarTabela(tabela: string) {
    const { count } = await supabase
      .from(tabela)
      .select("*", { count: "exact", head: true });

    return count ?? 0;
  }

  async function buscarUltimo(tabela: string) {
    const { data } = await supabase
      .from(tabela)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return data;
  }

  const [
    totalProjetos,
    totalMemorias,
    totalDecisoes,
    totalRiscos,
    totalErros,
    totalNotasMentais,
    totalAuditorias,
    ultimoProjeto,
    ultimaMemoria,
    ultimaDecisao,
    ultimoErro,
    configuracoes,
  ] = await Promise.all([
    contarTabela("projetos"),
    contarTabela("memorias"),
    contarTabela("decisoes"),
    contarTabela("riscos"),
    contarTabela("erros_registrados"),
    contarTabela("notas_mentais"),
    contarTabela("auditorias"),
    buscarUltimo("projetos"),
    buscarUltimo("memorias"),
    buscarUltimo("decisoes"),
    buscarUltimo("erros_registrados"),
    supabase.from("configuracoes").select("*").order("created_at", {
      ascending: true,
    }),
  ]);

  const cards = [
    ["Projetos", totalProjetos],
    ["Memórias", totalMemorias],
    ["Decisões", totalDecisoes],
    ["Riscos", totalRiscos],
    ["Erros", totalErros],
    ["Notas Mentais", totalNotasMentais],
    ["Auditorias", totalAuditorias],
  ];

  const regras = configuracoes.data || [];

  function texto(item: any, campos: string[]) {
    if (!item) return "Nenhum registro encontrado.";

    for (const campo of campos) {
      if (item[campo]) return item[campo];
    }

    return "Registro encontrado, mas sem texto principal.";
  }

  function formatarChave(chave: string) {
    return chave.replaceAll("_", " ");
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      <aside className="w-72 border-r border-zinc-800 p-6">
        <h1 className="text-2xl font-bold mb-10">Gaste o Justo AI</h1>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.nome}
              href={item.rota}
              className="rounded-xl px-4 py-3 bg-zinc-900 hover:bg-zinc-800 transition"
            >
              {item.nome}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="flex-1 p-10">
        <h2 className="text-4xl font-bold mb-2">Dashboard Principal</h2>

        <p className="text-zinc-400 mb-10">
          A IA que respeita seu projeto antes de mudar.
        </p>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {cards.map(([label, value]) => (
            <div
              key={label}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
            >
              <h3 className="text-zinc-400 text-sm">{label}</h3>
              <p className="text-4xl font-bold mt-3">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <p className="text-sm uppercase tracking-[4px] text-blue-300 mb-4">
              Projeto Ativo
            </p>

            <h3 className="text-3xl font-bold mb-6">
              {texto(ultimoProjeto, ["nome", "titulo"])}
            </h3>

            <p className="text-zinc-300 mb-3">
              <span className="text-zinc-500">Descrição:</span>{" "}
              {texto(ultimoProjeto, ["descricao"])}
            </p>

            <p className="text-zinc-300 mb-3">
              <span className="text-zinc-500">Stack:</span>{" "}
              {texto(ultimoProjeto, ["stack"])}
            </p>

            <p className="text-zinc-300">
              <span className="text-zinc-500">Status:</span>{" "}
              <span className="text-green-400 font-semibold">
                {texto(ultimoProjeto, ["status"])}
              </span>
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <p className="text-sm uppercase tracking-[4px] text-blue-300 mb-4">
              Últimos Registros
            </p>

            <div className="space-y-5 text-zinc-300">
              <div>
                <p className="text-zinc-500 text-sm">Última memória</p>
                <p>{texto(ultimaMemoria, ["memoria", "conteudo", "descricao"])}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">Última decisão</p>
                <p>{texto(ultimaDecisao, ["decisao", "conteudo", "descricao"])}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">Último erro</p>
                <p>{texto(ultimoErro, ["erro", "descricao", "causa"])}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-zinc-950 to-black border border-red-900/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[4px] text-red-400 mb-3">
                Guardião do Projeto
              </p>

              <h3 className="text-3xl font-bold">
                Regras críticas carregadas
              </h3>
            </div>

            <span className="bg-red-950/70 border border-red-700 text-red-200 px-4 py-2 rounded-full text-sm font-semibold">
              Modo Conservador Ativo
            </span>
          </div>

          <p className="text-zinc-400 mb-8 max-w-3xl">
            Antes de qualquer alteração, o Gaste o Justo AI consulta as regras
            permanentes do projeto para evitar mudanças perigosas, refatorações
            desnecessárias e perda de estabilidade.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {regras.map((regra) => (
              <div
                key={regra.id}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5"
              >
                <p className="text-xs uppercase tracking-[3px] text-zinc-500 mb-2">
                  {formatarChave(regra.chave)}
                </p>

                <p
                  className={
                    regra.valor === "nao" ||
                    regra.valor === "somente_autorizado"
                      ? "text-red-300 font-semibold"
                      : regra.valor === "estabilidade" ||
                          regra.valor === "ativado"
                        ? "text-green-400 font-semibold"
                        : "text-zinc-200 font-semibold"
                  }
                >
                  {regra.valor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}