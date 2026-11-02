import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./MonthlyCashTable.css";

const usd = (v) => new Intl.NumberFormat("es-CR",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(v);
export default function MonthlyCashTable({ rows }) {
  const [expanded, setExpanded] = useState(true);
  return <section className="sim-table-card">
    <button className="sim-table-toggle" onClick={() => setExpanded((v)=>!v)}>
      <span><span className="sim-eyebrow">DETALLE MENSUAL</span><strong>Proyección de caja · 24 meses</strong></span>
      {expanded ? <ChevronUp/> : <ChevronDown/>}
    </button>
    {expanded && <div className="sim-table-scroll"><table className="sim-month-table">
      <thead><tr><th>Mes</th><th>Inversión Meta</th><th>Clientes nuevos</th><th>Contribución actuales</th><th>Contribución cohortes</th><th>Salidas</th><th>Caja final</th><th>Suscriptores activos</th><th>Alerta</th></tr></thead>
      <tbody>{rows.map((r)=><tr key={r.month} className={r.belowFloor || r.investmentRuleViolation ? "sim-row-alert":""}>
        <td>{r.month}</td><td>{usd(r.investment)}</td><td>{r.newCustomers.toFixed(1)}</td><td>{usd(r.existingContribution)}</td><td>{usd(r.newCohortContribution)}</td><td>{usd(r.outflows)}</td><td className="sim-cash-cell">{usd(r.closingCash)}</td><td>{r.activeSubscribers.toFixed(1)}</td>
        <td>{r.belowFloor ? <span className="sim-alert-pill">Bajo piso</span> : r.investmentRuleViolation ? <span className="sim-alert-pill">Regla mes 13+</span> : <span className="sim-ok-pill">OK</span>}</td>
      </tr>)}</tbody>
    </table></div>}
  </section>;
}
