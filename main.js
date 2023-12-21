const darkModeToggle = document.querySelector("#dark-mode-toggle");

let darkMode = localStorage.getItem("darkMode");

if (darkMode === null) {
  darkMode = "disabled";
  localStorage.setItem("darkMode", darkMode);
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

const enableDarkMode = () => {
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  localStorage.setItem("darkMode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}
