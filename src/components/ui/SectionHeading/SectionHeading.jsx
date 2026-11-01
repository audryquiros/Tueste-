import "./SectionHeading.css";
export default function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="mb-1 text-[10px] font-bold tracking-[.2em] text-tueste-orange">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold text-tueste-ink sm:text-3xl">{title}</h2>
      </div>
      {note && <p className="text-xs text-tueste-muted">{note}</p>}
    </div>
  );
}
