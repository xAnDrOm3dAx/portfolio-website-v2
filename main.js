const themeToggleLight = document.querySelector("#theme-toggle-light");
const themeToggleDark = document.querySelector("#theme-toggle-dark");

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
  darkMode = "disabled";
  localStorage.setItem("darkMode", darkMode);
}

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  themeToggleLight.style.display = "none";
  themeToggleDark.style.display = "flex";
}

function enableDarkMode() {
  themeToggleLight.style.display = "flex"; // Hide sun icon
  themeToggleDark.style.display = "none"; // Show moon icon
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
  themeToggleLight.style.display = "none"; // Show sun icon
  themeToggleDark.style.display = "flex"; // Hide moon icon
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  localStorage.setItem("darkMode", "disabled");
}

themeToggleLight.addEventListener("click", () => {
  disableDarkMode();
});

themeToggleDark.addEventListener("click", () => {
  enableDarkMode();
});

console.log(darkMode);
