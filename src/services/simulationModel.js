import { CASE_DATA } from "./caseData.js";

export const SIMULATION_DEFAULTS = {
  startCash: 35000,
  cashFloor: 5000,
  fixedCosts: 6500,
  currentCustomerContribution: 9000,
  existingCustomerDecline: 0.03,
  organicCustomers: 47,
  agencyFee: 1000,
  months: 24,
};

const looseOrdersByAge = [
  ...CASE_DATA.looseOrderPattern,
  ...Array(12).fill(0.1),
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));

export function estimateMetaCustomers(investment) {
  const amount = clamp(investment, 0, 20000);
  const points = CASE_DATA.history;
  for (let i = 1; i < points.length; i += 1) {
    const left = points[i - 1];
    const right = points[i];
    if (amount <= right.investment) {
      const ratio = (amount - left.investment) / (right.investment - left.investment);
      return left.clients + ratio * (right.clients - left.clients);
    }
  }
  return points.at(-1).clients;
}

export function getLooseOrderContribution(discount = 0) {
  const revenue = 34 * (1 - discount);
  return revenue - 10.88 - 4.5 - revenue * 0.045 - 1.2;
}

export function getSubscriptionContribution() {
  return 30.6 - 10.88 - 4.5 - 30.6 * 0.045 - 1.2;
}

export function simulatePlan({
  name,
  investments,
  discountFirstOrder = false,
  agencyFee = SIMULATION_DEFAULTS.agencyFee,
}) {
  const schedule = Array.from({ length: 24 }, (_, index) =>
    clamp(investments[index] ?? investments.at(-1) ?? 0, 0, 20000)
  );
  const averageFirstYear = schedule.slice(0, 12).reduce((sum, value) => sum + value, 0) / 12;
  const rows = [];
  const cohorts = [];
  let cash = SIMULATION_DEFAULTS.startCash;
  let minimumCash = cash;
  let minimumCashMonth = 0;

  for (let month = 1; month <= 24; month += 1) {
    const investment = schedule[month - 1];
    const metaCustomers = estimateMetaCustomers(investment);
    const newCustomers = metaCustomers + SIMULATION_DEFAULTS.organicCustomers;
    cohorts.push({ arrivalMonth: month, customers: newCustomers });

    const existingContribution =
      SIMULATION_DEFAULTS.currentCustomerContribution *
      (1 - SIMULATION_DEFAULTS.existingCustomerDecline) ** (month - 1);

    let newCohortContribution = 0;
    let activeSubscribers = 0;
    for (const cohort of cohorts) {
      const age = month - cohort.arrivalMonth + 1;
      const looseOrders = looseOrdersByAge[age - 1] ?? 0.1;
      const looseContribution = age === 1 && discountFirstOrder
        ? getLooseOrderContribution(0.3)
        : getLooseOrderContribution(0);
      const looseCustomers = cohort.customers * 0.85;
      const subscriberCohort = cohort.customers * 0.15;
      const activeSubscriberCohort =
        subscriberCohort * 0.91 ** (age - 1);

      newCohortContribution +=
        looseCustomers * looseOrders * looseContribution +
        activeSubscriberCohort * getSubscriptionContribution();
      activeSubscribers += activeSubscriberCohort;
    }

    const agencyOutflow = investment > 0 ? agencyFee : 0;
    const outflows = investment + agencyOutflow + SIMULATION_DEFAULTS.fixedCosts;
    const openingCash = cash;
    const closingCash = openingCash + existingContribution + newCohortContribution - outflows;
    const belowFloor = closingCash < SIMULATION_DEFAULTS.cashFloor;

    cash = closingCash;
    if (cash < minimumCash) {
      minimumCash = cash;
      minimumCashMonth = month;
    }

    rows.push({
      month,
      investment,
      metaCustomers,
      organicCustomers: SIMULATION_DEFAULTS.organicCustomers,
      newCustomers,
      existingContribution,
      newCohortContribution,
      totalContribution: existingContribution + newCohortContribution,
      agencyOutflow,
      fixedCosts: SIMULATION_DEFAULTS.fixedCosts,
      outflows,
      openingCash,
      closingCash,
      activeSubscribers,
      belowFloor,
      averageFirstYear,
      investmentRuleViolation: month >= 13 && investment + 0.005 < averageFirstYear,
    });
  }

  const ending = rows.at(-1);
  return {
    name,
    rows,
    endingCash: ending.closingCash,
    minimumCash,
    minimumCashMonth,
    activeSubscribers: ending.activeSubscribers,
    averageFirstYear,
    safe: rows.every((row) => !row.belowFloor && !row.investmentRuleViolation),
    floorBreaches: rows.filter((row) => row.belowFloor).length,
    ruleBreaches: rows.filter((row) => row.investmentRuleViolation).length,
    discountFirstOrder,
  };
}

export function getReferencePlans() {
  return [
    {
      key: "fixed-8000",
      name: "Hoy · $8.000 fijos",
      type: "Referencia",
      investments: Array(24).fill(8000),
      agencyFee: 1000,
    },
    {
      key: "agency-16000",
      name: "Agencia · $16.000 fijos",
      type: "Propuesta agencia",
      investments: Array(24).fill(16000),
      agencyFee: 1000,
      discountFirstOrder: true,
    },
    {
      key: "own-4000",
      name: "Propio · $4.000 fijos",
      type: "Plan propio A",
      investments: Array(24).fill(4000),
      agencyFee: 1000,
    },
    {
      key: "own-staged",
      name: "Propio · escalonado",
      type: "Plan propio B",
      investments: [
        ...Array(6).fill(8000),
        ...Array(6).fill(4000),
        ...Array(12).fill(6000),
      ],
      agencyFee: 1000,
    },
  ].map((plan) => ({
    ...simulatePlan(plan),
    key: plan.key,
    type: plan.type,
  }));
}
