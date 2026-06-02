// 优先初始化 Sentry
import * as Sentry from "@sentry/browser";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

Sentry.init({ dsn: "https://fc8ec3054f934ef997a5077f63e88c65@app.glitchtip.com/19628" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);