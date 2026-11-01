import "./ControlField.css";
export default function ControlField({ label, value, displayValue, min, max, step, onChange, help, type = "range" }) {
  return (
    <label className="block rounded-xl border border-orange-100 bg-tueste-cream p-4">
      <span className="mb-3 flex items-start justify-between gap-3 text-xs font-semibold text-tueste-ink">
        <span>{label}</span>
        <strong className="whitespace-nowrap text-tueste-deep">{displayValue}</strong>
      </span>
      <input
        className={type === "range" ? "w-full accent-tueste-orange" : "w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm"}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <small className="mt-2 block text-[11px] leading-relaxed text-tueste-muted">{help}</small>
    </label>
  );
}
