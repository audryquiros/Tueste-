import { useState } from "react";
import { ArrowRight, Check, Gift, Link2, MessageCircle, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import "./ReferralPrototype.css";

const screens = [
  {
    label: "1 · INVITAR",
    kicker: "Tueste",
    title: "Tienes un regalo para compartir",
    body: "Tu amigo recibe $8 en su primer café. El link ya lleva el beneficio aplicado.",
    cta: "Compartir invitación",
    icon: Gift,
  },
  {
    label: "2 · WHATSAPP",
    kicker: "Mensaje listo",
    title: "Te quiero regalar $8 ☕",
    body: "Solo eliges el contacto y envías. No hay códigos que copiar ni explicar.",
    cta: "Enviar por WhatsApp",
    icon: MessageCircle,
  },
  {
    label: "3 · AMIGO",
    kicker: "Invitación de Sofía",
    title: "Tu primer café tiene un regalo",
    body: "El descuento ya está aplicado a tu primer pedido.",
    cta: "Elegir mi café",
    icon: Gift,
  },
  {
    label: "4 · COMPRA",
    kicker: "Pedido listo",
    title: "Tu descuento se aplicó",
    body: "Café seleccionado · Descuento de referido −$8 · Total $22",
    cta: "Confirmar compra",
    icon: ShoppingBag,
  },
  {
    label: "5 · RECOMPENSA",
    kicker: "¡Tu referido compró!",
    title: "Ganaste una recompensa",
    body: "Tu progreso pasó a 3 de 3 amigos. El bono de $6 está desbloqueado.",
    cta: "Ver mi progreso",
    icon: Sparkles,
  },
];

export default function ReferralPrototype() {
  const [step, setStep] = useState(0);
  const current = screens[step];
  const Icon = current.icon;

  const next = () => setStep((value) => Math.min(value + 1, screens.length - 1));
  const reset = () => setStep(0);

  return (
    <section className="ref-prototype">
      <div className="ref-prototype-info">
        <span className="r4-card-eyebrow">PROTOTIPO INTERACTIVO</span>
        <h2>Así se vive la invitación de principio a fin</h2>
        <p>Este recorrido simula lo que vería el cliente. Cambia de pantalla para demostrar cómo una invitación pasa de un link personal a una compra y termina en una recompensa.</p>

        <div className="ref-prototype-steps" role="tablist" aria-label="Pasos del prototipo">
          {screens.map((item, index) => (
            <button
              key={item.label}
              className={index === step ? "active" : ""}
              onClick={() => setStep(index)}
              type="button"
            >
              <b>{index + 1}</b>
              <span>{item.label.split(" · ")[1]}</span>
            </button>
          ))}
        </div>

        <div className="ref-prototype-note">
          <Link2 size={18} />
          <div>
            <strong>La idea clave</strong>
            <p>El cliente no tiene que recordar un código: el beneficio viaja con el link y el momento de invitación coincide con la llegada del café.</p>
          </div>
        </div>
      </div>

      <div className="ref-phone-wrap">
        <div className="ref-phone-frame">
          <div className="ref-phone-notch" />
          <div className="ref-phone-screen">
            <div className="ref-phone-status"><span>9:41</span><span>● ● ●</span></div>
            <div className="ref-phone-appbar">
              <span>TUESTE</span>
              <small>{current.label}</small>
            </div>
            <div className="ref-phone-content">
              <div className="ref-phone-icon"><Icon size={25} /></div>
              <span className="ref-phone-kicker">{current.kicker}</span>
              <h3>{current.title}</h3>
              <p>{current.body}</p>

              {step === 1 && (
                <div className="ref-whatsapp-preview">
                  <span>WhatsApp</span>
                  <strong>Te quiero regalar $8 en tu primer café de Tueste ☕</strong>
                  <small>tueste.cr/invita/sofia-82</small>
                </div>
              )}

              {step === 3 && (
                <div className="ref-order-preview">
                  <span>Café de especialidad</span>
                  <b>$30</b>
                  <span>Descuento referido</span>
                  <b className="discount">− $8</b>
                  <hr />
                  <span>Total</span>
                  <strong>$22</strong>
                </div>
              )}

              {step === 4 && (
                <div className="ref-success">
                  <Check size={18} />
                  <span>3 de 3 amigos compraron</span>
                </div>
              )}

              <button className="ref-phone-cta" type="button" onClick={next} disabled={step === screens.length - 1}>
                {step === screens.length - 1 ? "Recompensa desbloqueada" : current.cta}
                {step < screens.length - 1 && <ArrowRight size={14} />}
              </button>

              {step === screens.length - 1 ? (
                <button className="ref-reset" type="button" onClick={reset}><RotateCcw size={12} /> Reiniciar recorrido</button>
              ) : (
                <small className="ref-phone-hint">Paso {step + 1} de {screens.length}</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
