import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
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
  ["1", "Recibes tu café", "Quién: tú, cliente de Tueste.", "El pedido llega a tus manos y aparece el momento natural para invitar."],
  ["2", "Te invitamos", "Quién: tú, cliente de Tueste.", "Tueste muestra la invitación al llegar el café, cuando la satisfacción está fresca."],
  ["3", "Tu amigo recibe el link", "Quién: tu amigo.", "Abre el enlace que compartiste y ve el descuento aplicado, sin copiar códigos."],
  ["4", "Tu amigo compra", "Quién: tu amigo.", "Elige su café, ve el descuento de $8 y completa la compra."],
  ["5", "Recibes tu recompensa", "Quién: tú, cliente de Tueste.", "La compra se registra y tu progreso avanza hacia el siguiente beneficio."],
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
  const [selected, setSelected] = useState(0);
  const step = steps[selected];
  const cardRefs = useRef([]);
  const detailRef = useRef(null);

  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    gsap.to(cards, {
      flexGrow: (i) => (i === selected ? 1.62 : 0.82),
      duration: 0.32,
      ease: "power3.out",
      overwrite: true,
    });

    if (detailRef.current) {
      gsap.fromTo(detailRef.current,
        { opacity: 0.35, y: 5 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", overwrite: true }
      );
    }
  }, [selected]);

  return (
    <>
      <PageHeading eyebrow="01 · CICLO" title="Cómo funciona" subtitle="Primero actúa quien ya compró. Después entra el amigo. Al final, la recompensa vuelve a quien invitó." />
      <section className="r4-card r4-cycle-card">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">CICLO DE REFERIDOS</span><h3>Del café recibido a una nueva compra</h3></div></div>
        <div className="r4-role-legend"><span><i className="r4-role-dot owner"/> Quien invita</span><span><i className="r4-role-dot friend"/> Amigo referido</span></div>
        <div className="r4-cycle-carousel">
          {steps.map(([n,t,who,d],i) => (
            <button
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`r4-cycle-step ${selected===i ? "selected" : ""} ${i===2||i===3 ? "friend-step" : "owner-step"}`}
              key={n}
              onClick={()=>setSelected(i)}
              type="button"
            >
              <div className="r4-step-num">{n}</div>
              <div className="r4-step-copy"><strong>{t}</strong><span className="r4-step-who">{who}</span><p>{d}</p></div>
            </button>
          ))}
        </div>
        <div ref={detailRef} className="r4-cycle-detail">
          <div className="r4-cycle-detail-num">{step[0]}</div>
          <div><span className="r4-card-eyebrow">PASO {step[0]} · {step[2].replace("Quién: ", "")}</span><strong>{step[1]}</strong><p>{step[3]}</p></div>
        </div>
      </section>
      <section className="r4-two-col r4-cycle-bottom">
        <article className="r4-card">
          <span className="r4-card-eyebrow">DÓNDE SE PIERDE</span>
          <h3>Abren, pero no entran</h3>
          <p className="r4-body">De 350 personas que abren el correo, solo 120 entran al programa: 34,3 %. El problema está antes de la invitación efectiva.</p>
          <div className="r4-big-stat">65,7 % <small>abandona antes de entrar</small></div>
        </article>
        <article className="r4-card">
          <span className="r4-card-eyebrow">QUÉ CAMBIA</span>
          <h3>El beneficio viaja con el link</h3>
          <p className="r4-body">Quien invita no explica códigos y su amigo no tiene que copiarlos. El enlace abre una experiencia donde el descuento ya está aplicado.</p>
          <div className="r4-explain-strip"><strong>Link personal</strong><span>→</span><strong>$8 de descuento</strong><span>→</span><strong>primer café</strong></div>
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
  const whatsapp = `https://wa.me/?text=${encodeURIComponent("Te quiero regalar $8 de descuento en tu primer café de Tueste ☕ https://" + link)}`;
  return (
    <>
      <PageHeading eyebrow="02 · INVITAR" title="Comparte tu regalo" subtitle="El cliente que ya compró recibe un link personal; su amigo recibe $8 de descuento en su primer café." />
      <section className="r4-invite-grid r4-invite-main">
        <article className="r4-card r4-invite-card">
          <span className="r4-card-eyebrow">TU LINK PERSONAL</span>
          <h2>Tu amigo recibe $8 de descuento</h2>
          <p>El beneficio se aplica automáticamente al entrar desde tu enlace. Tú no tienes que explicar códigos ni condiciones.</p>
          <div className="r4-link-box"><span>{link}</span><button onClick={copy}>{copied ? <><Check size={16}/> Copiado</> : <><Copy size={16}/> Copiar</>}</button></div>
          <a className="r4-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Compartir por WhatsApp</a>
          <div className="r4-share-steps">
            <div><b>1</b><span><strong>Tú compartes</strong> tu enlace personal con un amigo.</span></div>
            <div><b>2</b><span><strong>Tu amigo entra</strong> y recibe $8 de descuento en su primer café.</span></div>
            <div><b>3</b><span><strong>Compra</strong> y tu progreso avanza hacia la siguiente recompensa.</span></div>
          </div>
        </article>
        <article className="r4-card r4-phone-card">
          <span className="r4-card-eyebrow">LO QUE VE TU AMIGO</span>
          <div className="r4-coupon">
            <div className="r4-coupon-top"><span>TUESTE · INVITACIÓN DE SOFÍA</span><Gift size={18}/></div>
            <div className="r4-coupon-value"><small>REGALO DE BIENVENIDA</small><strong>$8</strong><span>DE DESCUENTO</span></div>
            <h3>Tu primer café tiene un regalo.</h3>
            <p>El descuento ya está aplicado a tu primer pedido. Solo elige tu café.</p>
            <button>Elegir mi café <span>→</span></button>
            <small className="r4-coupon-note">Sin código · beneficio aplicado desde el link</small>
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
      <PageHeading eyebrow="04 · PROGRESO" title="Mi progreso" subtitle="Aquí el cliente entiende qué recompensa ya ganó, qué recibe en cada meta y qué le falta para desbloquear la siguiente." />
      <section className="r4-progress-hero r4-card">
        <div><span className="r4-card-eyebrow">TU PROGRESO</span><h2>2 amigos ya compraron</h2><p>Te falta 1 compra para completar 3 referidos y desbloquear un <strong>bono de $6</strong>.</p><div className="r4-progress-bar"><span style={{width:"66.7%"}}/></div><small className="r4-progress-help">2 de 3 compras confirmadas · 1 pendiente</small></div>
        <div className="r4-progress-ring"><strong>2/3</strong><span>compras</span></div>
      </section>
      <section className="r4-rewards">
        {rewards.map((r,i) => <article className={`r4-reward ${i===1 ? "current" : ""}`} key={r.title}>
          <div className="r4-reward-top"><span>{r.title}</span>{i===1 && <b>Tu siguiente meta</b>}</div>
          <h3>{r.friend}</h3>
          <div className="r4-reward-who"><div><span>Tu amigo recibe</span><strong>$8 de descuento</strong><small>en su primer café</small></div><div><span>Tú recibes</span><strong>{r.owner}</strong><small>{i===0 ? "al completar 1 compra" : i===1 ? "al completar 3 compras" : "si tu amigo se suscribe"}</small></div></div>
          <div className="r4-cost"><span>Costo total estimado para Tueste</span><strong>{r.cost}</strong></div>
          <small>{r.detail}</small>
        </article>)}
      </section>
      <section className="r4-progress-explain">
        <div><span className="r4-card-eyebrow">CÓMO LEERLO</span><strong>Tu progreso mide compras, no solo invitaciones.</strong><p>Cuando un amigo compra desde tu enlace, avanzas una meta. El descuento de $8 es para tu amigo; el premio de 100 g, bono de $6 o mes gratis es para quien invitó. El costo de Tueste suma ambos beneficios.</p></div>
        <div className="r4-progress-target"><b>Meta del programa</b><strong>6 → 9</strong><span>referidos por cada 100 compradores</span></div>
      </section>
    </>
  );
}

