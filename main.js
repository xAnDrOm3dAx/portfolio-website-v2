// const themeToggleLight = document.querySelector("#theme-toggle-light");
// const themeToggleDark = document.querySelector("#theme-toggle-dark");

// let darkMode = localStorage.getItem("darkMode");
// if (darkMode === null) {
//   darkMode = "disabled";
//   localStorage.setItem("darkMode", darkMode);
// }

// if (darkMode === "enabled") {
//   enableDarkMode();
// } else {
//   themeToggleLight.style.display = "none";
//   themeToggleDark.style.display = "flex";
// }

// function enableDarkMode() {
//   themeToggleLight.style.display = "flex"; // Hide sun icon
//   themeToggleDark.style.display = "none"; // Show moon icon
//   document.documentElement.classList.remove("light");
//   document.documentElement.classList.add("dark");
//   localStorage.setItem("darkMode", "enabled");
// }

// function disableDarkMode() {
//   themeToggleLight.style.display = "none"; // Show sun icon
//   themeToggleDark.style.display = "flex"; // Hide moon icon
//   document.documentElement.classList.remove("dark");
//   document.documentElement.classList.add("light");
//   localStorage.setItem("darkMode", "disabled");
// }

// themeToggleLight.addEventListener("click", () => {
//   disableDarkMode();
// });

// themeToggleDark.addEventListener("click", () => {
//   enableDarkMode();
// });

// console.log(darkMode);

const themeToggleLight = document.querySelector("#theme-toggle-light");
const themeToggleDark = document.querySelector("#theme-toggle-dark");

let darkMode = localStorage.getItem("darkMode");

// Check if dark mode is not explicitly set in local storage
if (darkMode === null) {
  // Check for the user's system color scheme
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set darkMode based on the user's system settings
  darkMode = prefersDarkMode ? "enabled" : "disabled";

  localStorage.setItem("darkMode", darkMode);
}

// Apply the theme based on the darkMode setting
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
