import assert from "node:assert/strict";
import { estimateMetaCustomers, getReferencePlans, simulatePlan } from "../src/services/simulationModel.js";

const closeTo = (actual, expected, tolerance = 0.02) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Esperado ${expected}, recibido ${actual}`);
};

// Historial del caso e interpolación lineal.
closeTo(estimateMetaCustomers(0), 0);
closeTo(estimateMetaCustomers(4000), 100);
closeTo(estimateMetaCustomers(6000), 132.5);
closeTo(estimateMetaCustomers(8000), 165);
closeTo(estimateMetaCustomers(10000), 187.5);
closeTo(estimateMetaCustomers(12000), 210);
closeTo(estimateMetaCustomers(16000), 235);
closeTo(estimateMetaCustomers(20000), 250);

const plans = getReferencePlans();
assert.equal(plans.length, 4, "Deben existir al menos cuatro planes de referencia.");
const byKey = Object.fromEntries(plans.map((plan) => [plan.key, plan]));

// Revisión manual obligatoria: mes 1 del plan de USD 8.000.
closeTo(byKey["fixed-8000"].rows[0].metaCustomers, 165);
closeTo(byKey["fixed-8000"].rows[0].newCustomers, 212);
closeTo(byKey["fixed-8000"].rows[0].newCohortContribution, 3265.4254);
closeTo(byKey["fixed-8000"].rows[0].outflows, 15500);
closeTo(byKey["fixed-8000"].rows[0].closingCash, 31765.4254);

// Resultados de referencia para la tabla comparativa.
closeTo(byKey["fixed-8000"].minimumCash, 24447.5099);
assert.equal(byKey["fixed-8000"].minimumCashMonth, 6);
closeTo(byKey["fixed-8000"].endingCash, 79596.4527);
closeTo(byKey["fixed-8000"].activeSubscribers, 316.5900);

closeTo(byKey["agency-16000"].endingCash, -82255.1883);
assert.equal(byKey["agency-16000"].safe, false);
closeTo(byKey["own-4000"].minimumCash, 34764.2337);
assert.equal(byKey["own-4000"].minimumCashMonth, 1);
closeTo(byKey["own-4000"].endingCash, 95566.2393);
closeTo(byKey["own-staged"].endingCash, 89578.5797);

// Regla del promedio: desde el mes 13 no se puede invertir menos que el promedio de los meses 1–12.
const invalidPlan = simulatePlan({
  name: "Prueba de regla",
  investments: [...Array(12).fill(8000), ...Array(12).fill(7000)],
});
assert.equal(invalidPlan.ruleBreaches, 12);
assert.equal(invalidPlan.safe, false);

// La proyección debe contener exactamente 24 filas y alertar cuando se rompe el piso.
assert.equal(byKey["fixed-8000"].rows.length, 24);
assert.equal(byKey["agency-16000"].floorBreaches > 0, true);
assert.equal(byKey["own-4000"].safe, true);

console.log("OK: modelo de 24 meses validado.");
console.log("OK: interpolación histórica, mes 1, cuatro escenarios, piso de caja y regla del promedio.");
console.log("Referencia: plan USD 8.000 -> mes 1 USD 31.765,43; plan USD 4.000 -> mes 24 USD 95.566,24.");
