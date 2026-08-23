import { createRoot } from "react-dom/client";

import { Shell } from "./shell.tsx";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLElement)) {
  throw new Error("Shell root element is missing.");
}

createRoot(rootElement).render(<Shell />);
