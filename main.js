(() => {
  document.documentElement.classList.add("js");
  const root = document.documentElement;
  const storageKey = "theme";
  const nav = document.querySelector("#site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]:not([media])');
  const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const getTheme = () => localStorage.getItem(storageKey) || getSystemTheme();

  const syncThemeControls = (theme) => {
    const isDark = theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }
    if (themeColorMeta) {
      const styles = getComputedStyle(root);
      themeColorMeta.setAttribute("content", styles.getPropertyValue("--theme-color").trim());
    }
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (persist) {
      localStorage.setItem(storageKey, theme);
    }
    syncThemeControls(theme);
  };

  applyTheme(getTheme());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  const getFocusable = () => {
    const items = [];
    if (navToggle) items.push(navToggle);
    if (nav) items.push(...nav.querySelectorAll("a"));
    return items.filter((item) => !item.hasAttribute("disabled"));
  };

  const setMenuState = (open) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    nav.inert = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);

    if (open) {
      navLinks[0]?.focus();
    }
  };

  if (nav && navToggle) {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const syncNavForViewport = () => {
      if (desktopQuery.matches) {
        nav.inert = false;
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("nav-open");
      } else if (navToggle.getAttribute("aria-expanded") !== "true") {
        nav.inert = true;
      }
    };

    syncNavForViewport();
    desktopQuery.addEventListener("change", syncNavForViewport);

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      setMenuState(open);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!desktopQuery.matches) setMenuState(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      if (!open || desktopQuery.matches) return;

      if (event.key === "Escape") {
        setMenuState(false);
        navToggle.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const currentIdFor = (id) => {
      if (id === "top") return null;
      if (id === "experiments") return "work";
      return id;
    };

    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const currentId = currentIdFor(visible.target.id);
        navLinks.forEach((link) => {
          const match = currentId && link.getAttribute("href") === `#${currentId}`;
          if (match) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );
    sections.forEach((section) => spy.observe(section));
  }

  const revealItems = [...document.querySelectorAll(".reveal")];
  const revealNow = () => {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  };

  if (!revealItems.length || reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealNow();
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  reduceMotion.addEventListener("change", (event) => {
    if (event.matches) revealNow();
  });
})();
