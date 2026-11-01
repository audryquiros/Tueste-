import { CASE_DATA } from "./caseData";

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));

export function estimateNewCustomers(investment) {
  const points = CASE_DATA.history;
  const x = clamp(investment, 0, 20000);
  for (let i = 1; i < points.length; i += 1) {
    if (x <= points[i].investment) {
      const left = points[i - 1];
      const right = points[i];
      const t = (x - left.investment) / (right.investment - left.investment);
      return left.clients + t * (right.clients - left.clients);
    }
  }
  return points.at(-1).clients;
}

export function getMarginalCAC(investment) {
  const points = CASE_DATA.history;
  const x = clamp(investment, 0, 20000);
  if (x <= 0) return null;
  for (let i = 1; i < points.length; i += 1) {
    if (x <= points[i].investment) {
      const left = points[i - 1];
      const right = points[i];
      return (right.investment - left.investment) / (right.clients - left.clients);
    }
  }
  return null;
}

export function calculateModel(input) {
  const p = {
    investment: clamp(input.investment, 0, 20000),
    bagPrice: clamp(input.bagPrice, 1, 100),
    coffeeCost: clamp(input.coffeeCost, 0, 50),
    shipping: clamp(input.shipping, 0, 50),
    subscriberMix: clamp(input.subscriberMix, 0, 100) / 100,
    churn: clamp(input.churn, 0, 50) / 100,
    looseOrders: clamp(input.looseOrders, 1, 8),
    agencyFee: clamp(input.agencyFee, 0, 10000),
    discount: clamp(input.discount, 0, 50) / 100,
  };

  const fixed = CASE_DATA.fixed;
  const looseMix = 1 - p.subscriberMix;
  const orderRevenue = p.bagPrice * fixed.bagsPerOrder;
  const coffeeCostPerOrder = p.coffeeCost * fixed.bagsPerOrder;
  const subscriptionRevenue = fixed.subscriptionPrice;

  const contribution = (revenue) =>
    revenue - coffeeCostPerOrder - p.shipping - revenue * fixed.paymentFee - fixed.packaging;

  const looseFirstContribution = contribution(orderRevenue * (1 - p.discount));
  const looseContribution = contribution(orderRevenue);
  const subscriptionContribution = contribution(subscriptionRevenue);

  const weightedFirstRevenue =
    looseMix * orderRevenue * (1 - p.discount) + p.subscriberMix * subscriptionRevenue;
  const weightedFirstContribution =
    looseMix * looseFirstContribution + p.subscriberMix * subscriptionContribution;
  const marginRate = weightedFirstRevenue > 0 ? weightedFirstContribution / weightedFirstRevenue : 0;
  const breakEvenROAS = marginRate > 0 ? 1 / marginRate : Infinity;

  // El patrón conserva 1 pedido en el primer mes y distribuye las recompras
  // de los meses 2–12 proporcionalmente al total configurado.
  const pattern = CASE_DATA.looseOrderPattern;
  const repeatTotal = pattern.slice(1).reduce((sum, value) => sum + value, 0);
  const repeatScale = repeatTotal > 0 ? Math.max(0, p.looseOrders - 1) / repeatTotal : 0;
  const looseMonthlyOrders = [1, ...pattern.slice(1).map((value) => value * repeatScale)];

  let subscriberLTV = 0;
  const subscriberMonthly = Array.from({ length: 12 }, (_, month) => {
    const value = subscriptionContribution * (1 - p.churn) ** month;
    subscriberLTV += value;
    return value;
  });

  const looseMonthly = looseMonthlyOrders.map((orders, month) =>
    month === 0 ? looseFirstContribution : looseContribution * orders
  );
  const weightedMonthly = looseMonthly.map(
    (value, month) => value * looseMix + subscriberMonthly[month] * p.subscriberMix
  );

  const looseLTV = looseFirstContribution + looseContribution * Math.max(0, p.looseOrders - 1);
  const ltv = looseMix * looseLTV + p.subscriberMix * subscriberLTV;

  const newCustomers = estimateNewCustomers(p.investment);
  const fee = p.investment > 0 ? p.agencyFee : 0;
  const cacAds = newCustomers > 0 ? p.investment / newCustomers : Infinity;
  const cacReal = newCustomers > 0 ? (p.investment + fee) / newCustomers : Infinity;
  const realFirstOrderROAS =
    p.investment > 0
      ? (newCustomers * fixed.firstOrderRevenueAssumption) / p.investment
      : null;
  const marginalCAC = getMarginalCAC(p.investment);
  const ltvCac = Number.isFinite(cacReal) && cacReal > 0 ? ltv / cacReal : 0;

  let cumulative = -cacReal;
  let payback = null;
  const cashCurve = [{ month: 0, value: cumulative }];
  weightedMonthly.forEach((value, index) => {
    cumulative += value;
    cashCurve.push({ month: index + 1, value: cumulative });
    if (payback === null && cumulative >= 0) payback = index + 1;
  });

  return {
    params: p,
    looseContribution,
    subscriptionContribution,
    weightedFirstContribution,
    marginRate,
    breakEvenROAS,
    ltv,
    looseLTV,
    subscriberLTV,
    cacAds,
    cacReal,
    newCustomers,
    marginalCAC,
    ltvCac,
    realFirstOrderROAS,
    payback,
    cashCurve,
    weightedMonthly,
  };
}

export function calculateScenarios(input) {
  return CASE_DATA.scenarios.map((scenario) => ({
    ...scenario,
    result: calculateModel({
      ...input,
      investment: scenario.investment,
      agencyFee: scenario.fee,
      discount: scenario.discount,
    }),
  }));
}
