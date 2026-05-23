export default function DecisoesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <p className="text-sm uppercase tracking-[4px] text-blue-300 mb-4">
        Gaste o Justo AI
      </p>

      <h1 className="text-5xl font-bold mb-6">
        Decisões
      </h1>

      <p className="text-zinc-400 mb-10">
        Histórico permanente de decisões do projeto.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <p className="text-zinc-400 mb-2">
          22/05/2026
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Não alterar autenticação sem autorização.
        </h2>

        <p className="text-zinc-300">
          Motivo: evitar regressões e perda de acesso ao sistema.
        </p>
      </div>
    </main>
  );
}