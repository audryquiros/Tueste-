import "./KpiCard.css";
export default function KpiCard({ label, value, note, tone = "default" }) {
  const tones = {
    default: "border-t-tueste-coral",
    good: "border-t-tueste-green",
    warn: "border-t-tueste-yellow",
    bad: "border-t-tueste-red",
  };
  return (
    <article className={`min-h-32 rounded-xl border border-tueste-line border-t-4 bg-white p-4 shadow-soft ${tones[tone]}`}>
      <p className="min-h-8 text-xs leading-relaxed text-tueste-muted">{label}</p>
      <strong className="my-2 block text-2xl font-bold text-tueste-deep sm:text-3xl">{value}</strong>
      <small className="text-[10px] leading-relaxed text-tueste-muted">{note}</small>
    </article>
  );
}
