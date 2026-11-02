import { useMemo } from "react";
import { SlidersHorizontal, AlertTriangle } from "lucide-react";
import "./SimulationControls.css";

export default function SimulationControls({ values, onChange, onReset }) {
  const average = useMemo(() => (values.firstSix * 6 + values.secondSix * 6) / 12, [values]);
  const requiredThird = Math.ceil(average / 500) * 500;
  const update = (key, value) => onChange((current) => {
    const next = { ...current, [key]: Number(value) };
    const nextAverage = (next.firstSix + next.secondSix) / 2;
    next.lastTwelve = Math.max(next.lastTwelve, Math.ceil(nextAverage / 500) * 500);
    return next;
  });

  return (
    <section className="sim-controls">
      <div className="sim-section-heading">
        <div><span className="sim-eyebrow">DISEÑA TU ESTRATEGIA</span><h2>Plan personalizado</h2></div>
        <button className="sim-ghost-button" onClick={onReset}>Restaurar plan</button>
      </div>
      <p className="sim-muted">Define cuánto invertir en Meta en cada etapa. Desde el mes 13, la inversión no puede ser menor al promedio de los primeros 12 meses.</p>
      <div className="sim-control-grid">
        <label><span>Meses 1–6 <b>USD {values.firstSix.toLocaleString("en-US")}</b></span><input type="range" min="0" max="20000" step="500" value={values.firstSix} onChange={(e) => update("firstSix", e.target.value)} /><small>Inversión mensual inicial</small></label>
        <label><span>Meses 7–12 <b>USD {values.secondSix.toLocaleString("en-US")}</b></span><input type="range" min="0" max="20000" step="500" value={values.secondSix} onChange={(e) => update("secondSix", e.target.value)} /><small>Inversión mensual de ajuste</small></label>
        <label><span>Meses 13–24 <b>USD {values.lastTwelve.toLocaleString("en-US")}</b></span><input type="range" min={requiredThird} max="20000" step="500" value={Math.max(values.lastTwelve, requiredThird)} onChange={(e) => update("lastTwelve", e.target.value)} /><small>Mínimo permitido: USD {requiredThird.toLocaleString("en-US")}</small></label>
      </div>
      <div className="sim-rule-note"><AlertTriangle size={17}/><span>Promedio de inversión de los primeros 12 meses: <strong>USD {average.toLocaleString("en-US",{maximumFractionDigits:0})}</strong>. Desde el mes 13 debes invertir al menos esa cantidad.</span></div>
    </section>
  );
}
