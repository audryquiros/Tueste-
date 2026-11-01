import { useMemo, useState } from "react";
import { DEFAULT_INPUTS } from "../services/caseData";
import { calculateModel, calculateScenarios } from "../services/financialModel";

export function useFinancialDashboard() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const result = useMemo(() => calculateModel(inputs), [inputs]);
  const scenarios = useMemo(() => calculateScenarios(inputs), [inputs]);

  const updateInput = (key, value) =>
    setInputs((current) => ({ ...current, [key]: Number(value) }));
  const resetInputs = () => setInputs(DEFAULT_INPUTS);

  return { inputs, result, scenarios, updateInput, resetInputs };
}
