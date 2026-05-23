import { supabase } from "@/lib/supabase";

export default async function ConfiguracoesPage() {
  const { data: configuracoes, error } = await supabase
    .from("configuracoes")
    .select("*")
    .order("created_at", { ascending: true });

  function formatarChave(chave: string) {
    return chave.replaceAll("_", " ");
  }

  function corDoValor(valor: string) {
    if (valor === "ativado" || valor === "estabilidade") {
      return "text-green-400";
    }

    if (valor === "nao") {
      return "text-red-400";
    }

    if (valor === "somente_autorizado") {
      return "text-yellow-400";
    }

    return "text-blue-400";
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-blue-300 uppercase tracking-[6px] mb-6">
        GASTE O JUSTO AI
      </p>

      <h1 className="text-6xl font-bold mb-8">Configurações</h1>

      <p className="text-zinc-400 mb-12 max-w-3xl">
        Regras permanentes que orientam o comportamento da IA antes de qualquer
        alteração no projeto.
      </p>

      {error && (
        <div className="bg-red-950 border border-red-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-300 mb-4">
            Erro ao carregar configurações
          </h2>

          <pre className="text-red-200 whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <section className="bg-gradient-to-br from-zinc-950 to-black border border-red-900/50 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-red-400 mb-3">
              Núcleo de Proteção
            </p>

            <h2 className="text-3xl font-bold">Proteções Ativas</h2>
          </div>

          <span className="bg-red-950/70 border border-red-700 text-red-200 px-4 py-2 rounded-full text-sm font-semibold">
            Guardião Ativo
          </span>
        </div>

        <p className="text-zinc-400 mb-8 max-w-4xl">
          Estas regras são lidas diretamente do Supabase e servem como limite de
          segurança para impedir alterações perigosas, refatorações desnecessárias
          ou mudanças sem autorização.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(configuracoes || []).map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6"
            >
              <p className="text-xs uppercase tracking-[4px] text-zinc-500 mb-3">
                {formatarChave(item.chave)}
              </p>

              <p className={`${corDoValor(item.valor)} text-xl font-bold`}>
                {item.valor}
              </p>
            </div>
          ))}
        </div>

        {configuracoes?.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">
              Nenhuma configuração cadastrada ainda.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}