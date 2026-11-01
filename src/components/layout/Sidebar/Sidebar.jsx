import {
  LayoutDashboard,
  SlidersHorizontal,
  Gauge,
  GitCompareArrows,
  ChartNoAxesCombined,
  Lightbulb,
  X,
  Menu,
} from "lucide-react";
import "./Sidebar.css";

const navigation = [
  { id: "overview", label: "Resumen", description: "Vista general", icon: LayoutDashboard },
  { id: "controls", label: "Supuestos", description: "Edita las variables", icon: SlidersHorizontal },
  { id: "indicators", label: "Indicadores", description: "Métricas financieras", icon: Gauge },
  { id: "scenarios", label: "Escenarios", description: "Compara alternativas", icon: GitCompareArrows },
  { id: "charts", label: "Gráficos", description: "Visualiza resultados", icon: ChartNoAxesCombined },
  { id: "recommendation", label: "Análisis", description: "Lectura del caso", icon: Lightbulb },
];

export default function Sidebar({ active, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-tueste-line bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-tueste-line px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-tueste-orange text-white">
              <span className="font-display text-xl font-bold">T</span>
            </div>
            <div>
              <p className="font-bold tracking-wide text-tueste-ink">TUESTE</p>
              <p className="text-[10px] tracking-[.15em] text-tueste-muted">TABLERO FINANCIERO</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-tueste-muted hover:bg-tueste-cream lg:hidden" aria-label="Cerrar navegación">
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[.18em] text-tueste-muted">MENÚ PRINCIPAL</p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    selected
                      ? "bg-tueste-cream text-tueste-deep shadow-sm"
                      : "text-tueste-muted hover:bg-stone-50 hover:text-tueste-ink"
                  }`}
                  aria-current={selected ? "page" : undefined}
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-lg ${selected ? "bg-white text-tueste-orange" : "bg-stone-100 text-stone-500 group-hover:bg-white"}`}>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-0.5 block text-[10px] text-tueste-muted">{item.description}</span>
                  </span>
                  {selected && <span className="h-2 w-2 rounded-full bg-tueste-orange" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-xl bg-tueste-cream p-4">
            <p className="text-xs font-bold text-tueste-deep">Reto · Nivel 2</p>
            <p className="mt-1 text-[11px] leading-relaxed text-tueste-muted">Explora los indicadores, modifica los supuestos y compara los escenarios de Tueste.</p>
          </div>
          <p className="mt-4 text-center text-[10px] text-tueste-muted">Modelo financiero interactivo</p>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-tueste-line bg-white px-3 py-2 text-sm font-semibold text-tueste-ink shadow-sm lg:hidden"
    >
      <Menu size={17} /> Menú
    </button>
  );
}
