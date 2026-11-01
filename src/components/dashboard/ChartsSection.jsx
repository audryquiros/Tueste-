import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceDot, ScatterChart, Scatter, BarChart, Bar, Legend, Cell, LabelList
} from "recharts";
import { CASE_DATA } from "../../services/caseData";
import { estimateNewCustomers, getMarginalCAC } from "../../services/financialModel";
import { money, number, ratio } from "../../utils/formatters";

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <article className={`rounded-2xl border border-tueste-line bg-white p-4 shadow-soft sm:p-5 ${className}`}>
      <div className="mb-4"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-[11px] text-tueste-muted">{subtitle}</p></div>
      <div className="w-full min-w-0">{children}</div>
    </article>
  );
}
const tooltipStyle = { borderRadius: 12, border: "1px solid #EAD6C8", fontSize: 12 };

export default function ChartsSection({ result, scenarios, inputs }) {
  const cashData = Array.from({ length: 13 }, (_, month) => {
    const row = { month };
    scenarios.forEach((s) => { row[s.key] = s.result.cashCurve[month]?.value ?? null; });
    return row;
  });
  const ltvData = [{ name: "Cliente", cac: result.cacReal, ltv: result.ltv }];
  const customerData = CASE_DATA.history.map((point) => ({
    ...point,
    marginal: point.investment === 0 ? null : getMarginalCAC(point.investment),
  }));
  const selectedPoint = { investment: inputs.investment, clients: estimateNewCustomers(inputs.investment) };
  const roasData = [
    { name: "Ads Manager", value: CASE_DATA.fixed.metaReportedROAS, fill: "#D98170" },
    { name: "ROAS primer pedido", value: result.realFirstOrderROAS ?? 0, fill: "#4D83C6" },
    { name: "Break-even", value: result.breakEvenROAS, fill: "#32835B" },
  ];
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ChartCard title="Curva de caja de un cliente" subtitle="Caja acumulada después de pagar el CAC.">
        <div className="h-[280px] w-full min-w-0">
        <ResponsiveContainer>
          <LineChart data={cashData} margin={{ top: 10, right: 12, left: 5, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eadfd7" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} label={{ value: "Mes", position: "insideBottom", offset: -2, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${Math.round(v)}`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => money(v)} labelFormatter={(v) => `Mes ${v}`} />
            <ReferenceLine y={0} stroke="#4f4944" strokeDasharray="5 4" />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="today" name="Hoy" stroke="#4D83C6" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="agency" name="Agencia" stroke="#D9534F" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="alternative" name="Alternativa propia" stroke="#E2A52B" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="LTV frente al CAC" subtitle="Comparación con líneas de referencia 1:1 y 3:1.">
        <div className="h-[280px] w-full min-w-0">
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 18, right: 20, left: 8, bottom: 18 }}>
            <CartesianGrid stroke="#eadfd7" />
            <XAxis type="number" dataKey="cac" name="CAC" tickFormatter={(v) => `$${Math.round(v)}`} tick={{ fontSize: 10 }} label={{ value: "CAC (USD)", position: "insideBottom", offset: -10, fontSize: 11 }} />
            <YAxis type="number" dataKey="ltv" name="LTV" tickFormatter={(v) => `$${Math.round(v)}`} tick={{ fontSize: 10 }} label={{ value: "LTV (USD)", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => money(v)} />
            <ReferenceLine segment={[{ x: 0, y: 0 }, { x: Math.max(result.cacReal, result.ltv) * 1.1, y: Math.max(result.cacReal, result.ltv) * 1.1 }]} stroke="#D9A329" strokeDasharray="5 4" label={{ value: "1:1", fontSize: 10 }} />
            <ReferenceLine segment={[{ x: 0, y: 0 }, { x: Math.max(result.cacReal, result.ltv / 3) * 1.1, y: Math.max(result.cacReal, result.ltv / 3) * 3.3 }]} stroke="#32835B" strokeDasharray="5 4" label={{ value: "3:1", fontSize: 10 }} />
            <Scatter data={ltvData} fill="#B85D08" />
          </ScatterChart>
        </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Clientes nuevos según inversión" subtitle="Historial del caso y punto de inversión seleccionado." className="xl:col-span-2">
        <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer>
          <LineChart data={customerData} margin={{ top: 16, right: 24, left: 8, bottom: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eadfd7" />
            <XAxis
              dataKey="investment"
              type="number"
              domain={[0, 20000]}
              ticks={[0, 4000, 8000, 12000, 16000, 20000]}
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: "#b9aaa0" }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === "clients" ? number(v) : money(v), name === "clients" ? "Clientes nuevos" : "CAC marginal"]} labelFormatter={(v) => `Inversión: ${money(v)}`} />
            <Line
              type="monotone"
              dataKey="clients"
              name="Clientes nuevos"
              stroke="#4D83C6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#fff", stroke: "#4D83C6", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <ReferenceLine
              x={inputs.investment}
              stroke="#B85D08"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ value: "Inversión elegida", fill: "#B85D08", fontSize: 11, position: "insideTopRight" }}
            />
            <ReferenceDot
              x={selectedPoint.investment}
              y={selectedPoint.clients}
              r={6}
              fill="#B85D08"
              stroke="#fff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {CASE_DATA.history.slice(1).map((point, index) => {
            const previous = CASE_DATA.history[index];
            const marginal = (point.investment - previous.investment) / (point.clients - previous.clients);
            return <span className="rounded-xl border border-tueste-line bg-tueste-cream px-3 py-3 text-[11px] leading-relaxed text-tueste-muted" key={point.investment}>
              <span className="block">{`$${previous.investment / 1000}k–$${point.investment / 1000}k`}</span>
              <b className="mt-1 block text-sm text-tueste-deep">{money(marginal)}</b>
              <span className="block text-[10px]">CAC marginal / cliente</span>
            </span>;
          })}
        </div>
      </ChartCard>

      <ChartCard title="La trampa del ROAS" subtitle="Ads Manager vs. primer pedido vs. break-even." className="xl:col-span-2">
        <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer>
          <BarChart data={roasData} margin={{ top: 18, right: 18, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eadfd7" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}x`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => ratio(v)} />
            <Bar dataKey="value" name="ROAS" radius={[8, 8, 0, 0]} maxBarSize={110}>
              {roasData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
              <LabelList dataKey="value" position="top" formatter={(value) => ratio(value)} style={{ fill: "#51463f", fontSize: 12, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
