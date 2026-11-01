import KpiCard from "../KpiCard/KpiCard";
import { money, percent, ratio } from "../../../utils/formatters";
import "./KpiGrid.css";

export default function KpiGrid({ result }) {
  const ratioTone = result.ltvCac < 1 ? "bad" : result.ltvCac < 3 ? "warn" : "good";
  const items = [
    { label: "Margen de contribución ponderado (USD/pedido)", value: money(result.weightedFirstContribution), note: `${percent(result.marginRate)} del ingreso promedio del primer pedido.` },
    { label: "ROAS de break-even (veces)", value: ratio(result.breakEvenROAS), note: "ROAS mínimo para cubrir costos variables." },
    { label: "CAC real (USD/cliente)", value: money(result.cacReal), note: "Inversión + fee ÷ clientes nuevos." },
    { label: "LTV a 12 meses (USD/cliente)", value: money(result.ltv), note: "Contribución total estimada por cliente." },
    { label: "LTV:CAC (veces)", value: ratio(result.ltvCac), note: result.ltvCac < 1 ? "Rojo · LTV menor que CAC." : result.ltvCac < 3 ? "Amarillo · Entre 1:1 y 3:1." : "Verde · 3:1 o superior.", tone: ratioTone },
    { label: "Payback (meses)", value: result.payback ? `${result.payback} meses` : "Más de 12", note: "Primer mes en que la caja acumulada llega a cero." },
    { label: "ROAS real del primer pedido (veces)", value: result.realFirstOrderROAS == null ? "—" : ratio(result.realFirstOrderROAS), note: "Usa $34 por cliente nuevo, supuesto del caso." },
    { label: "CAC marginal del tramo (USD/cliente)", value: result.marginalCAC == null ? "—" : money(result.marginalCAC), note: "Costo por cliente adicional en el tramo histórico." },
  ];
  return <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{items.map((item) => <KpiCard key={item.label} {...item} />)}</div>;
}
