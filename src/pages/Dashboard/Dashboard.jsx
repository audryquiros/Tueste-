import { useState } from "react";
import { RotateCcw, Coffee, ArrowUpRight } from "lucide-react";
import Sidebar, { MobileMenuButton } from "../../components/layout/Sidebar/Sidebar";
import SectionHeading from "../../components/ui/SectionHeading/SectionHeading";
import ControlsPanel from "../../components/dashboard/ControlsPanel/ControlsPanel";
import KpiGrid from "../../components/dashboard/KpiGrid/KpiGrid";
import ScenarioTable from "../../components/dashboard/ScenarioTable/ScenarioTable";
import ChartsSection from "../../components/dashboard/ChartsSection/ChartsSection";
import ThresholdPanel from "../../components/dashboard/ThresholdPanel/ThresholdPanel";
import { useFinancialDashboard } from "../../hooks/useFinancialDashboard";
import { money, ratio, number } from "../../utils/formatters";
import "./Dashboard.css";

const pageTitles = {
  overview: ["Resumen", "Una vista rápida de la salud financiera de Tueste."],
  controls: ["Supuestos del modelo", "Ajusta las variables para simular distintos escenarios."],
  indicators: ["Indicadores financieros", "Las métricas clave para evaluar adquisición y rentabilidad."],
  scenarios: ["Comparación de escenarios", "Compara la situación actual con las alternativas propuestas."],
  charts: ["Gráficos y comportamiento", "Explora la evolución de caja, adquisición y retorno."],
  recommendation: ["Análisis del caso", "Hallazgos importantes para tomar una decisión."],
};

function PageIntro({ eyebrow, title, note }) {
  return <SectionHeading eyebrow={eyebrow} title={title} note={note} />;
}

