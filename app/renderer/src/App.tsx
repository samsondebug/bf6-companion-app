import { useEffect, useState } from "react";

export default function App() {
  const [pong, setPong] = useState("");

  useEffect(() => {
    try {
      setPong(window.api?.ping?.() ?? "no preload");
    } catch {
      setPong("no preload");
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">BF6COMPAPP</h1>
          <span className="rounded bg-emerald-600/20 px-2 py-1 text-emerald-300 text-xs">
            Starter Ready
          </span>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-lg font-semibold">Hello, Battlefield</h2>
          <p className="text-slate-300">
            Electron + React + Tailwind + TypeScript. Preload says:{" "}
            <span className="font-mono text-emerald-300">{pong}</span>
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-2 font-semibold">Next steps</h3>
          <ol className="list-decimal space-y-1 pl-6 text-slate-300">
            <li>Run <code className="font-mono">npm run dev</code> for hot reload.</li>
            <li>Run <code className="font-mono">npm run build</code> then <code className="font-mono">npm run package</code> for a Windows installer.</li>
            <li>Edit <code className="font-mono">app/renderer/src/App.tsx</code> and <code className="font-mono">electron/main.ts</code>.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
