import { RotateCcw } from "lucide-react";
import "./Topbar.css";

export default function Topbar({ onReset }) {
  return (
    <header className="bg-tueste-orange text-white shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-5 lg:px-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-white/80">
          <span className="font-display text-2xl font-bold">T</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold tracking-[.2em] text-orange-100">CASO A · RETO NIVEL 2</p>
          <h1 className="text-xl font-semibold sm:text-2xl">Tueste <span className="text-orange-200">|</span> Tablero financiero</h1>
        </div>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-tueste-deep transition hover:-translate-y-0.5">
          <RotateCcw size={16} /> Restaurar datos del caso
        </button>
      </div>
    </header>
  );
}
