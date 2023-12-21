const themeToggleLight = document.querySelector("#theme-toggle-light");
const themeToggleDark = document.querySelector("#theme-toggle-dark");

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
  darkMode = "disabled";
  localStorage.setItem("darkMode", darkMode);
}

const enableDarkMode = () => {
  themeToggleLight.style.display = "none"; // Hide sun icon
  themeToggleDark.style.display = "flex"; // Show moon icon
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  themeToggleLight.style.display = "flex"; // Show sun icon
  themeToggleDark.style.display = "none"; // Hide moon icon
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  localStorage.setItem("darkMode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  themeToggleLight.style.display = "flex";
  themeToggleDark.style.display = "none";
}

themeToggleLight.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  enableDarkMode();
});

themeToggleDark.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  disableDarkMode();
});

console.log(darkMode);
