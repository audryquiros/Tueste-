import { useState } from "react";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Reto3 from "../pages/Reto3/Reto3";
import Reto4 from "../pages/Reto4/Reto4";

export default function AppRoutes() {
  const [view, setView] = useState("home");

  if (view === "reto2") return <Dashboard onHome={() => setView("home")} />;
  if (view === "reto3") return <Reto3 onHome={() => setView("home")} />;
  if (view === "reto4") return <Reto4 onHome={() => setView("home")} />;

  return <Home onSelect={setView} />;
}
