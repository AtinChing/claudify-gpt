/**
 * Claudify GPT — content bootstrap (v1.2)
 *
 * Forces Claude tokens, CSP-safe fonts, surface paint, and light DOM cloaking
 * so the empty state / chrome read closer to claude.ai.
 */
(() => {
  const DARK = {
    "--main-surface-primary": "#1f1f1e",
    "--main-surface-secondary": "#141413",
    "--main-surface-tertiary": "#2c2c2a",
    "--main-surface-background": "#1f1f1ee6",
    "--bg-primary": "#1f1f1e",
    "--bg-secondary": "#2c2c2a",
    "--bg-tertiary": "#373734",
    "--bg-elevated-primary": "#2c2c2a",
    "--bg-elevated-secondary": "#1f1f1e",
    "--sidebar-surface": "#141413",
    "--sidebar-surface-primary": "#141413",
    "--sidebar-surface-secondary": "#1f1f1e",
    "--sidebar-surface-tertiary": "#2c2c2a",
    "--component-sidebar-bg": "#141413",
    "--sidebar-body-primary": "#e8e6df",
    "--sidebar-icon": "#a8a69c",
    "--text-primary": "#f8f8f6",
    "--text-secondary": "#c2c1b6",
    "--text-tertiary": "#96948b",
    "--content-primary": "#f8f8f6",
    "--icon-primary": "#f8f8f6",
    "--border-default": "#f8f8f626",
    "--border-light": "#f8f8f60d",
    "--border-medium": "#f8f8f626",
    "--border-heavy": "#f8f8f633",
    "--composer-surface": "#2c2c2a",
    "--composer-surface-primary": "#2c2c2a",
    "--message-surface": "#2c2c2a",
    "--theme-user-msg-bg": "#2c2c2a",
    "--theme-user-msg-text": "#f8f8f6",
    "--default-theme-user-msg-bg": "#2c2c2a",
    "--default-theme-user-msg-text": "#f8f8f6",
    "--gray-750": "#2c2c2a",
    "--gray-800": "#1f1f1e",
    "--gray-850": "#1a1a19",
    "--gray-900": "#171716",
    "--gray-950": "#111111",
    "--gray-1000": "#0a0a09",
    "--link": "#e89a7d",
    "--bg-accent-static": "#d97757",
    "--accent-orange": "#d97757",
  };

  const LIGHT = {
    "--main-surface-primary": "#f8f8f6",
    "--main-surface-secondary": "#ffffff",
    "--main-surface-tertiary": "#f3f3f0",
    "--main-surface-background": "#f8f8f6e6",
    "--bg-primary": "#f8f8f6",
    "--bg-secondary": "#f3f3f0",
    "--bg-tertiary": "#efeeeb",
    "--bg-elevated-primary": "#ffffff",
    "--bg-elevated-secondary": "#f8f8f6",
    "--sidebar-surface": "#f3f3f0",
    "--sidebar-surface-primary": "#f3f3f0",
    "--sidebar-surface-secondary": "#efeeeb",
    "--sidebar-surface-tertiary": "#e8e6df",
    "--component-sidebar-bg": "#f3f3f0",
    "--sidebar-body-primary": "#373733",
    "--sidebar-icon": "#7b7974",
    "--text-primary": "#111111",
    "--text-secondary": "#373733",
    "--text-tertiary": "#7b7974",
    "--content-primary": "#111111",
    "--icon-primary": "#373733",
    "--border-default": "#1111111a",
    "--border-light": "#1111110d",
    "--border-medium": "#11111126",
    "--border-heavy": "#11111133",
    "--composer-surface": "#ffffff",
    "--composer-surface-primary": "#ffffff",
    "--message-surface": "#efeeeb",
    "--theme-user-msg-bg": "#efeeeb",
    "--theme-user-msg-text": "#111111",
    "--default-theme-user-msg-bg": "#efeeeb",
    "--default-theme-user-msg-text": "#111111",
    "--gray-50": "#f8f8f6",
    "--gray-75": "#f3f3f0",
    "--gray-100": "#efeeeb",
    "--gray-800": "#373733",
    "--gray-900": "#1f1f1e",
    "--gray-950": "#171716",
    "--link": "#c6613f",
    "--bg-accent-static": "#d97757",
    "--accent-orange": "#d97757",
  };

  /* Claude-like clay asterisk */
  const STAR_SVG = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M12 2.5v19M2.5 12h19M5.4 5.4l13.2 13.2M18.6 5.4L5.4 18.6"/></g></svg>`;

  const STARTER_LABELS = new Set([
    "Create an image",
    "Write or edit",
    "Look something up",
    "Create image",
    "Help me write",
    "Brainstorm",
    "Make a plan",
    "Analyze data",
    "Get advice",
    "Surprise me",
  ]);

  const root = document.documentElement;
  root.classList.add("claudify-gpt");
  root.dataset.claudify = "1";

  function isDark() {
    return (
      root.classList.contains("dark") ||
      root.dataset.colorScheme === "dark" ||
      getComputedStyle(root).colorScheme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function applyTokens() {
    const tokens = isDark() ? DARK : LIGHT;
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(key, value, "important");
    }
    const bg = isDark() ? "#1f1f1e" : "#f8f8f6";
    const fg = isDark() ? "#f8f8f6" : "#111111";
    root.style.setProperty("background-color", bg, "important");
    root.style.setProperty("color-scheme", isDark() ? "dark" : "light", "important");
    if (document.body) {
      document.body.style.setProperty("background-color", bg, "important");
      document.body.style.setProperty("background", bg, "important");
      document.body.style.setProperty("color", fg, "important");
    }
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
      @font-face {
        font-family: "Claudify Sans";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("${sans}") format("truetype");
      }
      @font-face {
        font-family: "Claudify Sans";
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url("${sansSemi}") format("truetype");
      }
      @font-face {
        font-family: "Claudify Serif";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("${serif}") format("truetype");
      }
      @font-face {
        font-family: "Claudify Serif";
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url("${serifIt}") format("truetype");
      }
      @font-face {
        font-family: "Claudify Mono";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("${mono}") format("truetype");
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function injectBoost() {
    if (document.getElementById("claudify-boost")) return;
    const style = document.createElement("style");
    style.id = "claudify-boost";
    style.textContent = `
      html.claudify-gpt.dark,
      html.claudify-gpt.dark body,
      html.claudify-gpt.dark #__next,
      html.claudify-gpt.dark main,
      html.claudify-gpt.dark [role="main"],
      html.claudify-gpt.dark .bg-token-main-surface-primary,
      html.claudify-gpt.dark [class*="bg-token-main-surface"] {
        background-color: #1f1f1e !important;
        background: #1f1f1e !important;
      }
      html.claudify-gpt.dark nav,
      html.claudify-gpt.dark aside,
      html.claudify-gpt.dark .bg-token-sidebar-surface-primary,
      html.claudify-gpt.dark [class*="bg-token-sidebar"] {
        background-color: #141413 !important;
        background: #141413 !important;
      }
      html.claudify-gpt.dark [class*="gradient"],
      html.claudify-gpt.dark [class*="from-"],
      html.claudify-gpt.dark [class*="sticky"][class*="bottom"],
      html.claudify-gpt.dark form[class*="stretch"],
      html.claudify-gpt.dark form[class*="stretch"] > div,
      html.claudify-gpt.dark form[class*="stretch"] > div > div,
      html.claudify-gpt.dark [class*="pointer-events-none"] {
        background: #1f1f1e !important;
        background-color: #1f1f1e !important;
        background-image: none !important;
        mask-image: none !important;
        -webkit-mask-image: none !important;
        box-shadow: none !important;
        filter: none !important;
      }
      html.claudify-gpt:not(.dark),
      html.claudify-gpt:not(.dark) body,
      html.claudify-gpt:not(.dark) #__next,
      html.claudify-gpt:not(.dark) main,
      html.claudify-gpt:not(.dark) .bg-token-main-surface-primary {
        background-color: #f8f8f6 !important;
        background: #f8f8f6 !important;
      }
      html.claudify-gpt:not(.dark) nav,
      html.claudify-gpt:not(.dark) aside,
      html.claudify-gpt:not(.dark) .bg-token-sidebar-surface-primary {
        background-color: #f3f3f0 !important;
        background: #f3f3f0 !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  const SANS = '"Claudify Sans", "Source Sans 3", ui-sans-serif, system-ui, sans-serif';
  const SERIF = '"Claudify Serif", "Source Serif 4", Georgia, serif';

  function flattenSurface(el, bg) {
    if (!el || el.nodeType !== 1) return;
    el.style.setProperty("background-image", "none", "important");
    el.style.setProperty("background", bg, "important");
    el.style.setProperty("background-color", bg, "important");
    el.style.setProperty("mask-image", "none", "important");
    el.style.setProperty("-webkit-mask-image", "none", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.style.setProperty("filter", "none", "important");
    el.style.setProperty("backdrop-filter", "none", "important");
    el.style.setProperty("-webkit-backdrop-filter", "none", "important");
  }

  function killGradients() {
    const bg = isDark() ? "#1f1f1e" : "#f8f8f6";

    document
      .querySelectorAll(
        '[class*="gradient"], [class*="from-"], [class*="via-"], [class*="to-token"], [class*="to-transparent"], [class*="sticky"], [class*="mask"], [style*="gradient"], [style*="mask"]'
      )
      .forEach((el) => flattenSurface(el, bg));

    // Composer ancestry + sticky footers (ChatGPT's black fade lives here)
    document.querySelectorAll("form").forEach((form) => {
      if (!form.querySelector("#prompt-textarea, [contenteditable='true']")) return;
      let node = form;
      for (let i = 0; i < 6 && node && node !== document.documentElement; i++) {
        flattenSurface(node, bg);
        node = node.parentElement;
      }
    });

    document
      .querySelectorAll('main [class*="bottom"], main > div:last-child, [class*="composer"]')
      .forEach((el) => flattenSurface(el, bg));

    // Disclaimer pill glow reads as a black shade — strip it
    document.querySelectorAll("main span, main div, main p").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (/ChatGPT can make mistakes/i.test(t) && t.length < 80) {
        flattenSurface(el, "transparent");
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("background-color", "transparent", "important");
        let p = el.parentElement;
        for (let i = 0; i < 3 && p; i++) {
          flattenSurface(p, "transparent");
          p.style.setProperty("background", "transparent", "important");
          p = p.parentElement;
        }
      }
    });

    // Any element covering the bottom band of the viewport
    const vh = window.innerHeight || 800;
    document.querySelectorAll("main div, main section, form").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 8 || r.height > vh * 0.55) return;
      if (r.bottom < vh - 4 || r.top < vh * 0.55) return;
      const cs = getComputedStyle(el);
      const bi = cs.backgroundImage || "";
      const bgc = cs.backgroundColor || "";
      if (
        bi.includes("gradient") ||
        bi.includes("mask") ||
        bgc === "rgb(0, 0, 0)" ||
        bgc === "rgba(0, 0, 0, 1)" ||
        /rgba\(0,\s*0,\s*0/.test(bgc)
      ) {
        flattenSurface(el, bg);
      }
    });
  }

  function applyType() {
    document.querySelectorAll("nav, aside").forEach((el) => {
      el.style.setProperty("font-family", SANS, "important");
      el.style.setProperty("color", isDark() ? "#c9c7bb" : "#373733", "important");
    });

    document
      .querySelectorAll(
        'nav a, nav button, nav span, aside a, aside button, aside span'
      )
      .forEach((el) => {
        if (el.closest("svg")) return;
        el.style.setProperty("font-family", SANS, "important");
        if (!el.closest("a[href='/']")) {
          el.style.setProperty("color", isDark() ? "#c9c7bb" : "#373733", "important");
        }
      });

    document
      .querySelectorAll(
        '[data-message-author-role="assistant"], [data-message-author-role="assistant"] .markdown, [data-message-author-role="assistant"] p, .agent-turn .markdown, .agent-turn .markdown p'
      )
      .forEach((el) => {
        el.style.setProperty("font-family", SERIF, "important");
        el.style.setProperty("font-size", "1.125rem", "important");
        el.style.setProperty("line-height", "1.75", "important");
        el.style.setProperty("color", isDark() ? "#f0eee6" : "#111111", "important");
      });

    document
      .querySelectorAll(
        '[data-message-author-role="assistant"] button, [data-message-author-role="assistant"] code, [data-message-author-role="assistant"] pre'
      )
      .forEach((el) => {
        el.style.setProperty("font-family", SANS, "important");
      });
  }

  function paintSurfaces() {
    const dark = isDark();
    const mainBg = dark ? "#1f1f1e" : "#f8f8f6";
    const sideBg = dark ? "#141413" : "#f0efe9";
    const composerBg = dark ? "#2c2c2a" : "#ffffff";
    const border = dark ? "#f8f8f628" : "#1111111f";

    document
      .querySelectorAll(
        'main, [role="main"], #__next, .bg-token-main-surface-primary, [class*="bg-token-main-surface"]'
      )
      .forEach((el) => {
        el.style.setProperty("background-color", mainBg, "important");
        el.style.setProperty("background-image", "none", "important");
      });

    document
      .querySelectorAll(
        'nav, aside, .bg-token-sidebar-surface-primary, [class*="bg-token-sidebar"]'
      )
      .forEach((el) => {
        el.style.setProperty("background-color", sideBg, "important");
        el.style.setProperty("background-image", "none", "important");
      });

    // Composer: include rounded-full (ChatGPT's current pill shell)
    document
      .querySelectorAll(
        '[class*="rounded-full"], [class*="rounded-3xl"], [class*="rounded-2xl"], [class*="rounded-xl"]'
      )
      .forEach((el) => {
        if (!el.querySelector("#prompt-textarea, [contenteditable='true']")) return;
        // Prefer the outermost shell that still looks like the composer card
        const shell =
          el.closest('[class*="rounded-full"], [class*="rounded-3xl"], [class*="rounded-2xl"]') ||
          el;
        shell.classList.add("claudify-composer");
        shell.style.setProperty("background-color", composerBg, "important");
        shell.style.setProperty("background-image", "none", "important");
        shell.style.setProperty("border", `1px solid ${border}`, "important");
        shell.style.setProperty("border-radius", "1.125rem", "important");
        shell.style.setProperty(
          "box-shadow",
          dark ? "0 4px 24px #00000040" : "0 4px 20px #00000012",
          "important"
        );
        shell.style.setProperty("min-height", "5.5rem", "important");
      });

    killGradients();
    applyType();
  }

  function hideChatWorkToggle() {
    document.querySelectorAll("button, [role='tab'], div").forEach((el) => {
      if (el.dataset.claudifyHide === "1") return;
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (t !== "Work") return;
      const group = el.closest('div[class*="rounded"], div.flex, div[role="group"]') || el.parentElement;
      if (!group) return;
      const gt = (group.textContent || "").replace(/\s+/g, " ").trim();
      if (/^Chat\s*Work$|^Work\s*Chat$/i.test(gt) || (gt.includes("Chat") && gt.length < 24)) {
        group.style.setProperty("display", "none", "important");
        group.dataset.claudifyHide = "1";
      }
    });
  }

  function hideStarterChips() {
    // Empty-state suggestion rows under the composer (Claude has none)
    document.querySelectorAll("button, a").forEach((el) => {
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!STARTER_LABELS.has(t)) return;
      const row = el.closest("div.flex, div[class*='gap'], li, div") || el;
      // Prefer hiding the whole stack if it only contains starters
      const stack = row.parentElement;
      if (stack && stack !== document.body) {
        const labels = [...stack.querySelectorAll("button, a")]
          .map((n) => (n.textContent || "").replace(/\s+/g, " ").trim())
          .filter(Boolean);
        const mostlyStarters =
          labels.length >= 2 &&
          labels.filter((l) => STARTER_LABELS.has(l)).length >= Math.min(2, labels.length);
        if (mostlyStarters) {
          stack.style.setProperty("display", "none", "important");
          stack.classList.add("claudify-hide-starters");
          return;
        }
      }
      el.style.setProperty("display", "none", "important");
    });
  }

  function decorateGreeting() {
    const main = document.querySelector("main") || document.body;
    if (!main) return;

    const headings = [...main.querySelectorAll("h1, h2")];
    for (const heading of headings) {
      if (heading.closest("nav, aside, form, .claudify-composer")) continue;
      const text = (heading.textContent || "").replace(/\s+/g, " ").trim();
      if (!text || text.length > 90) continue;
      // Empty-state greetings tend to be short personal lines
      const looksLikeGreeting =
        /hey|hello|hi\b|ready|dive|back at it|good (morning|afternoon|evening)/i.test(
          text
        ) || text.split(" ").length <= 10;
      if (!looksLikeGreeting) continue;

      heading.classList.add("claudify-greeting");
      if (!heading.querySelector(".claudify-star")) {
        const star = document.createElement("span");
        star.className = "claudify-star";
        star.innerHTML = STAR_SVG;
        heading.insertBefore(star, heading.firstChild);
      }
      break;
    }
  }

  function cloakChrome() {
    hideChatWorkToggle();
    hideStarterChips();
    decorateGreeting();
  }

  function boot() {
    injectFonts();
    injectBoost();
    applyTokens();
    paintSurfaces();
    cloakChrome();
  }

  boot();

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyTokens();
      paintSurfaces();
      injectFonts();
      injectBoost();
      cloakChrome();
    });
  };

  const obs = new MutationObserver(schedule);
  const startObs = () => {
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style", "data-chat-theme"],
      childList: true,
      subtree: true,
    });
  };

  if (document.body) startObs();
  else document.addEventListener("DOMContentLoaded", startObs, { once: true });

  let ticks = 0;
  const timer = setInterval(() => {
    boot();
    ticks += 1;
    if (ticks > 60) clearInterval(timer);
  }, 500);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) boot();
  });
})();
