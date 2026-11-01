import ControlField from "../ControlField/ControlField";
import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import { money, number } from "../../../utils/formatters";
import "./ControlsPanel.css";

export default function ControlsPanel({ inputs, onChange }) {
  const controls = [
    { key: "investment", label: "Inversión mensual en Meta", type: "range", min: 0, max: 20000, step: 250, displayValue: money(inputs.investment), help: "Rango permitido: $0 a $20.000." },
    { key: "bagPrice", label: "Precio por bolsa", type: "number", min: 1, max: 100, step: 0.5, displayValue: money(inputs.bagPrice), help: "El pedido típico contiene 2 bolsas." },
    { key: "coffeeCost", label: "Costo del café por bolsa", type: "number", min: 0, max: 50, step: 0.01, displayValue: money(inputs.coffeeCost), help: "Costo de producción del café." },
    { key: "shipping", label: "Costo del envío por pedido", type: "number", min: 0, max: 50, step: 0.1, displayValue: money(inputs.shipping), help: "Lo paga Tueste." },
    { key: "subscriberMix", label: "Porcentaje de suscriptores", type: "range", min: 0, max: 100, step: 1, displayValue: `${inputs.subscriberMix}%`, help: "El resto corresponde a pedidos sueltos." },
    { key: "churn", label: "Cancelación mensual de suscriptores", type: "range", min: 0, max: 50, step: 1, displayValue: `${inputs.churn}%`, help: "Porcentaje de suscriptores que cancela cada mes." },
    { key: "looseOrders", label: "Pedidos sueltos en 12 meses", type: "range", min: 1, max: 8, step: 0.1, displayValue: `${number(inputs.looseOrders)} pedidos`, help: "Frecuencia estimada de recompra del cliente suelto." },
    { key: "agencyFee", label: "Fee mensual de agencia", type: "number", min: 0, max: 10000, step: 50, displayValue: money(inputs.agencyFee), help: "Costo fijo mensual de la agencia." },
    { key: "discount", label: "Descuento del primer pedido", type: "range", min: 0, max: 50, step: 1, displayValue: `${inputs.discount}%`, help: "Descuento aplicado al primer pedido suelto." },
  ];
  return (
    <section className="rounded-2xl border border-tueste-line bg-white p-5 shadow-soft sm:p-6">
      <SectionHeading eyebrow="01 · SUPUESTOS" title="Controles del modelo" note="Los campos se actualizan en vivo." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {controls.map((control) => {
          const { key, ...fieldProps } = control;
          return (
            <ControlField
              key={key}
              {...fieldProps}
              value={inputs[key]}
              onChange={(value) => onChange(key, value)}
            />
          );
        })}
      </div>
      <div className="mt-4 rounded-xl border-l-4 border-tueste-yellow bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
        <strong>Supuestos:</strong> pedido suelto de 2 bolsas; suscripción de $30,60; comisión de pasarela de 4,5%; empaque de $1,20; mezcla de clientes constante dentro del escenario. Los datos históricos de clientes nuevos se interpolan linealmente.
      </div>
    </section>
  );
}
