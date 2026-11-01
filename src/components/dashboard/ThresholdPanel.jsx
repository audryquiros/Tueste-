import { money, ratio } from "../../utils/formatters";

export default function ThresholdPanel({ result }) {
  const tone = result.ltvCac < 1 ? "text-tueste-red" : result.ltvCac < 3 ? "text-yellow-700" : "text-tueste-green";
  const label = result.ltvCac < 1 ? "Rojo · LTV no cubre CAC" : result.ltvCac < 3 ? "Amarillo · relación intermedia" : "Verde · relación saludable";
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-tueste-line bg-white p-5 shadow-soft">
        <h3 className="font-semibold">Semáforo LTV:CAC</h3>
        <div className="my-5 grid grid-cols-3 gap-1 text-center text-[11px] font-bold">
          <div className="rounded-lg bg-tueste-red px-2 py-3 text-white">Menor que 1</div>
          <div className="rounded-lg bg-tueste-yellow px-2 py-3 text-amber-950">De 1 a 3</div>
          <div className="rounded-lg bg-tueste-green px-2 py-3 text-white">3 o más</div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <strong className="text-3xl">{ratio(result.ltvCac)}</strong>
          <span className={`rounded-full bg-tueste-cream px-3 py-2 text-xs font-bold ${tone}`}>{label}</span>
        </div>
      </article>
      <article className="rounded-2xl border border-tueste-line bg-white p-5 shadow-soft">
        <h3 className="font-semibold">ROAS de break-even</h3>
        <p className="mt-2 text-sm leading-relaxed text-tueste-muted">Es el ROAS mínimo que se necesita para cubrir los costos variables del primer pedido.</p>
        <div className="mt-5 flex items-center justify-between rounded-xl bg-tueste-cream p-4">
          <span className="text-xs text-tueste-muted">Umbral actual</span>
          <strong className="text-2xl text-tueste-deep">{ratio(result.breakEvenROAS)}</strong>
        </div>
      </article>
    </div>
  );
}
