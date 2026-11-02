import {
  LayoutDashboard,
  SlidersHorizontal,
  ChartNoAxesCombined,
  GitCompareArrows,
  Table2,
  Presentation,
  ArrowLeft,
  X,
} from "lucide-react";
import "./Reto3Sidebar.css";

const items = [
  { id: "overview", label: "Resumen", description: "Vista general", icon: LayoutDashboard },
  { id: "controls", label: "Configurar estrategia", description: "Define la inversión", icon: SlidersHorizontal },
  { id: "projection", label: "Proyección de caja", description: "Evolución de 24 meses", icon: ChartNoAxesCombined },
  { id: "scenarios", label: "Planes y comparación", description: "Supuestos y resultados", icon: GitCompareArrows },
  { id: "monthly", label: "Detalle mensual", description: "Revisa los 24 meses", icon: Table2 },
  { id: "pitch", label: "Pitch de inversión", description: "Presenta tu propuesta", icon: Presentation },
];

export default function Reto3Sidebar({ active, onNavigate, onHome, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && <button className="reto3-sidebar-overlay" onClick={onClose} aria-label="Cerrar menú" />}
      <aside className={`reto3-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="reto3-sidebar-brand">
          <div className="reto3-sidebar-mark">T</div>
          <div><strong>TUESTE</strong><small>TABLERO FINANCIERO</small></div>
          <button className="reto3-sidebar-close" onClick={onClose} aria-label="Cerrar navegación"><X size={19}/></button>
        </div>

        <div className="reto3-sidebar-nav-wrap">
          <p className="reto3-sidebar-label">MENÚ PRINCIPAL</p>
          <nav className="reto3-sidebar-nav">
            {items.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button key={item.id} className={`reto3-sidebar-link ${selected ? "active" : ""}`} onClick={() => { onNavigate(item.id); onClose(); }} aria-current={selected ? "page" : undefined}>
                  <span className="reto3-sidebar-icon"><Icon size={18}/></span>
                  <span className="reto3-sidebar-link-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
                  {selected && <i/>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="reto3-sidebar-bottom">
          <div className="reto3-sidebar-tip"><strong>Objetivo del reto</strong><p>Maximizar la caja al mes 24 sin bajar de USD 5.000.</p></div>
          <button className="reto3-sidebar-home" onClick={onHome}><ArrowLeft size={16}/> Volver al inicio</button>
          <small className="reto3-sidebar-footnote">MODELO FINANCIERO INTERACTIVO</small>
        </div>
      </aside>
    </>
  );
}
