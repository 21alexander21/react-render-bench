import { createRoot } from "react-dom/client";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLElement)) {
  throw new Error("Shell root element is missing.");
}

const copy = {
  description: "The benchmark controls and results will live here.",
  eyebrow: "React Render Bench",
  title: "Hello from the shell",
};

createRoot(rootElement).render(
  <main>
    <p className="eyebrow">{copy.eyebrow}</p>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
  </main>,
);