export default function Dashboard() {
  const { inputs, result, scenarios, updateInput, resetInputs } = useFinancialDashboard();
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedScenario = {
    key: "selected",
    label: "Seleccionado",
    result,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-tueste-paper text-tueste-ink">
      <Sidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 pb-5 pt-5 sm:px-6 lg:px-8 lg:pb-6 lg:pt-6">
            <MobileMenuButton onClick={() => setMobileOpen(true)} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-tueste-orange">
                <Coffee size={13} /> CASO A · RETO NIVEL 2
              </div>
              <h1 className="mt-1 truncate text-xl font-bold text-tueste-ink sm:text-2xl">{pageTitles[active][0]}</h1>
              <p className="hidden text-xs text-tueste-muted sm:block">{pageTitles[active][1]}</p>
            </div>
            <button onClick={resetInputs} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-tueste-line bg-white px-3 py-2 text-xs font-bold text-tueste-deep transition hover:bg-tueste-cream sm:px-4 sm:py-2.5 sm:text-sm">
              <RotateCcw size={14} /> <span className="hidden sm:inline">Restaurar datos</span><span className="sm:hidden">Restaurar</span>
            </button>
          </div>

          <div className="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
          {active === "overview" && (
            <div className="space-y-6">
              <section className="rounded-2xl bg-gradient-to-br from-tueste-orange to-tueste-deep p-6 text-white shadow-soft sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div className="max-w-2xl">
                    <p className="mb-2 text-[10px] font-bold tracking-[.2em] text-orange-100">PANEL DE CONTROL</p>
                    <h2 className="font-display text-3xl font-bold sm:text-4xl">¿Conviene aumentar la inversión?</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-orange-50">Consulta los indicadores principales de Tueste y navega por las secciones para entender qué está impulsando los resultados.</p>
                  </div>
                  <button onClick={() => setActive("controls")} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-tueste-deep transition hover:-translate-y-0.5">
                    Explorar supuestos <ArrowUpRight size={16} />
                  </button>
                </div>
              </section>

              <section>
                <PageIntro eyebrow="01 · RESUMEN EJECUTIVO" title="Indicadores principales" note="Los valores se actualizan al cambiar los supuestos." />
                <KpiGrid result={result} />
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <button onClick={() => setActive("scenarios")} className="rounded-2xl border border-tueste-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-1">
                  <p className="text-xs text-tueste-muted">LTV:CAC actual</p>
                  <strong className="mt-2 block text-3xl text-tueste-deep">{ratio(result.ltvCac)}</strong>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-tueste-orange">Comparar escenarios <ArrowUpRight size={14}/></span>
                </button>
                <button onClick={() => setActive("indicators")} className="rounded-2xl border border-tueste-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-1">
                  <p className="text-xs text-tueste-muted">CAC real</p>
                  <strong className="mt-2 block text-3xl text-tueste-deep">{money(result.cacReal)}</strong>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-tueste-orange">Ver indicadores <ArrowUpRight size={14}/></span>
                </button>
                <button onClick={() => setActive("charts")} className="rounded-2xl border border-tueste-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-1">
                  <p className="text-xs text-tueste-muted">Clientes nuevos estimados</p>
                  <strong className="mt-2 block text-3xl text-tueste-deep">{number(result.newCustomers, 0)}</strong>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-tueste-orange">Ver gráficos <ArrowUpRight size={14}/></span>
                </button>
              </section>
            </div>
          )}

          {active === "controls" && (
            <div className="space-y-6">
              <ControlsPanel inputs={inputs} onChange={updateInput} />
            </div>
          )}

          {active === "indicators" && (
            <div className="space-y-7">
              <KpiGrid result={result} />
              <ThresholdPanel result={result} />
            </div>
          )}

          {active === "scenarios" && (
            <div className="space-y-6">
              <ScenarioTable scenarios={scenarios} selected={selectedScenario} />
              <div className="rounded-xl border-l-4 border-tueste-yellow bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
                <strong>Nota:</strong> la propuesta de agencia utiliza la inversión de $16.000 y un descuento del 30%; la alternativa propia utiliza $4.000 sin fee de agencia. Verifica estos supuestos contra el caso antes de entregar.
              </div>
            </div>
          )}

          {active === "charts" && (
            <div className="space-y-6">
              <ChartsSection result={result} scenarios={scenarios} inputs={inputs} />
            </div>
          )}

          {active === "recommendation" && (
            <div className="space-y-6">
              <ThresholdPanel result={result} />
              <section className="rounded-2xl border border-tueste-line border-l-4 border-l-tueste-orange bg-white p-6 shadow-soft sm:p-8">
                <p className="mb-2 text-[10px] font-bold tracking-[.2em] text-tueste-orange">LECTURA DEL CASO</p>
                <h2 className="font-display text-2xl font-bold">La atribución no es lo mismo que adquisición incremental.</h2>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-tueste-muted">Ads Manager reportó 706 compras y ROAS 3,0. Para calcular el CAC de nuevos clientes de Meta se deben utilizar los 165 clientes nuevos identificados mediante encuesta y UTM, no las compras atribuidas. Shopify reportó $28.000 en ventas totales y Meta se atribuyó $24.000.</p>
                <p className="mt-3 text-xs text-tueste-muted">Modelo educativo con datos editables; no está conectado en vivo con Meta ni Shopify.</p>
              </section>
              <section className="rounded-2xl border border-tueste-line bg-white p-6 shadow-soft">
                <h3 className="font-semibold">Lectura de los resultados actuales</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-tueste-muted">
                  <li>El CAC real estimado es de {money(result.cacReal)} por cliente nuevo.</li>
                  <li>El LTV estimado es de {money(result.ltv)} por cliente.</li>
                  <li>La relación LTV:CAC es de {ratio(result.ltvCac)}.</li>
                  <li>El ROAS real del primer pedido estimado es {result.realFirstOrderROAS == null ? "no disponible" : ratio(result.realFirstOrderROAS)}.</li>
                  <li>El payback se alcanza en {result.payback ? `${result.payback} meses` : "más de 12 meses"} según la curva modelada.</li>
                </ul>
              </section>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
