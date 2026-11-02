import { Copy, Check } from "lucide-react";
import { useMemo, useState } from "react";
import "./InvestorPitch.css";

const usd = (value) => new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(value);

function investmentStages(plan) {
  const values = [
    plan.rows[0]?.investment ?? 0,
    plan.rows[6]?.investment ?? 0,
    plan.rows[12]?.investment ?? 0,
  ];
  return `USD ${values[0].toLocaleString("en-US")} mensuales en los meses 1–6, USD ${values[1].toLocaleString("en-US")} en los meses 7–12 y USD ${values[2].toLocaleString("en-US")} en los meses 13–24`;
}

export default function InvestorPitch({ plan, plans = [] }) {
  const [copied, setCopied] = useState(false);
  const reference = useMemo(() => ({
    today: plans.find((item) => item.key === "fixed-8000"),
    agency: plans.find((item) => item.key === "agency-16000"),
  }), [plans]);

  const recommendation = plan.safe
    ? `El plan respeta el piso de seguridad: su caja mínima proyectada es ${usd(plan.minimumCash)}, en el mes ${plan.minimumCashMonth || "inicial"}, frente al mínimo permitido de USD 5.000.`
    : `No recomiendo ejecutar este plan: su caja mínima cae a ${usd(plan.minimumCash)} en el mes ${plan.minimumCashMonth}, por debajo del piso obligatorio de USD 5.000.`;

  const comparison = reference.today && reference.agency
    ? `Como referencia, el plan actual de USD 8.000 termina con ${usd(reference.today.endingCash)} y la propuesta de agencia de USD 16.000 termina con ${usd(reference.agency.endingCash)}. La alternativa de agencia además incumple el piso de caja bajo estos supuestos.`
    : "La comparación debe revisarse junto con los demás escenarios antes de comprometer el presupuesto.";

  const pitch = `Diego, nuestra propuesta es ${plan.name}. El presupuesto se distribuye así: ${investmentStages(plan)}. Elegimos este camino porque busca adquirir clientes sin comprometer la liquidez del negocio. En el escenario seleccionado, la caja proyectada al cierre del mes 24 es ${usd(plan.endingCash)} y se estiman ${Math.round(plan.activeSubscribers).toLocaleString("es-CR")} suscriptores activos. ${recommendation} ${comparison} El principal riesgo es que los clientes nuevos reales sean menos que los estimados por el historial de inversión, o que las cohortes no repitan sus compras como supone el modelo. Por eso no proponemos aumentar el presupuesto automáticamente. Mantendríamos el plan y revisaríamos mensualmente la adquisición observada, la contribución de las cohortes y la caja proyectada. Solo subiríamos la inversión si durante tres meses consecutivos la caja proyectada se mantiene por encima de USD 10.000, el CAC marginal está cubierto por la contribución esperada y los clientes nuevos reales confirman el comportamiento histórico. Si alguna de esas condiciones falla, mantendríamos o reduciríamos el presupuesto para proteger el piso de USD 5.000. Esta es una proyección educativa basada en los supuestos del caso, no una garantía de resultados.`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="sim-pitch-card">
      <div className="sim-pitch-head">
        <div><span className="sim-eyebrow">PITCH · 2 MINUTOS</span><h2>La propuesta para el inversionista</h2></div>
        <button className="sim-ghost-button" onClick={copy} type="button">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Copiado" : "Copiar pitch"}</button>
      </div>
      <p>{pitch}</p>
      <div className="sim-pitch-foot">El discurso se actualiza con el plan seleccionado. Ajusta el texto a tu forma de hablar antes de presentarlo.</div>
    </section>
  );
}
