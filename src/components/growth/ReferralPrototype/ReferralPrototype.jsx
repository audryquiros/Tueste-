import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
import { ArrowRight, Check, Gift, Link2, MessageCircle, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import "./ReferralPrototype.css";

const screens = [
  { label: "1 · INVITAR", role: "CLIENTE DE TUESTE", kicker: "Tueste · Sofía", title: "Recibes tu café y aparece la invitación", body: "Ya recibiste tu café. Este es el momento natural para invitar: tu amigo recibirá $8 de descuento en su primer café.", cta: "Compartir invitación", icon: Gift },
  { label: "2 · WHATSAPP", role: "CLIENTE DE TUESTE", kicker: "WhatsApp · Sofía", title: "El mensaje queda listo para enviar", body: "Tú solo eliges a tu amigo. El enlace personal lleva el descuento de $8 aplicado para su primer café.", cta: "Enviar por WhatsApp", icon: MessageCircle },
  { label: "3 · AMIGO", role: "AMIGO REFERIDO", kicker: "WhatsApp · Sofía", title: "Te llegó un regalo para tu primer café", body: "Sofía te compartió un enlace. Al abrirlo, tienes $8 de descuento aplicados a tu primer café, sin copiar ningún código.", cta: "Elegir mi café", icon: Gift },
  { label: "4 · COMPRA", role: "AMIGO REFERIDO", kicker: "Tu pedido", title: "Tu descuento se aplicó", body: "Elegiste tu café y el descuento de referido ya aparece en el pedido: pagas $22 en lugar de $30.", cta: "Confirmar compra", icon: ShoppingBag },
  { label: "5 · RECOMPENSA", role: "CLIENTE DE TUESTE", kicker: "Tueste · Sofía", title: "Tu amigo compró y desbloqueaste tu bono", body: "La compra de tu amigo queda registrada. Con 3 de 3 referidos, desbloqueas un bono de $6.", cta: "Ver mi progreso", icon: Sparkles },
];

export default function ReferralPrototype() {
  const [step, setStep] = useState(0);
  const current = screens[step];
  const Icon = current.icon;
  const friendView = step === 2 || step === 3;
  const prototypeRef = useRef(null);
  const infoRef = useRef(null);
  const phoneRef = useRef(null);
  const flipStateRef = useRef(null);

  useLayoutEffect(() => {
    if (!prototypeRef.current || !infoRef.current || !phoneRef.current) return;

    if (flipStateRef.current) {
      const state = flipStateRef.current;
      flipStateRef.current = null;
      prototypeRef.current.classList.toggle("friend-view", friendView);
      Flip.from(state, {
        duration: 0.42,
        ease: "power3.inOut",
        nested: true,
        scale: false,
        absolute: false,
        onComplete: () => gsap.set([infoRef.current, phoneRef.current], { clearProps: "transform" }),
      });
    }

    gsap.fromTo(phoneRef.current,
      { opacity: 0.84, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.24, ease: "power2.out", overwrite: true }
    );
  }, [step, friendView]);

  useLayoutEffect(() => {
    if (prototypeRef.current) prototypeRef.current.classList.toggle("friend-view", friendView);
  }, []);

  const goToStep = (index) => {
    const nextStep = Math.max(0, Math.min(index, screens.length - 1));
    if (nextStep === step) return;

    const nextFriendView = nextStep === 2 || nextStep === 3;
    if (prototypeRef.current && infoRef.current && phoneRef.current && nextFriendView !== friendView) {
      flipStateRef.current = Flip.getState([infoRef.current, phoneRef.current]);
    }

    setStep(nextStep);
  };
  const next = () => goToStep(step + 1);
  const reset = () => goToStep(0);

  return (
    <section ref={prototypeRef} className={`ref-prototype owner-view step-${step + 1}`}>
      <div ref={infoRef} className="ref-prototype-info">
        <span className="r4-card-eyebrow">PROTOTIPO INTERACTIVO</span>
        <h2>Así se vive la invitación de principio a fin</h2>
        <p>El recorrido cambia de protagonista: los pasos 1 y 2 los vive quien ya compró en Tueste; los pasos 3 y 4 los vive su amigo; el paso 5 vuelve a quien invitó.</p>
        <div className="ref-role-switch"><span className={step < 2 ? "active" : ""}>Tú · cliente de Tueste</span><span className={friendView ? "active friend" : ""}>Tu amigo · referido</span><span className={step === 4 ? "active" : ""}>Tú · recompensa</span></div>

        <div className="ref-prototype-steps" role="tablist" aria-label="Pasos del prototipo">
          {screens.map((item, index) => (
            <button key={item.label} className={index === step ? "active" : ""} onClick={() => goToStep(index)} type="button">
              <b>{index + 1}</b><span>{item.label.split(" · ")[1]}</span>
            </button>
          ))}
        </div>

        <div className="ref-prototype-note">
          <Link2 size={18} />
          <div>
            <strong>{friendView ? "Ahora está viendo el amigo" : step === 4 ? "La recompensa vuelve a quien invitó" : "La idea clave"}</strong>
            <p>{friendView ? "El teléfono cambia de lado para mostrar que la experiencia ya no la vive Sofía. El amigo recibe un mensaje de WhatsApp y entra con el $8 aplicado." : step === 4 ? "La compra del amigo vuelve al perfil de Sofía y actualiza su progreso hasta el siguiente beneficio." : "El cliente no recuerda códigos: comparte un enlace personal y el beneficio aparece aplicado en el momento correcto."}</p>
          </div>
        </div>
      </div>

      <div ref={phoneRef} className="ref-phone-wrap">
        <div className="ref-phone-frame">
          <div className="ref-phone-notch" />
          <div className="ref-phone-screen">
            <div className="ref-phone-status"><span>9:41</span><span>● ● ●</span></div>
            <div className="ref-phone-appbar"><span>TUESTE</span><small>{current.role}</small></div>
            <div className="ref-phone-content">
              {step === 2 && <div className="ref-incoming-message"><MessageCircle size={12}/><span>Nuevo mensaje de WhatsApp</span></div>}
              <div className="ref-phone-icon"><Icon size={25} /></div>
              <span className="ref-phone-kicker">{current.kicker}</span>
              <h3>{current.title}</h3>
              <p>{current.body}</p>

              {step === 1 && (
                <div className="ref-whatsapp-preview">
                  <span>WHATSAPP · MENSAJE LISTO</span>
                  <strong>“Te quiero regalar $8 de descuento en tu primer café de Tueste ☕”</strong>
                  <small>tueste.cr/invita/sofia-82</small>
                </div>
              )}

              {step === 2 && (
                <div className="ref-chat-preview">
                  <div className="ref-chat-bubble">Te quiero regalar <strong>$8 de descuento</strong> en tu primer café de Tueste ☕<small>9:41 ✓✓</small></div>
                  <div className="ref-chat-link">tueste.cr/invita/sofia-82</div>
                </div>
              )}

              {step === 3 && (
                <div className="ref-order-preview"><span>Café de especialidad</span><b>$30</b><span>Descuento de referido</span><b className="discount">− $8</b><hr /><span>Total</span><strong>$22</strong></div>
              )}

              {step === 4 && (
                <div className="ref-success"><Check size={18} /><span>3 de 3 amigos compraron · bono de $6</span></div>
              )}

              <button className="ref-phone-cta" type="button" onClick={next} disabled={step === screens.length - 1}>
                {step === screens.length - 1 ? "Bono de $6 desbloqueado" : current.cta}
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
