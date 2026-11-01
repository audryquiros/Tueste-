import Topbar from "../../components/layout/Topbar";
import SectionHeading from "../../components/ui/SectionHeading";
import ControlsPanel from "../../components/dashboard/ControlsPanel";
import KpiGrid from "../../components/dashboard/KpiGrid";
import ScenarioTable from "../../components/dashboard/ScenarioTable";
import ChartsSection from "../../components/dashboard/ChartsSection";
import ThresholdPanel from "../../components/dashboard/ThresholdPanel";
import { useFinancialDashboard } from "../../hooks/useFinancialDashboard";
import "./Dashboard.css";

export default function Dashboard() {
  const { inputs, result, scenarios, updateInput, resetInputs } = useFinancialDashboard();
  return (
    <div className="min-h-screen bg-tueste-paper text-tueste-ink">
      <Topbar onReset={resetInputs} />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[.2em] text-tueste-orange">MODELO INTERACTIVO</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">¿Conviene aumentar la inversión?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tueste-muted">Modifica los supuestos y observa cómo cambian los indicadores, los escenarios y los gráficos.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800"><span className="h-2 w-2 rounded-full bg-green-600" /> Cálculos en vivo</span>
        </section>

        <div className="space-y-10">
          <ControlsPanel inputs={inputs} onChange={updateInput} />

          <section>
            <SectionHeading eyebrow="02 · INDICADORES" title="Los números que importan" note="Cada indicador incluye su nombre y unidad." />
            <KpiGrid result={result} />
          </section>

          <section>
            <SectionHeading eyebrow="03 · ESCENARIOS" title="Comparación financiera" />
            <ScenarioTable scenarios={scenarios} selected={result} />
            <p className="mt-3 text-xs leading-relaxed text-tueste-muted">La propuesta de agencia usa el historial del caso para $16.000 y aplica 30% de descuento al primer pedido suelto. La alternativa propia modela $4.000 sin fee de agencia.</p>
          </section>

          <section>
            <SectionHeading eyebrow="04 · GRÁFICOS" title="Cómo se comporta el modelo" />
            <ChartsSection result={result} scenarios={scenarios} inputs={inputs} />
          </section>

          <section>
            <SectionHeading eyebrow="05 · UMBRALES" title="¿Estamos en una zona saludable?" />
            <ThresholdPanel result={result} />
          </section>

          <section className="rounded-2xl border border-tueste-line border-l-4 border-l-tueste-orange bg-white p-6 shadow-soft">
            <p className="mb-2 text-[10px] font-bold tracking-[.2em] text-tueste-orange">LECTURA DEL CASO</p>
            <h2 className="font-display text-2xl font-bold">La atribución no es lo mismo que adquisición incremental.</h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-tueste-muted">Ads Manager reportó 706 compras y ROAS 3,0. Para calcular el CAC de nuevos clientes de Meta se deben utilizar los 165 clientes nuevos identificados mediante encuesta y UTM, no las compras atribuidas. Shopify reportó $28.000 en ventas totales y Meta se atribuyó $24.000.</p>
            <p className="mt-3 text-xs text-tueste-muted">Modelo educativo con datos editables; no está conectado en vivo con Meta ni Shopify.</p>
          </section>
        </div>
        <footer className="py-9 text-center text-[11px] text-tueste-muted">Tueste · Tablero financiero · Reto Nivel 2</footer>
      </main>
    </div>
  );
}
