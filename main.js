const themeToggleLight = document.querySelector("#theme-toggle-light");
const themeToggleDark = document.querySelector("#theme-toggle-dark");

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
  darkMode = "disabled";
  localStorage.setItem("darkMode", darkMode);
}

const enableDarkMode = () => {
  themeToggleLight.style.display = "block";
  themeToggleDark.style.display = "none";
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  themeToggleLight.style.display = "none";
  themeToggleDark.style.display = "block";
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  localStorage.setItem("darkMode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  themeToggleLight.style.display = "none";
  themeToggleDark.style.display = "block";
}

themeToggleLight.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  disableDarkMode();
  // if (darkMode !== "enabled") {
  //   enableDarkMode();
  // } else {
  //   disableDarkMode();
  // }
});

themeToggleDark.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  enableDarkMode();
  // if (darkMode !== "enabled") {
  //   enableDarkMode();
  // } else {
  //   disableDarkMode();
  // }
});

console.log(darkMode);
