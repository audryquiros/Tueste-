import { Check, Circle, AlertTriangle, GitCompareArrows } from "lucide-react";
import { SIMULATION_DEFAULTS } from "../../../services/simulationModel";
import "./PlanComparison.css";

const usd = (v) => new Intl.NumberFormat("es-CR", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
}).format(v);

function investmentLabel(values) {
  if (!values?.length) return "No disponible";
  const groups = [];
  values.forEach((value, index) => {
    const last = groups[groups.length - 1];
    if (last && last.value === value) last.end = index + 1;
    else groups.push({ value, start: index + 1, end: index + 1 });
  });
  return groups.map((g) => g.start === g.end
    ? `M${g.start}: ${usd(g.value)}`
    : `M${g.start}–${g.end}: ${usd(g.value)}`).join(" · ");
}

export default function PlanComparison({ plans, selectedKey, onSelect, compareKeys = [], onToggleCompare }) {
  const selected = plans.find((plan) => plan.key === selectedKey) ?? plans[0];
  const comparedPlans = plans.filter((plan) => compareKeys.includes(plan.key));
  // Regla oficial del nivel 3: gana la mayor caja al mes 24 sin romper
  // ninguna regla. Si hay empate en caja final, gana quien tenga más suscriptores.
  const eligiblePlans = comparedPlans.filter((plan) => plan.safe);
  const rankedPlans = [...eligiblePlans].sort((a, b) =>
    b.endingCash - a.endingCash ||
    b.activeSubscribers - a.activeSubscribers
  );
  const recommendedPlan = rankedPlans[0] ?? null;
  const tiedRecommendations = recommendedPlan
    ? rankedPlans.filter((p) =>
        Math.abs(p.endingCash - recommendedPlan.endingCash) < 0.01 &&
        Math.abs(p.activeSubscribers - recommendedPlan.activeSubscribers) < 0.01
      )
    : [];
  const hasRecommendationTie = tiedRecommendations.length > 1;
  const noEligiblePlan = comparedPlans.length >= 2 && eligiblePlans.length === 0;

  return (
    <section className="sim-plan-comparison">
      <section className="sim-active-summary" aria-label="Resumen del plan activo">
        <div className="sim-active-summary-title"><span>PLAN ACTIVO</span><b>{selected.name}</b><small>Esta es la alternativa que alimenta la proyección, el detalle mensual y el pitch.</small></div>
        <div><small>Caja al mes 24</small><strong>{usd(selected.endingCash)}</strong></div>
        <div><small>Caja mínima</small><strong>{usd(selected.minimumCash)}</strong><em>Mes {selected.minimumCashMonth || "inicial"}</em></div>
        <div><small>Suscriptores M24</small><strong>{Math.round(selected.activeSubscribers)}</strong></div>
        <div><small>Reglas</small><strong className={selected.safe ? "sim-text-safe" : "sim-text-risk"}>{selected.safe ? "Cumple" : "No cumple"}</strong></div>
      </section>

      <section className="sim-alternatives-panel">
        <div className="sim-panel-heading">
          <div><span className="sim-step-label">1 · ELEGIR PLAN</span><h2>Alternativas disponibles</h2><p>Selecciona una alternativa para usarla en el simulador. Puedes elegir varias para compararlas.</p></div>
          <span className="sim-selection-count">{comparedPlans.length} seleccionadas para comparar</span>
        </div>
        <div className="sim-comparison-table-wrap">
          <table className="sim-comparison-table">
            <thead><tr><th>Plan</th><th>Inversión Meta</th><th>Caja final · M24</th><th>Caja mínima</th><th>Suscriptores</th><th>Reglas</th><th>Comparar</th></tr></thead>
            <tbody>{plans.map((plan) => {
              const active = plan.key === selectedKey;
              const checked = compareKeys.includes(plan.key);
              return <tr key={plan.key} className={active ? "is-active" : ""}>
                <td><button className="sim-plan-select" onClick={() => onSelect(plan.key)} aria-pressed={active}>
                  {active ? <Check size={16}/> : <Circle size={16}/>}
                  <span><b>{plan.name}</b><small>{plan.type}{active ? " · En uso" : ""}</small></span>
                </button></td>
                <td className="sim-investment-cell">{investmentLabel(plan.investments)}</td>
                <td className="sim-strong-cell">{usd(plan.endingCash)}</td>
                <td>{usd(plan.minimumCash)}<small className="sim-cell-note">Mes {plan.minimumCashMonth || "inicial"}</small></td>
                <td>{Math.round(plan.activeSubscribers)}</td>
                <td>{plan.safe ? <span className="sim-rule-status is-safe"><Check size={13}/> Cumple</span> : <span className="sim-rule-status is-risk"><AlertTriangle size={13}/> No cumple</span>}</td>
                <td><label className={`sim-compare-check ${checked ? "is-checked" : ""}`}>
                  <input type="checkbox" checked={checked} onChange={() => onToggleCompare(plan.key)} aria-label={`Incluir ${plan.name} en la comparación`} />
                  <span className="sim-custom-check" aria-hidden="true">{checked ? <Check size={12} strokeWidth={3}/> : null}</span>
                  <span>Incluir</span>
                </label></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
        <p className="sim-table-help"><Circle size={12}/> El círculo/check a la izquierda activa el plan. La casilla «Incluir» solo lo agrega a la comparación; no cambia la proyección.</p>
      </section>

      <section className="sim-multi-compare">
        <div className="sim-panel-heading">
          <div><span className="sim-step-label">2 · COMPARAR</span><h2>Comparación lado a lado</h2><p>Solo aparecen aquí los planes que marcaste en «Incluir».</p></div>
          <span className="sim-selection-count">{comparedPlans.length} de {plans.length} planes</span>
        </div>
        {comparedPlans.length < 2 ? <p className="sim-compare-hint"><GitCompareArrows size={17}/> Marca al menos dos planes en la tabla anterior para ver sus diferencias.</p> :
          <>
          {(recommendedPlan || noEligiblePlan) && <aside className={`sim-recommendation ${noEligiblePlan ? "is-warning" : ""}`} aria-live="polite">
            <div className="sim-recommendation-icon">{noEligiblePlan ? <AlertTriangle size={18}/> : <Check size={18}/>}</div>
            <div className="sim-recommendation-copy">
              <span className="sim-recommendation-kicker">RESULTADO SEGÚN LAS REGLAS DEL RETO</span>
              {noEligiblePlan ? <>
                <strong>Ninguno de los planes seleccionados es viable</strong>
                <p>Todos incumplen al menos una regla del simulador. No se recomienda elegir un ganador hasta ajustar las inversiones para mantener la caja sobre USD 5.000 y respetar el promedio mínimo desde el mes 13.</p>
              </> : <>
                <strong>{hasRecommendationTie ? "Empate entre las mejores alternativas" : recommendedPlan.name}</strong>
                <p>{hasRecommendationTie
                  ? `Los planes ${tiedRecommendations.map(p => p.name).join(" y ")} empatan en caja al mes 24 y suscriptores activos.`
                  : `Es el plan viable con mayor caja al mes 24: ${usd(recommendedPlan.endingCash)}. Su caja mínima es ${usd(recommendedPlan.minimumCash)} y termina con ${Math.round(recommendedPlan.activeSubscribers)} suscriptores activos.`}</p>
              </>}
              <small>Regla oficial: mayor caja al mes 24 entre los planes que cumplen todas las restricciones; en empate, más suscriptores activos.</small>
            </div>
            {recommendedPlan && !hasRecommendationTie && <span className="sim-recommendation-badge">Mejor plan viable</span>}
          </aside>}
          <div className="sim-multi-compare-table-wrap"><table className="sim-multi-compare-table"><thead><tr><th>Indicador</th>{comparedPlans.map(p => <th key={p.key}>{p.name}</th>)}</tr></thead><tbody>
            <tr><td>Inversión promedio · M1–M12</td>{comparedPlans.map(p => <td key={p.key}>{usd(p.averageFirstYear)}</td>)}</tr>
            <tr><td>Fee agencia / mes con inversión</td>{comparedPlans.map(p => <td key={p.key}>{usd(p.agencyFee || 0)}</td>)}</tr>
            <tr><td>Caja al mes 24</td>{comparedPlans.map(p => <td key={p.key} className="sim-strong-cell">{usd(p.endingCash)}</td>)}</tr>
            <tr><td>Caja mínima</td>{comparedPlans.map(p => <td key={p.key}>{usd(p.minimumCash)}</td>)}</tr>
            <tr><td>Mes de caja mínima</td>{comparedPlans.map(p => <td key={p.key}>{p.minimumCashMonth || "Inicial"}</td>)}</tr>
            <tr><td>Suscriptores activos · M24</td>{comparedPlans.map(p => <td key={p.key}>{Math.round(p.activeSubscribers)}</td>)}</tr>
            <tr><td>Meses bajo el piso</td>{comparedPlans.map(p => <td key={p.key}>{p.floorBreaches}</td>)}</tr>
            <tr><td>Resultado de reglas</td>{comparedPlans.map(p => <td key={p.key}><span className={p.safe ? "sim-rule-status is-safe" : "sim-rule-status is-risk"}>{p.safe ? "Cumple" : "No cumple"}</span></td>)}</tr>
          </tbody></table></div>
          </>
        }
      </section>

      <details className="sim-model-assumptions">
        <summary>Consultar supuestos generales del modelo</summary>
        <div className="sim-assumptions-grid">
          <div><small>Caja inicial</small><b>{usd(SIMULATION_DEFAULTS.startCash)}</b></div>
          <div><small>Piso de seguridad</small><b>{usd(SIMULATION_DEFAULTS.cashFloor)}</b></div>
          <div><small>Costos fijos mensuales</small><b>{usd(SIMULATION_DEFAULTS.fixedCosts)}</b></div>
          <div><small>Clientes orgánicos / mes</small><b>{SIMULATION_DEFAULTS.organicCustomers}</b></div>
          <div><small>Contribución clientes actuales · M1</small><b>{usd(SIMULATION_DEFAULTS.currentCustomerContribution)}</b></div>
          <div><small>Caída de contribución actuales</small><b>{(SIMULATION_DEFAULTS.existingCustomerDecline * 100).toFixed(0)} % mensual</b></div>
          <div><small>Mezcla de clientes</small><b>85 % sueltos · 15 % suscripción</b></div>
          <div><small>Cancelación suscripción</small><b>9 % mensual</b></div>
        </div>
      </details>

      <div className="sim-active-plan-footer"><div><b>Plan que alimenta el simulador: {selected.name}</b><span>Inversión Meta: {investmentLabel(selected.investments)}</span></div><span className={selected.safe ? "sim-rule-status is-safe" : "sim-rule-status is-risk"}>{selected.safe ? "Cumple las reglas" : "Revisar restricciones"}</span></div>
    </section>
  );
}
