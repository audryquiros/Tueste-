import { Copy, Check } from "lucide-react";
import { useState } from "react";
import "./InvestorPitch.css";
const usd=(v)=>new Intl.NumberFormat("es-CR",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(v);
export default function InvestorPitch({ plan }) {
 const [copied,setCopied]=useState(false);
 const text=`Diego, proponemos invertir con un plan propio y controlado. La estrategia ${plan.name} termina el mes 24 con ${usd(plan.endingCash)} en caja y su caja mínima es ${usd(plan.minimumCash)} en el mes ${plan.minimumCashMonth}. El riesgo principal es que la adquisición real sea menor a la estimada por el historial o que la contribución de las cohortes no se comporte como el modelo. Mantendremos la inversión por encima del promedio del primer año desde el mes 13 y nunca permitiremos que la caja baje de USD 5.000. Solo aumentaremos el presupuesto si durante tres meses consecutivos la caja proyectada se mantiene sobre USD 10.000, el CAC marginal está cubierto por la contribución esperada y la adquisición observada confirma la interpolación histórica.`;
 const copy=async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}};
 return <section className="sim-pitch-card"><div className="sim-pitch-head"><div><span className="sim-eyebrow">PITCH · 2 MINUTOS</span><h2>La propuesta para el inversionista</h2></div><button className="sim-ghost-button" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"Copiado":"Copiar pitch"}</button></div><p>{text}</p><div className="sim-pitch-foot">El pitch se actualiza al seleccionar otro plan.</div></section>;
}
