import { useState } from "react";
import {
  LayoutDashboard, Zap, Share2, Gift, Users, CalendarDays,
  BarChart3, ArrowLeft, Copy, Check, MessageCircle, Target,
  FlaskConical, WalletCards, Smartphone
} from "lucide-react";
import "./Reto4.css";
import "../../components/growth/Reto4Sidebar/Reto4Sidebar.css";
import ReferralPrototype from "../../components/growth/ReferralPrototype/ReferralPrototype";

const nav = [
  { id: "overview", label: "Resumen", description: "Vista general", icon: LayoutDashboard },
  { id: "cycle", label: "Cómo funciona", description: "Ciclo de referidos", icon: Zap },
  { id: "invite", label: "Invitar", description: "Link y WhatsApp", icon: Share2 },
  { id: "prototype", label: "Prototipo", description: "Flujo interactivo", icon: Smartphone },
  { id: "progress", label: "Mi progreso", description: "Recompensas", icon: Gift },
  { id: "diego", label: "Panel de Diego", description: "Embudo simulado", icon: Users },
  { id: "plan", label: "Plan 90 días", description: "Canales y experimento", icon: CalendarDays },
];

const steps = [
  ["1", "Recibes tu café", "El momento de mayor intención: el producto ya está en tus manos."],
  ["2", "Te invitamos", "La invitación aparece al llegar el café, no al día siguiente del pago."],
  ["3", "Compartes tu link", "WhatsApp abre el camino con un mensaje listo para enviar."],
  ["4", "Tu amigo compra", "El regalo ya viene aplicado; no hay códigos que copiar."],
  ["5", "Recibes tu recompensa", "Tu progreso se actualiza y puedes volver a invitar."],
];

const rewards = [
  { title: "1 amigo compra", friend: "$8 de descuento", owner: "Muestra 100 g", cost: "$9,60", detail: "$8 + $1,60" },
  { title: "3 amigos compran", friend: "$8 de descuento", owner: "Bono de $6", cost: "$10,00", detail: "$8 + $2 por referido" },
  { title: "Amigo se suscribe", friend: "$8 de descuento", owner: "1 mes gratis", cost: "$24,58", detail: "$8 + $16,58" },
];

function money(v) {
  return `$${v.toLocaleString("en-US")}`;
}