function Diego() {
  const funnel = [
    ["Correo recibido","1.000","—","Todos los compradores que reciben la comunicación."],
    ["Correo abierto","350","35,0 %","Personas que vieron el mensaje."],
    ["Entra al programa","120","34,3 %","Personas que hicieron clic y aceptaron participar."],
    ["Invita","100","83,3 %","Clientes que efectivamente compartieron su enlace."],
    ["Invitaciones enviadas","300","3 por persona","Promedio de tres invitaciones por cliente que invita."],
    ["Abre tienda","150","50,0 %","Amigos que llegaron a la tienda desde una invitación."],
    ["Compra","60","40,0 %","Amigos que terminaron comprando."],
  ];
  const [selected, setSelected] = useState(6);
  const item = funnel[selected];
  return (
    <>
      <PageHeading eyebrow="05 · PANEL" title="Panel de Diego" subtitle="El embudo convierte los números del caso en una lectura simple: dónde se pierde gente, qué debemos mejorar y qué meta perseguimos." />
      <section className="r4-kpis r4-diego-kpis">
        <article><span>Clientes compradores</span><strong>60</strong><small>de 1.000 compradores iniciales</small></article>
        <article><span>Conversión tienda → compra</span><strong>40 %</strong><small>150 amigos → 60 compras</small></article>
        <article><span>Referidos / 100 compradores</span><strong>6</strong><small>meta: llegar a 9</small></article>
        <article><span>Costo máximo</span><strong>$25</strong><small>por cliente referido</small></article>
      </section>
      <section className="r4-card r4-diego-funnel-card">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">EMBUDO SIMULADO</span><h3>1.000 compradores → 60 compras referidas</h3></div><BarChart3 size={20}/></div>
        <div className="r4-funnel">
          {funnel.map(([label,val,rate],i)=><button className={`r4-funnel-row ${selected===i ? "selected" : ""}`} key={label} onClick={()=>setSelected(i)}>
            <span>{label}</span><div><b style={{width:`${Math.max(18,(Number(val)/1000)*100)}%`}}>{val}</b></div><small>{rate}</small>
          </button>)}
        </div>
        <div className="r4-funnel-detail"><span className="r4-card-eyebrow">¿QUÉ SIGNIFICA?</span><strong>{item[0]} · {item[1]}</strong><p>{item[3]} {item[2] !== "—" && `La conversión mostrada es ${item[2]}.`}</p></div>
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
  const phases = [
    ["0–30 días","Activar el momento correcto","El objetivo es mover la invitación al momento en que llega el café, cuando la satisfacción está fresca.","Lanzar link personal + WhatsApp listo.","180 entradas al programa / 1.000 compradores."],
    ["31–60 días","Optimizar el ciclo","Ahora medimos qué parte del recorrido necesita ajuste: apertura, invitación, entrada a tienda o compra.","A/B test: invitar al llegar vs. día siguiente.","Subir conversión tienda → compra de 40 % a 50 %."],
    ["61–90 días","Escalar lo que funciona","Solo escalamos el recorrido que demostró funcionar sin aumentar las bajas ni superar el costo máximo.","Promover en email, WhatsApp y postcompra; Meta sigue como apoyo.","Llegar a 9 referidos / 100 compradores."],
  ];
  const [phase, setPhase] = useState(0);
  const current = phases[phase];
  return (
    <>
      <PageHeading eyebrow="06 · 90 DÍAS" title="Plan de crecimiento" subtitle="Un plan en tres etapas: activar, aprender y escalar. Usa los referidos para reducir la dependencia de adquisición pagada." />
      <section className="r4-plan-presenter">
        <div className="r4-plan-progress"><span>ETAPA {phase + 1} DE 3</span><div><i className={phase >= 0 ? "on" : ""}/><i className={phase >= 1 ? "on" : ""}/><i className={phase >= 2 ? "on" : ""}/></div></div>
        <button className="r4-plan-arrow left" onClick={()=>setPhase(Math.max(0, phase-1))} disabled={phase===0} aria-label="Etapa anterior">←</button>
        <article className="r4-plan-main">
          <span className="r4-plan-days">{current[0]}</span>
          <h2>{current[1]}</h2>
          <p>{current[2]}</p>
          <div className="r4-plan-action"><span>QUÉ HACEMOS</span><strong>{current[3]}</strong></div>
          <div className="r4-plan-success"><span>SE CONSIDERA ÉXITO SI...</span><strong>{current[4]}</strong></div>
        </article>
        <button className="r4-plan-arrow right" onClick={()=>setPhase(Math.min(2, phase+1))} disabled={phase===2} aria-label="Siguiente etapa">→</button>
        <div className="r4-plan-tabs">{phases.map((x,i)=><button key={x[0]} className={i===phase ? "active" : ""} onClick={()=>setPhase(i)}><b>{i+1}</b><span>{x[0]}</span><small>{x[1]}</small></button>)}</div>
      </section>
      <section className="r4-card r4-experiment">
        <div className="r4-card-title"><div><span className="r4-card-eyebrow">EXPERIMENTO A / B</span><h3>¿Invitar al llegar el café o al día siguiente?</h3></div><FlaskConical size={20}/></div>
        <p className="r4-hypothesis"><strong>Hipótesis:</strong> si mostramos la invitación cuando llega el café, aumentaremos las entradas al programa de 120 a 180 por cada 1.000 compradores.</p>
        <div className="r4-experiment-grid">
          <div><span>Qué cambiamos</span><strong>Momento del mensaje</strong><small>Al llegar el café vs. día siguiente al pago</small></div>
          <div><span>Qué medimos</span><strong>Entradas + compras</strong><small>120 → 180 entradas y 6 → 9 referidos / 100</small></div>
          <div><span>Qué no debe empeorar</span><strong>Bajas de emails</strong><small>La adquisición mejora sin dañar la relación con clientes.</small></div>
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
