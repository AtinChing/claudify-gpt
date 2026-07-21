/**
 * Claudify — Gemini bootstrap
 * Same Claude surfaces/fonts strategy as ChatGPT, tuned for gemini.google.com.
 */
(() => {
  const SANS = '"Claudify Sans", "Source Sans 3", ui-sans-serif, system-ui, sans-serif';
  const SERIF = '"Claudify Serif", "Source Serif 4", Georgia, serif';
  const MONO = '"Claudify Mono", "Source Code Pro", ui-monospace, monospace';

  const root = document.documentElement;
  root.classList.add("claudify-gpt", "claudify-gemini");
  root.dataset.claudify = "gemini";

  function isDark() {
    const body = document.body;
    return (
      root.classList.contains("dark") ||
      root.classList.contains("claudify-dark") ||
      root.hasAttribute("dark") ||
      body?.classList?.contains("dark-theme") ||
      body?.classList?.contains("dark") ||
      getComputedStyle(root).colorScheme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function injectFonts() {
    if (document.getElementById("claudify-fonts")) return;
    const style = document.createElement("style");
    style.id = "claudify-fonts";
    const sans = chrome.runtime.getURL("fonts/source-sans-3.ttf");
    const sansSemi = chrome.runtime.getURL("fonts/source-sans-3-semibold.ttf");
    const serif = chrome.runtime.getURL("fonts/source-serif-4.ttf");
    const serifIt = chrome.runtime.getURL("fonts/source-serif-4-italic.ttf");
    const mono = chrome.runtime.getURL("fonts/source-code-pro.ttf");
    style.textContent = `
      @font-face { font-family: "Claudify Sans"; font-weight: 400; font-display: swap; src: url("${sans}") format("truetype"); }
      @font-face { font-family: "Claudify Sans"; font-weight: 600; font-display: swap; src: url("${sansSemi}") format("truetype"); }
      @font-face { font-family: "Claudify Serif"; font-weight: 400; font-display: swap; src: url("${serif}") format("truetype"); }
      @font-face { font-family: "Claudify Serif"; font-style: italic; font-weight: 400; font-display: swap; src: url("${serifIt}") format("truetype"); }
      @font-face { font-family: "Claudify Mono"; font-weight: 400; font-display: swap; src: url("${mono}") format("truetype"); }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function flatten(el, bg) {
    if (!el || el.nodeType !== 1) return;
    el.style.setProperty("background-image", "none", "important");
    el.style.setProperty("background", bg, "important");
    el.style.setProperty("background-color", bg, "important");
    el.style.setProperty("mask-image", "none", "important");
    el.style.setProperty("-webkit-mask-image", "none", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.style.setProperty("filter", "none", "important");
  }

  function paint() {
    const dark = isDark();
    if (dark) root.classList.add("claudify-dark");
    else root.classList.remove("claudify-dark");

    const mainBg = dark ? "#1f1f1e" : "#f8f8f6";
    const sideBg = dark ? "#141413" : "#f0efe9";
    const elevated = dark ? "#2c2c2a" : "#ffffff";
    const text = dark ? "#f0eee6" : "#111111";
    const muted = dark ? "#c9c7bb" : "#373733";

    root.style.setProperty("background-color", mainBg, "important");
    root.style.setProperty("color-scheme", dark ? "dark" : "light", "important");
    if (document.body) {
      flatten(document.body, mainBg);
      document.body.style.setProperty("color", text, "important");
      document.body.style.setProperty("font-family", SANS, "important");
    }

    document
      .querySelectorAll(
        'main, chat-app, .chat-app, .chat-history, .conversation-container, .content-wrapper, [class*="chat-window"], [class*="conversation"], .top-bar, [class*="top-bar"]'
      )
      .forEach((el) => flatten(el, mainBg));

    document
      .querySelectorAll(
        'bard-sidenav-container, mat-sidenav, .sidenav, [class*="sidenav"], [class*="side-nav"], nav, aside'
      )
      .forEach((el) => {
        flatten(el, sideBg);
        el.style.setProperty("color", muted, "important");
        el.style.setProperty("font-family", SANS, "important");
      });

    document
      .querySelectorAll(
        '.input-area, .input-area-container, [class*="input-area"], [class*="bottom-container"], [class*="gradient"], [class*="fade"], [class*="scrim"]'
      )
      .forEach((el) => flatten(el, mainBg));

    document
      .querySelectorAll(
        '.text-input-field, .text-input-field_textarea-wrapper, rich-textarea, .ql-container, [class*="text-input"]'
      )
      .forEach((el) => {
        el.classList.add("claudify-composer");
        el.style.setProperty("background", elevated, "important");
        el.style.setProperty("background-color", elevated, "important");
        el.style.setProperty("border", `1px solid ${dark ? "#f8f8f628" : "#1111111f"}`, "important");
        el.style.setProperty("border-radius", "1.125rem", "important");
        el.style.setProperty("box-shadow", dark ? "0 4px 24px #00000040" : "0 4px 20px #00000012", "important");
        el.style.setProperty("font-family", SANS, "important");
      });

    document
      .querySelectorAll(
        '.model-response-text, .markdown, .response-content, message-content, .model-response, [class*="model-response"] p, .markdown p, .markdown li'
      )
      .forEach((el) => {
        el.style.setProperty("font-family", SERIF, "important");
        el.style.setProperty("font-size", "1.125rem", "important");
        el.style.setProperty("line-height", "1.75", "important");
        el.style.setProperty("color", text, "important");
      });

    document
      .querySelectorAll(".markdown code, .markdown pre, .markdown pre code")
      .forEach((el) => {
        el.style.setProperty("font-family", MONO, "important");
      });

    document
      .querySelectorAll('.query-text, [class*="user-query"], [class*="query-content"]')
      .forEach((el) => {
        el.style.setProperty("font-family", SANS, "important");
        el.style.setProperty("background", elevated, "important");
        el.style.setProperty("color", text, "important");
        el.style.setProperty("border-radius", "1.125rem", "important");
      });
  }

  function boot() {
    injectFonts();
    paint();
  }

  boot();

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      boot();
    });
  };

  const obs = new MutationObserver(schedule);
  const start = () =>
    obs.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });

  let ticks = 0;
  const timer = setInterval(() => {
    boot();
    ticks += 1;
    if (ticks > 60) clearInterval(timer);
  }, 500);
})();
