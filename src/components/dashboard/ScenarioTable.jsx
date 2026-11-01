import { CASE_DATA } from "../../services/caseData";
import { money, number, ratio } from "../../utils/formatters";

export default function ScenarioTable({ scenarios, selected }) {
  const rows = [
    ["Inversión Meta", (r) => money(r.params.investment)],
    ["Clientes nuevos", (r) => number(r.newCustomers)],
    ["CAC de anuncios", (r) => money(r.cacAds)],
    ["CAC real", (r) => money(r.cacReal)],
    ["LTV promedio", (r) => money(r.ltv)],
    ["LTV:CAC", (r) => ratio(r.ltvCac)],
    ["Payback", (r) => r.payback ? `${r.payback} meses` : "Más de 12"],
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border border-tueste-line bg-white shadow-soft">
      <table className="w-full min-w-[760px] border-collapse text-left text-xs">
        <thead className="bg-tueste-coral text-white"><tr>
          <th className="p-3">Indicador</th>
          {CASE_DATA.scenarios.map((s) => <th className="p-3" key={s.key}>{s.label}</th>)}
          <th className="p-3">Escenario elegido</th>
        </tr></thead>
        <tbody>{rows.map(([label, render], i) => <tr className={i % 2 ? "bg-tueste-cream" : ""} key={label}>
          <td className="p-3 font-semibold">{label}</td>
          {scenarios.map((s) => <td className="p-3 tabular-nums" key={s.key}>{render(s.result)}</td>)}
          <td className="p-3 font-semibold text-tueste-deep">{render(selected)}</td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}