function Sidebar({ active, onNavigate, onHome, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && <button className="r4-overlay" onClick={onClose} aria-label="Cerrar menú" />}
      <aside className={`r4-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="r4-brand">
          <div className="r4-brand-mark">T</div>
          <div><strong>TUESTE</strong><small>TABLERO FINANCIERO</small></div>
        </div>

        <div className="r4-nav-wrap">
          <p className="r4-nav-label">MENÚ PRINCIPAL</p>
          <nav>
            {nav.map(item => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  className={`r4-nav-item ${selected ? "active" : ""}`}
                  onClick={() => { onNavigate(item.id); onClose(); }}
                >
                  <span className="r4-nav-icon"><Icon size={18}/></span>
                  <span className="r4-nav-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
                  {selected && <i />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="r4-sidebar-bottom">
          <div className="r4-objective">
            <strong>Objetivo del reto</strong>
            <p>Convertir clientes satisfechos en un canal de adquisición por referidos.</p>
          </div>
          <button className="r4-home-button" onClick={onHome}>
            <ArrowLeft size={16}/> Volver al inicio
          </button>
          <small className="r4-footnote">PROGRAMA DE GROWTH · TUESTE</small>
        </div>
      </aside>
    </>
  );
}

function PageHeading({ eyebrow, title, subtitle, onMenu }) {
  return (
    <div className="r4-page-heading">
      <div>
        <span className="r4-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <button className="r4-mobile-menu" onClick={onMenu}>Menú</button>
    </div>
  );
}

function Overview({ go }) {
  return (
    <>
      <PageHeading
        eyebrow="CASO A · RETO NIVEL 4"
        title="Programa de referidos"
        subtitle="Convierte la satisfacción de un cliente en una nueva compra, sin depender solo de Meta."
        onMenu={go}
      />
      <section className="r4-hero-card">
        <div>
          <span className="r4-card-eyebrow">LA OPORTUNIDAD</span>
          <h2>El café llega. Ese es el momento de pedir la recomendación.</h2>
          <p>Hoy el programa pierde fuerza porque la invitación llega tarde y el amigo debe copiar un código. La propuesta mueve la invitación al momento de llegada y convierte el código en un link con el regalo aplicado.</p>
          <button onClick={() => go("cycle")} className="r4-primary">Ver el ciclo <span>→</span></button>
        </div>
        <div className="r4-hero-metric">
          <small>Meta del programa</small>
          <strong>6 → 9</strong>
          <span>referidos por cada 100 compradores</span>
        </div>
      </section>

      <section className="r4-kpis">
        <article><span>Clientes referidos actuales</span><strong>60</strong><small>por cada 1.000 compradores</small></article>
        <article><span>Entradas al programa</span><strong>120</strong><small>por cada 1.000 compradores</small></article>
        <article><span>CAC máximo referido</span><strong>$25</strong><small>mitad del CAC Meta de $50</small></article>
        <article><span>Contramétrica</span><strong>Bajas</strong><small>de la lista de correos</small></article>
      </section>

      <section className="r4-two-col">
        <article className="r4-card">
          <div className="r4-card-title"><div><span className="r4-card-eyebrow">POR QUÉ CAMBIAR</span><h3>El problema está en el momento</h3></div><Target size={20}/></div>
          <div className="r4-funnel-mini">
            <div><span>Correo abierto</span><b>350</b></div>
            <div><span>Entra al programa</span><b>120</b></div>
            <div><span>Invita</span><b>100</b></div>
            <div><span>Compra referida</span><b>60</b></div>
          </div>
        </article>
        <article className="r4-card">
          <div className="r4-card-title"><div><span className="r4-card-eyebrow">REGLA DE DIEGO</span><h3>Nunca superar $25 por referido</h3></div><WalletCards size={20}/></div>
          <p className="r4-body">Meta cuesta $50 por cliente nuevo en el escenario actual. El programa de referidos debe costar como máximo la mitad.</p>
          <div className="r4-rule"><strong>$50 / 2 = $25</strong><span>CAC máximo</span></div>
        </article>
      </section>
    </>
  );
}

function Cycle() {
  return (
    <>
      <PageHeading eyebrow="01 · CICLO" title="Cómo funciona" subtitle="El programa acompaña el momento de mayor intención y reduce fricción para ambos lados." />
      <section className="r4-card">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">CICLO DE REFERIDOS</span><h3>Del café recibido a una nueva compra</h3></div></div>
        <div className="r4-cycle">
          {steps.map(([n,t,d],i) => <div className="r4-cycle-step" key={n}>
            <div className="r4-step-num">{n}</div>
            <div><strong>{t}</strong><p>{d}</p></div>
            {i < steps.length-1 && <span className="r4-cycle-arrow">→</span>}
          </div>)}
        </div>
      </section>
      <section className="r4-two-col">
        <article className="r4-card">
          <span className="r4-card-eyebrow">PUNTO DE FUGA</span>
          <h3>Abren, pero no entran</h3>
          <p className="r4-body">De 350 personas que abren el correo, solo 120 entran al programa: 34,3 %. Ese es el mayor abandono entre pasos.</p>
          <div className="r4-big-stat">65,7 % <small>se pierde en este paso</small></div>
        </article>
        <article className="r4-card">
          <span className="r4-card-eyebrow">CAMBIO PROPUESTO</span>
          <h3>Invitar cuando llega el café</h3>
          <p className="r4-body">La recomendación aparece cuando el cliente tiene el producto en sus manos. El amigo recibe un link con el descuento aplicado, sin copiar códigos.</p>
        </article>
      </section>
    </>
  );
}

function Invite() {
  const [copied, setCopied] = useState(false);
  const link = "tueste.cr/invita/sofia-82";
  const copy = async () => {
    try { await navigator.clipboard.writeText(`https://${link}`); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  const whatsapp = `https://wa.me/?text=${encodeURIComponent("Te quiero regalar $8 en tu primer café de Tueste ☕ https://" + link)}`;
  return (
    <>
      <PageHeading eyebrow="02 · INVITAR" title="Comparte tu regalo" subtitle="Una invitación simple, personal y lista para WhatsApp." />
      <section className="r4-invite-grid">
        <article className="r4-card r4-invite-card">
          <span className="r4-card-eyebrow">TU LINK PERSONAL</span>
          <h2>Tu amigo recibe $8</h2>
          <p>El descuento se aplica al entrar. No tiene que copiar ningún código.</p>
          <div className="r4-link-box"><span>{link}</span><button onClick={copy}>{copied ? <><Check size={16}/> Copiado</> : <><Copy size={16}/> Copiar</>}</button></div>
          <a className="r4-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Compartir por WhatsApp</a>
        </article>
        <article className="r4-card r4-phone-card">
          <span className="r4-card-eyebrow">VISTA DEL AMIGO</span>
          <div className="r4-phone">
            <small>Invitación de Sofía</small>
            <div className="r4-phone-gift">$8</div>
            <h3>Tu primer café tiene un regalo.</h3>
            <p>El descuento ya está aplicado a tu primer pedido.</p>
            <button>Elegir mi café →</button>
          </div>
        </article>
      </section>
    </>
  );
}

function Prototype() {
  return (
    <>
      <PageHeading eyebrow="03 · PROTOTIPO" title="Prueba la experiencia" subtitle="Recorre la invitación como la viviría un cliente, desde el primer clic hasta la recompensa." />
      <ReferralPrototype />
    </>
  );
}

function Progress() {
  return (
    <>
      <PageHeading eyebrow="04 · PROGRESO" title="Mi progreso" subtitle="La recompensa se entiende de un vistazo y el siguiente objetivo siempre está claro." />
      <section className="r4-progress-hero r4-card">
        <div><span className="r4-card-eyebrow">TU PROGRESO</span><h2>2 de 3 amigos compraron</h2><p>Te falta una compra para desbloquear tu bono de $6.</p></div>
        <div className="r4-progress-ring"><strong>2/3</strong><span>referidos</span></div>
      </section>
      <section className="r4-rewards">
        {rewards.map((r,i) => <article className={`r4-reward ${i===1 ? "current" : ""}`} key={r.title}>
          <div className="r4-reward-top"><span>{r.title}</span>{i===1 && <b>Actual</b>}</div>
          <h3>{r.friend}</h3>
          <p>Quien invita: {r.owner}</p>
          <div className="r4-cost"><span>Costo por referido</span><strong>{r.cost}</strong></div>
          <small>{r.detail}</small>
        </article>)}
      </section>
    </>
  );
}

function Diego() {
  return (
    <>
      <PageHeading eyebrow="05 · PANEL" title="Panel de Diego" subtitle="El embudo muestra dónde funciona el programa y dónde debemos intervenir." />
      <section className="r4-kpis r4-diego-kpis">
        <article><span>Clientes compradores</span><strong>60</strong><small>referidos actuales</small></article>
        <article><span>Conversión tienda → compra</span><strong>40 %</strong><small>150 → 60</small></article>
        <article><span>Referidos / 100 compradores</span><strong>6</strong><small>meta: 9</small></article>
        <article><span>Costo máximo</span><strong>$25</strong><small>por cliente referido</small></article>
      </section>
      <section className="r4-card">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">EMBUDO SIMULADO</span><h3>1.000 compradores → 60 compras referidas</h3></div><BarChart3 size={20}/></div>
        <div className="r4-funnel">
          {[
            ["Correo recibido","1.000","—"],
            ["Correo abierto","350","35,0 %"],
            ["Entra al programa","120","34,3 %"],
            ["Invita","100","83,3 %"],
            ["Invitaciones enviadas","300","3 por persona"],
            ["Abre tienda","150","50,0 %"],
            ["Compra","60","40,0 %"],
          ].map(([label,val,rate],i)=><div className="r4-funnel-row" key={label}><span>{label}</span><div><b style={{width:`${Math.max(18,(Number(val)/1000)*100)}%`}}>{val}</b></div><small>{rate}</small></div>)}
        </div>
      </section>
      <section className="r4-weekly">
        <div className="r4-weekly-icon"><FlaskConical size={19}/></div>
        <div>
          <strong>Qué mirar cada semana</strong>
          <div className="r4-weekly-grid">
            <div><b>6 → 9</b><span>referidos por cada 100 compradores</span></div>
            <div><b>40 % → 50 %</b><span>conversión de tienda a compra</span></div>
            <div><b>≤ 25 %</b><span>máximo de bajas en el canal de email</span></div>
          </div>
          <p>Si suben los referidos pero cae la compra o aumentan las bajas, se ajusta el momento del mensaje antes de escalar.</p>
        </div>
      </section>
    </>
  );
}

function Plan() {
  return (
    <>
      <PageHeading eyebrow="06 · 90 DÍAS" title="Plan de crecimiento" subtitle="Meta sigue siendo un canal, pero deja de cargar sola con la adquisición." />
      <section className="r4-90days">
        {[
          ["0–30 días","Activar el momento correcto","Mostrar la invitación cuando llega el café. Lanzar link personal y mensaje listo."],
          ["31–60 días","Optimizar el ciclo","Medir aperturas, envíos y compras. A/B testear momento de invitación y página del amigo."],
          ["61–90 días","Escalar lo que funciona","Promover referidos en email, WhatsApp y postcompra; mantener Meta como adquisición complementaria."],
        ].map(x=><article className="r4-day-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
      </section>
      <section className="r4-card r4-experiment">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">EXPERIMENTO A / B</span><h3>Invitación al llegar vs. día siguiente al pago</h3></div><FlaskConical size={20}/></div>
        <p className="r4-hypothesis"><strong>Hipótesis:</strong> si mostramos la invitación cuando llega el café, aumentaremos las entradas al programa de 120 a 180 por cada 1.000 compradores.</p>
        <div className="r4-experiment-grid">
          <div><span>Métrica principal</span><strong>Entradas al programa</strong><small>120 → 180</small></div>
          <div><span>Meta</span><strong>9 referidos / 100</strong><small>desde 6 actuales</small></div>
          <div><span>Contramétrica</span><strong>Bajas de emails</strong><small>No debe empeorar</small></div>
        </div>
      </section>
      <section className="r4-card r4-growth-note">
        <span className="r4-card-eyebrow">FICHA DE GROWTH</span>
        <h3>Las cuatro preguntas del cliente</h3>
        <div className="r4-four">
          <div><b>¿Es para mí?</b><span>Invitación después de recibir el café.</span></div>
          <div><b>¿Hace lo que quiero?</b><span>Link personal + descuento aplicado.</span></div>
          <div><b>¿Me importa ahora?</b><span>Coincide con la llegada del producto.</span></div>
          <div><b>¿Sé cómo lograrlo?</b><span>WhatsApp listo y pocos pasos.</span></div>
        </div>
      </section>
    </>
  );
}

export default function Reto4({ onHome = () => {} }) {
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = {
    overview: <Overview go={setActive} />,
    cycle: <Cycle />,
    invite: <Invite />,
    prototype: <Prototype />,
    progress: <Progress />,
    diego: <Diego />,
    plan: <Plan />,
  };

  return (
    <div className="r4-shell">
      <Sidebar active={active} onNavigate={setActive} onHome={onHome} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="r4-main">
        <div className="r4-content">
          {content[active]}
        </div>
        <footer className="r4-footer"><span>TUESTE · CASO A · PROGRAMA DE GROWTH</span><span>REFERIDOS · 90 DÍAS</span></footer>
      </main>
    </div>
  );
}
