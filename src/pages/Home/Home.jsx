import { ArrowRight, Coffee, BarChart3, WalletCards, Sparkles } from "lucide-react";
import "./Home.css";

export default function Home({ onSelect }) {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <a className="home-brand" href="#inicio" aria-label="Tueste inicio">
          <span className="home-brand-mark"><Coffee size={23} /></span>
          <span><strong>TUESTE</strong><small>TABLERO FINANCIERO</small></span>
        </a>
        <span className="home-case">CASO A <i /> E-COMMERCE</span>
      </nav>

      <section className="home-hero" id="inicio">
        <div className="home-copy">
          <span className="home-eyebrow"><Sparkles size={14}/> UN CASO, DOS DESAFÍOS</span>
          <h1><span>Las mejores decisiones</span><em>también se construyen.</em></h1>
          <p>Explora el modelo financiero de Tueste, analiza su rentabilidad y descubre qué estrategia puede llevar el negocio más lejos.</p>
        </div>
        <div className="home-art" aria-label="Ilustración abstracta de café">
          <div className="home-art-ring" />
          <div className="home-beans"><span/><span/><span/><span/><span/><span/><span/></div>
          <div className="home-cup"><div className="home-coffee"><span /></div></div>
          <div className="home-art-label">CAFÉ DE<br/>ESPECIALIDAD <b>·</b> TUESTE</div>
        </div>
      </section>

      <section className="home-choices" aria-label="Seleccionar reto">
        <div className="home-scroll-note"><span /> ELIGE POR DÓNDE COMENZAR</div>
        <button className="home-choice choice-two" onClick={() => onSelect("reto2")}>
          <div className="choice-top"><span>NIVEL 02</span><BarChart3 size={22}/></div>
          <h2>El tablero<br/>de Tueste</h2>
          <p>Analiza los indicadores financieros, modifica los supuestos y compara escenarios para tomar una decisión.</p>
          <span className="choice-action">Explorar el tablero <ArrowRight size={17}/></span>
          <span className="choice-number">02</span>
        </button>
        <button className="home-choice choice-three" onClick={() => onSelect("reto3")}>
          <div className="choice-top"><span>NIVEL 03 <small>· BONUS</small></span><WalletCards size={22}/></div>
          <h2>El simulador<br/>de caja</h2>
          <p>Proyecta 24 meses, prueba distintos planes de inversión y encuentra una estrategia que mantenga saludable la caja.</p>
          <span className="choice-action">Explorar el simulador <ArrowRight size={17}/></span>
          <span className="choice-number">03</span>
        </button>
      </section>

      <footer className="home-footer"><span>TUESTE · CASO A</span><span>MODELO FINANCIERO INTERACTIVO</span><span>DECIDIR CON DATOS.</span></footer>
    </main>
  );
}
