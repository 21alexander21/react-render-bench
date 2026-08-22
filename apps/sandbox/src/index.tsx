import { createRoot } from "react-dom/client";

import { getVerifiedSandboxMetadata } from "./profiling.tsx";
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
const metadata = getVerifiedSandboxMetadata();

createRoot(rootElement).render(
  <main>
    <p className="eyebrow">{copy.eyebrow}</p>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
    <p className="metadata">
      React {metadata.reactVersion} ·{" "}
      {metadata.profilingBuild ? "profiling build" : "standard build"}
    </p>
  </main>,
);
