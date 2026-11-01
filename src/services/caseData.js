// Datos de referencia centralizados. Revisar contra el documento original del caso.
export const DEFAULT_INPUTS = {
  investment: 8000,
  bagPrice: 17,
  coffeeCost: 5.44,
  shipping: 4.5,
  subscriberMix: 15,
  churn: 9,
  looseOrders: 3,
  agencyFee: 1000,
  discount: 0,
};

export const CASE_DATA = {
  history: [
    { investment: 0, clients: 0 },
    { investment: 4000, clients: 100 },
    { investment: 8000, clients: 165 },
    { investment: 12000, clients: 210 },
    { investment: 16000, clients: 235 },
    { investment: 20000, clients: 250 },
  ],
  looseOrderPattern: [1, 0.15, 0.2, 0.2, 0.2, 0.2, 0.2, 0.15, 0.15, 0.15, 0.2, 0.2],
  fixed: {
    bagsPerOrder: 2,
    subscriptionDiscount: 0.1,
    paymentFee: 0.045,
    packaging: 1.2,
    subscriptionPrice: 30.6,
    metaReportedROAS: 3,
    firstOrderRevenueAssumption: 34,
    attributedPurchases: 706,
    metaAttributedSales: 24000,
    shopifySales: 28000,
  },
  scenarios: [
    { key: "today", label: "Hoy", investment: 8000, fee: 1000, discount: 0 },
    { key: "agency", label: "Agencia", investment: 16000, fee: 1000, discount: 30 },
    { key: "alternative", label: "Alternativa propia", investment: 4000, fee: 0, discount: 0 },
  ],
};
