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

  function isComposerShell(el) {
    return !!(
      el &&
      (el.getAttribute?.("data-claudify-composer") === "1" ||
        el.classList?.contains("claudify-composer") ||
        el.closest?.("[data-claudify-composer='1']") ||
        el.closest?.(".claudify-composer"))
    );
  }

  function flattenSurface(el, bg) {
    if (!el || el.nodeType !== 1) return;
    // Never flatten the input shell — that was killing Claude's border
    if (el.classList?.contains("claudify-composer")) return;
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

  function clearChrome(el) {
    if (!el || el.nodeType !== 1) return;
    el.style.setProperty("border", "none", "important");
    el.style.setProperty("border-width", "0", "important");
    el.style.setProperty("border-color", "transparent", "important");
    el.style.setProperty("outline", "none", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.style.setProperty("filter", "none", "important");
    el.style.setProperty("background-image", "none", "important");
  }

  function injectComposerCSS() {
    let style = document.getElementById("claudify-composer-css");
    if (!style) {
      style = document.createElement("style");
      style.id = "claudify-composer-css";
      (document.head || document.documentElement).appendChild(style);
    }
    // Rewritten every paint so it always wins over ChatGPT's hydrated classes
    style.textContent = `
      html.claudify-gpt [data-claudify-composer="1"],
      html.claudify-gpt [data-claudify-composer="1"].rounded-full,
      html.claudify-gpt [data-claudify-composer="1"][class*="rounded-full"],
      html.claudify-gpt [data-claudify-composer="1"][class*="rounded-3xl"],
      html.claudify-gpt [data-claudify-composer="1"][class*="rounded-2xl"] {
        border-radius: 20px !important;
        min-height: 132px !important;
        padding: 14px 16px 12px !important;
        background: #2c2c2a !important;
        background-color: #2c2c2a !important;
        background-image: none !important;
        border: 1px solid #6e6d66 !important;
        outline: none !important;
        box-shadow: none !important;
        filter: none !important;
        overflow: hidden !important;
      }
      html.claudify-gpt:not(.dark) [data-claudify-composer="1"] {
        background: #ffffff !important;
        background-color: #ffffff !important;
        border: 1px solid #c8c6bc !important;
      }
      html.claudify-gpt [data-claudify-composer="1"] [class*="rounded-full"] {
        border-radius: 8px !important;
      }
      html.claudify-gpt [data-claudify-stack="1"] {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: 1fr auto !important;
        grid-template-areas: "input input" "lead trail" !important;
        align-items: end !important;
        column-gap: 8px !important;
        row-gap: 14px !important;
        width: 100% !important;
        min-height: 108px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      html.claudify-gpt [data-claudify-part="input"] {
        grid-area: input !important;
        width: 100% !important;
        min-height: 52px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      html.claudify-gpt [data-claudify-part="input"] [contenteditable="true"],
      html.claudify-gpt [data-claudify-part="input"] #prompt-textarea,
      html.claudify-gpt [data-claudify-part="input"] textarea {
        min-height: 52px !important;
        width: 100% !important;
      }
      html.claudify-gpt [data-claudify-part="lead"] {
        grid-area: lead !important;
        justify-self: start !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      html.claudify-gpt [data-claudify-part="trail"] {
        grid-area: trail !important;
        justify-self: end !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
    `;
  }

  function findComposerInputs() {
    const sels = [
      "#prompt-textarea",
      'form [contenteditable="true"]',
      '[data-testid*="composer"] [contenteditable="true"]',
      "main form [contenteditable=\"true\"]",
      'main [contenteditable="true"]',
      "form textarea",
      'textarea[placeholder*="Ask"]',
      '[data-placeholder*="Ask"]',
      ".ProseMirror",
    ];
    const found = [];
    const seen = new Set();
    for (const sel of sels) {
      document.querySelectorAll(sel).forEach((el) => {
        if (seen.has(el)) return;
        const r = el.getBoundingClientRect();
        if (r.width < 60 || r.height < 12) return;
        // Prefer inputs in the lower half (composer lives there)
        if (r.top < (window.innerHeight || 800) * 0.25 && r.bottom < 120) return;
        seen.add(el);
        found.push(el);
      });
    }
    return found;
  }

  function findComposerShell(input) {
    let node = input.parentElement;
    let best = null;
    while (node && node !== document.body) {
      const cls = String(node.className || "");
      const r = node.getBoundingClientRect();
      const looksRounded = /rounded-(full|3xl|2xl|xl)/.test(cls);
      const looksComposerSized =
        r.width > 260 && r.height >= 36 && r.height < 320 && r.bottom > (window.innerHeight || 800) * 0.45;
      if (looksRounded && looksComposerSized) {
        best = node; // keep walking → outermost matching card
      }
      node = node.parentElement;
    }
    // Fallback: nearest wide ancestor near the bottom
    if (!best) {
      node = input.parentElement;
      while (node && node !== document.body) {
        const r = node.getBoundingClientRect();
        if (r.width > 320 && r.height >= 44 && r.height < 280) {
          best = node;
          break;
        }
        node = node.parentElement;
      }
    }
    return best;
  }

  function layoutComposerStack(shell, input) {
    const row =
      shell.querySelector(":scope > div.flex") ||
      shell.querySelector(":scope > div") ||
      null;
    if (!row) return;

    row.setAttribute("data-claudify-stack", "1");
    const kids = [...row.children];
    if (kids.length < 2) return;

    kids.forEach((k) => k.removeAttribute("data-claudify-part"));

    let inputIdx = kids.findIndex(
      (k) => k.contains(input) || k.querySelector("#prompt-textarea, [contenteditable='true'], textarea")
    );
    if (inputIdx < 0) inputIdx = Math.min(1, kids.length - 1);

    kids[inputIdx].setAttribute("data-claudify-part", "input");
    kids.slice(0, inputIdx).forEach((k) => k.setAttribute("data-claudify-part", "lead"));
    kids.slice(inputIdx + 1).forEach((k) => k.setAttribute("data-claudify-part", "trail"));
  }

  function styleComposerShells() {
    injectComposerCSS();

    const dark = isDark();
    const composerBg = dark ? "#2c2c2a" : "#ffffff";
    const border = dark ? "#6e6d66" : "#c8c6bc";
    const inputs = findComposerInputs();
    const activeShells = new Set();

    inputs.forEach((input) => {
      const shell = findComposerShell(input);
      if (!shell) return;
      activeShells.add(shell);

      shell.classList.add("claudify-composer");
      shell.setAttribute("data-claudify-composer", "1");

      // Strip ChatGPT capsule class so computed style can't stick to 9999px
      if (shell.classList.contains("rounded-full")) {
        shell.classList.remove("rounded-full");
      }
      shell.className = String(shell.className || "")
        .replace(/\brounded-full\b/g, "rounded-2xl")
        .replace(/\s+/g, " ")
        .trim();

      shell.style.setProperty("border-radius", "20px", "important");
      shell.style.setProperty("background", composerBg, "important");
      shell.style.setProperty("background-color", composerBg, "important");
      shell.style.setProperty("background-image", "none", "important");
      shell.style.setProperty("border", `1px solid ${border}`, "important");
      shell.style.setProperty("outline", "none", "important");
      shell.style.setProperty("box-shadow", "none", "important");
      shell.style.setProperty("min-height", "132px", "important");
      shell.style.setProperty("padding", "14px 16px 12px", "important");
      shell.style.setProperty("filter", "none", "important");

      shell.querySelectorAll('[class*="rounded"]').forEach((child) => {
        if (child === shell) return;
        clearChrome(child);
      });

      layoutComposerStack(shell, input);
    });

    // Untag stale shells from prior navigations
    document.querySelectorAll('[data-claudify-composer="1"]').forEach((el) => {
      if (activeShells.has(el)) return;
      el.removeAttribute("data-claudify-composer");
      el.classList.remove("claudify-composer");
    });
  }

  function neutralizeNoticeGlow() {
    const re =
      /for safety|keep a copy of this chat|chatgpt can make mistakes/i;

    // Only the smallest text node wrapper — parents were getting borders too
    document.querySelectorAll("main *").forEach((el) => {
      if (el.closest(".claudify-composer")) return;
      if (el.children.length > 2) return;
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!re.test(t) || t.length > 100) return;
      // Prefer leaf-ish nodes whose own text is the notice
      const own = [...el.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join(" ");
      if (own && !re.test(own) && el.children.length > 0) return;

      el.classList.add("claudify-notice");
      clearChrome(el);
      el.style.setProperty("background", "transparent", "important");
      el.style.setProperty("background-color", "transparent", "important");
      el.style.setProperty("color", isDark() ? "#8a887e" : "#7b7974", "important");

      let p = el.parentElement;
      for (let i = 0; i < 4 && p && !p.classList?.contains("claudify-composer"); i++) {
        clearChrome(p);
        // If parent only wraps the notice, clear fill too
        const pt = (p.textContent || "").replace(/\s+/g, " ").trim();
        if (re.test(pt) && pt.length < 120) {
          p.style.setProperty("background", "transparent", "important");
          p.style.setProperty("background-color", "transparent", "important");
          p.classList.add("claudify-notice");
        }
        p = p.parentElement;
      }
    });
  }

  function killGradients() {
    const bg = isDark() ? "#1f1f1e" : "#f8f8f6";

    document
      .querySelectorAll(
        '[class*="gradient"], [class*="from-"], [class*="via-"], [class*="to-token"], [class*="to-transparent"], [class*="sticky"], [class*="mask"], [style*="gradient"], [style*="mask"]'
      )
      .forEach((el) => {
        if (isComposerShell(el)) return;
        flattenSurface(el, bg);
      });

    // Sticky footers around the form — skip the composer card itself
    document.querySelectorAll("form").forEach((form) => {
      if (!form.querySelector("#prompt-textarea, [contenteditable='true']")) return;
      let node = form;
      for (let i = 0; i < 6 && node && node !== document.documentElement; i++) {
        if (!node.classList?.contains("claudify-composer")) {
          flattenSurface(node, bg);
        }
        node = node.parentElement;
      }
    });

    document
      .querySelectorAll('main [class*="bottom"], main > div:last-child')
      .forEach((el) => {
        if (isComposerShell(el)) return;
        flattenSurface(el, bg);
      });

    neutralizeNoticeGlow();

    // Bottom-band black overlays (not the composer)
    const vh = window.innerHeight || 800;
    document.querySelectorAll("main div, main section").forEach((el) => {
      if (isComposerShell(el)) return;
      const r = el.getBoundingClientRect();
      if (r.height < 8 || r.height > vh * 0.55) return;
      if (r.bottom < vh - 4 || r.top < vh * 0.55) return;
      const cs = getComputedStyle(el);
      const bi = cs.backgroundImage || "";
      const bgc = cs.backgroundColor || "";
      if (
        bi.includes("gradient") ||
        /rgba?\(\s*0,\s*0,\s*0/.test(bgc)
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

    // Flatten fades first, then restyle composer so border wins
    killGradients();
    styleComposerShells();
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
