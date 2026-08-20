(() => {
  const root = document.documentElement;
  const storageKey = "theme";
  const themeColors = {
    light: "#F4EFE8",
    dark: "#12110F",
  };
  const desktopNav = document.querySelector("#site-nav");
  const mobileNav = document.querySelector("#mobile-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]:not([media])');
  const navLinks = [
    ...(desktopNav ? [...desktopNav.querySelectorAll('a[href^="#"]')] : []),
    ...(mobileNav ? [...mobileNav.querySelectorAll('a[href^="#"]')] : []),
  ];
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
      themeColorMeta.setAttribute("content", themeColors[theme] || themeColors.light);
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

  syncThemeControls(getTheme());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  const setMenuState = (open) => {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.toggle("is-open", open);
    mobileNav.inert = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  if (mobileNav && navToggle) {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const syncNavForViewport = () => {
      if (desktopQuery.matches) {
        setMenuState(false);
      } else if (navToggle.getAttribute("aria-expanded") !== "true") {
        mobileNav.inert = true;
      }
    };

    syncNavForViewport();
    desktopQuery.addEventListener("change", syncNavForViewport);

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      setMenuState(open);
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a") && !desktopQuery.matches) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      if (!open || desktopQuery.matches || event.key !== "Escape") return;
      setMenuState(false);
      navToggle.focus();
    });

    document.addEventListener("click", (event) => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      if (!open || desktopQuery.matches) return;
      if (mobileNav.contains(event.target) || navToggle.contains(event.target)) return;
      setMenuState(false);
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
