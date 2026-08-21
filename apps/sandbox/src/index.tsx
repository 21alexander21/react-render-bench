import { createRoot } from "react-dom/client";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLElement)) {
  throw new Error("Sandbox root element is missing.");
}

const copy = {
  description: "Benchmark subjects will run here.",
  eyebrow: "Isolated runtime",
  title: "Hello from the sandbox",
};

createRoot(rootElement).render(
  <main>
    <p className="eyebrow">{copy.eyebrow}</p>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
  </main>,
);
