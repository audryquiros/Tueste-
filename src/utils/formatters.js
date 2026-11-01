export const money = (value) =>
  Number.isFinite(value)
    ? value.toLocaleString("es-CR", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
    : "No disponible";

export const number = (value, digits = 2) =>
  Number.isFinite(value)
    ? value.toLocaleString("es-CR", { maximumFractionDigits: digits })
    : "No disponible";

export const ratio = (value) =>
  Number.isFinite(value) ? `${value.toLocaleString("es-CR", { maximumFractionDigits: 2 })}x` : "No disponible";

export const percent = (value) =>
  Number.isFinite(value) ? `${(value * 100).toLocaleString("es-CR", { maximumFractionDigits: 1 })}%` : "No disponible";
