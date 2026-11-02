import { useMemo, useState } from "react";
import { Menu, Wallet, ShieldAlert, TrendingUp, Users, Info } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine,
} from "recharts";
import { getReferencePlans, simulatePlan } from "../../services/simulationModel";
import SimulationControls from "../../components/simulation/SimulationControls/SimulationControls";
import PlanComparison from "../../components/simulation/PlanComparison/PlanComparison";
import MonthlyCashTable from "../../components/simulation/MonthlyCashTable/MonthlyCashTable";
import InvestorPitch from "../../components/simulation/InvestorPitch/InvestorPitch";
import Reto3Sidebar from "../../components/simulation/Reto3Sidebar/Reto3Sidebar";
import "./Reto3.css";

const money = (value) => new Intl.NumberFormat("es-CR", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
}).format(value);
const initialCustom = { firstSix: 8000, secondSix: 4000, lastTwelve: 6000 };

const sections = {
  overview: { title: "Resumen", subtitle: "Indicadores y evolución de la caja del plan elegido." },
  controls: { title: "Configurar estrategia", subtitle: "Ajusta los montos de inversión para cada etapa." },
  projection: { title: "Proyección de caja", subtitle: "Consulta el saldo estimado y las reglas del modelo." },
  scenarios: { title: "Planes y comparación", subtitle: "Selecciona una alternativa y compara sus resultados con otros planes." },
  monthly: { title: "Detalle mensual", subtitle: "Consulta los movimientos que componen cada saldo." },
  pitch: { title: "Pitch de inversión", subtitle: "Prepara la presentación de tu estrategia." },
};

function makeCustomPlan(values) {
  const firstYearAverage = (values.firstSix + values.secondSix) / 2;
  const validLastTwelve = Math.max(values.lastTwelve, Math.ceil(firstYearAverage / 500) * 500);
  return simulatePlan({
    name: "Plan personalizado",
    type: "Tu estrategia",
    investments: [
      ...Array(6).fill(values.firstSix),
      ...Array(6).fill(values.secondSix),
      ...Array(12).fill(validLastTwelve),
    ],
    agencyFee: 1000,
  });
}

