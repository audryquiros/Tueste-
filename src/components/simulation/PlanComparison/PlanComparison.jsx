import "./PlanComparison.css";

const usd = (value) => new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(value);

export default function PlanComparison({ plans, selectedKey, onSelect }) {
  return (
    <section className="sim-plan-section">
      <div className="sim-section-heading">
        <div>
          <span className="sim-eyebrow">COMPARACIÓN DE ALTERNATIVAS</span>
          <h2>Resultados de cada plan</h2>
          <p className="sim-plan-intro">Selecciona una fila para consultar su proyección y utilizarla en el pitch.</p>
        </div>
      </div>
      <div className="sim-plan-table-wrap">
        <table className="sim-plan-table">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Caja mínima</th>
              <th scope="col">Mes mínimo</th>
              <th scope="col">Caja al mes 24</th>
              <th scope="col">Suscriptores activos</th>
              <th scope="col">Reglas</th>
              <th scope="col"><span className="sr-only">Selección</span></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const selected = selectedKey === plan.key;
              return (
                <tr key={plan.key} className={`${selected ? "is-selected" : ""} ${!plan.safe ? "is-unsafe" : ""}`}>
                  <th scope="row">
                    <span className="sim-plan-type">{plan.type}</span>
                    <strong>{plan.name}</strong>
                  </th>
                  <td>{usd(plan.minimumCash)}</td>
                  <td>{plan.minimumCashMonth || "Inicial"}</td>
                  <td className="sim-plan-ending">{usd(plan.endingCash)}</td>
                  <td>{Math.round(plan.activeSubscribers).toLocaleString("es-CR")}</td>
                  <td><span className={plan.safe ? "sim-plan-safe" : "sim-plan-unsafe-label"}>{plan.safe ? "Cumple" : "No cumple"}</span></td>
                  <td>
                    <button
                      type="button"
                      className={`sim-plan-select ${selected ? "is-selected" : ""}`}
                      onClick={() => onSelect(plan.key)}
                      aria-pressed={selected}
                    >
                      {selected ? "Seleccionado" : "Elegir plan"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