function CashChart({ plan, compact = false }) {
  const data = plan.rows.map((row) => ({ month: `Mes ${row.month}`, caja: row.closingCash }));
  return (
    <section className={`reto3-chart-card ${compact ? "is-compact" : ""}`}>
      <div className="reto3-card-heading">
        <div><span className="reto3-eyebrow">EVOLUCIÓN DE LIQUIDEZ</span><h2>¿Cómo se comporta la caja?</h2><p>Saldo final de cada mes en USD. La línea roja marca el mínimo permitido.</p></div>
        <span className={plan.safe ? "reto3-safe-badge" : "reto3-risk-badge"}>{plan.safe ? "Plan cumple las reglas" : "Plan fuera de regla"}</span>
      </div>
      <div className="reto3-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 18, left: 8, bottom: 4 }}>
            <CartesianGrid stroke="#eaded4" strokeDasharray="4 4" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#77685d" }} interval={2} />
            <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} tick={{ fontSize: 10, fill: "#77685d" }} width={52} />
            <Tooltip formatter={(v) => money(v)} labelFormatter={(v) => v} contentStyle={{ borderRadius: 10, border: "1px solid #ead8ca", fontSize: 12 }} />
            <ReferenceLine y={5000} stroke="#c94b43" strokeDasharray="6 4" label={{ value: "Piso USD 5.000", fill: "#b9473e", fontSize: 10, position: "insideTopRight" }} />
            <Line type="monotone" dataKey="caja" name="Caja final" stroke="#b85b08" strokeWidth={3} dot={{ r: 3, fill: "#b85b08" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="reto3-chart-caption"><span>Plan visualizado: <b>{plan.name}</b></span><span>Saldo final: <b>{money(plan.endingCash)}</b></span></div>
    </section>
  );
}

function MonthOneReview() {
  const looseContribution = 212 * 0.85 * 15.89;
  const subscriptionContribution = 212 * 0.15 * 12.643;
  const cohortContribution = looseContribution + subscriptionContribution;
  const outflows = 8000 + 1000 + 6500;
  const endingCash = 35000 + 9000 + cohortContribution - outflows;
  return (
    <section className="reto3-month1">
      <div className="reto3-card-heading"><div><span className="reto3-eyebrow">CONTROL MANUAL OBLIGATORIO</span><h2>Revisión del mes 1 · Plan de USD 8.000</h2><p>Desglose para comparar manualmente con la hoja de cálculo.</p></div><span className="reto3-verified"><Info size={15} /> Cálculo visible</span></div>
      <div className="reto3-month1-grid">
        <div><small>Clientes nuevos de Meta</small><b>165</b></div>
        <div><small>Clientes orgánicos</small><b>47</b></div>
        <div><small>Total de clientes nuevos</small><b>212</b></div>
        <div><small>Contribución clientes actuales</small><b>{money(9000)}</b></div>
        <div><small>Contribución cohortes nuevas</small><b>{money(cohortContribution)}</b></div>
        <div><small>Salidas del mes</small><b>{money(outflows)}</b></div>
        <div className="is-highlight"><small>Caja final del mes 1</small><b>{money(endingCash)}</b></div>
      </div>
      <details className="reto3-formula-details"><summary>Ver todas las cuentas del mes 1</summary>
        <div className="reto3-formula-list">
          <p><span>Clientes de Meta</span><b>USD 8.000 → 165 clientes (historial)</b></p>
          <p><span>Clientes nuevos totales</span><b>165 + 47 = 212</b></p>
          <p><span>Contribución de clientes sueltos</span><b>212 × 85 % × USD 15,89 = {money(looseContribution)}</b></p>
          <p><span>Contribución de suscriptores</span><b>212 × 15 % × USD 12,643 = {money(subscriptionContribution)}</b></p>
          <p><span>Contribución total de cohortes</span><b>{money(cohortContribution)}</b></p>
          <p><span>Salidas</span><b>USD 8.000 + USD 1.000 + USD 6.500 = {money(outflows)}</b></p>
          <p><span>Caja final</span><b>USD 35.000 + USD 9.000 + {money(cohortContribution)} − USD 15.500 = {money(endingCash)}</b></p>
        </div>
      </details>
    </section>
  );
}

export default function Reto3({ onHome }) {
  const [customValues, setCustomValues] = useState(initialCustom);
  const [selectedKey, setSelectedKey] = useState("own-4000");
  const [compareKeys, setCompareKeys] = useState(["fixed-8000", "agency-16000"]);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const referencePlans = useMemo(() => getReferencePlans(), []);
  const customPlan = useMemo(() => ({ ...makeCustomPlan(customValues), key: "custom", type: "Tu estrategia" }), [customValues]);
  const plans = useMemo(() => [...referencePlans, customPlan], [referencePlans, customPlan]);
  const selectedPlan = plans.find((plan) => plan.key === selectedKey) ?? customPlan;
  const activePage = sections[activeSection];
  const toggleComparePlan = (key) => {
    setCompareKeys((current) => current.includes(key)
      ? current.filter((item) => item !== key)
      : [...current, key]);
  };
  const updateCustomValues = (updater) => {
    setCustomValues(updater);
    setSelectedKey("custom");
  };
  const reset = () => {
    setCustomValues(initialCustom);
    setSelectedKey("custom");
  };

  return (
    <div className="reto3-app-shell">
      <Reto3Sidebar active={activeSection} onNavigate={setActiveSection} onHome={onHome} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="reto3-main-column">
        <main className="reto3-content">
          <div className="reto3-page-heading">
            <button className="reto3-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menú"><Menu size={17} /> Menú</button>
            <div className="reto3-page-heading-copy">
              <span className="reto3-eyebrow">CASO A · RETO NIVEL 3</span>
              <h1>{activePage.title}</h1>
              <p>{activePage.subtitle}</p>
            </div>
          </div>
          {activeSection === "overview" && <>
            <section className="reto3-overview-banner">
              <div><span className="reto3-eyebrow">OBJETIVO DEL RETO</span><h2>Maximiza la caja sin bajar del piso de seguridad.</h2><p>Prueba distintos niveles de inversión en Meta y encuentra el plan que deja el mejor saldo al mes 24. Cada mes con inversión contempla un fee de agencia de USD 1.000.</p></div>
              <div className="reto3-intro-balance"><span>Caja inicial</span><strong>{money(35000)}</strong><small>Piso de seguridad: {money(5000)}</small></div>
            </section>
            <KpiSummary plan={selectedPlan} />
            <CashChart plan={selectedPlan} compact />
            <div className="reto3-overview-actions"><button onClick={() => setActiveSection("controls")}>Configurar estrategia <span>→</span></button><button onClick={() => setActiveSection("scenarios")}>Comparar escenarios <span>→</span></button></div>
          </>}

          {activeSection === "controls" && <>
            <SimulationControls values={customValues} onChange={updateCustomValues} onReset={reset} />
            <div className="reto3-selection-callout"><strong>Tu estrategia actual</strong><span>La proyección personalizada ya está seleccionada y sus indicadores se actualizarán con cada cambio.</span><button onClick={() => setActiveSection("projection")}>Ver proyección →</button></div>
          </>}

          {activeSection === "projection" && <>
            <KpiSummary plan={selectedPlan} />
            <CashChart plan={selectedPlan} />
            <MonthOneReview />
          </>}

          {activeSection === "scenarios" && <>
            <PlanComparison plans={plans} selectedKey={selectedKey} onSelect={setSelectedKey} compareKeys={compareKeys} onToggleCompare={toggleComparePlan} />
            <div className="reto3-selection-callout"><strong>Plan seleccionado: {selectedPlan.name}</strong><span>Caja final estimada: {money(selectedPlan.endingCash)} · Caja mínima: {money(selectedPlan.minimumCash)}</span><button onClick={() => setActiveSection("projection")}>Ver su proyección →</button></div>
          </>}

          {activeSection === "monthly" && <>
            <MonthlyCashTable rows={selectedPlan.rows} />
          </>}

          {activeSection === "pitch" && <>
            <KpiSummary plan={selectedPlan} />
            <InvestorPitch plan={selectedPlan} />
          </>}
        </main>
        <footer className="reto3-footer">TUESTE · CASO A · SIMULADOR DE CAJA <span>Modelo educativo · Proyección de 24 meses</span></footer>
      </div>
    </div>
  );
}

function KpiSummary({ plan }) {
  return <section className="reto3-kpis">
    <article><span><Wallet size={16}/> Caja al mes 24</span><strong>{money(plan.endingCash)}</strong><small>{plan.name}</small></article>
    <article><span><ShieldAlert size={16}/> Caja mínima</span><strong>{money(plan.minimumCash)}</strong><small>Mes {plan.minimumCashMonth || "Inicial"} · piso {money(5000)}</small></article>
    <article><span><Users size={16}/> Suscriptores activos</span><strong>{Math.round(plan.activeSubscribers).toLocaleString("es-CR")}</strong><small>Al cierre del mes 24</small></article>
    <article><span><TrendingUp size={16}/> Inversión promedio</span><strong>{money(plan.averageFirstYear)}</strong><small>Promedio mensual, meses 1–12</small></article>
  </section>;
}
