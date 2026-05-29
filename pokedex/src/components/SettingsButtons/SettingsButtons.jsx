import styles from "./SettingsButtons.module.css";

export default function SettingsButtons({
  darkMode,
  setDarkMode,
  shinyMode,
  setShinyMode,
  shinyGlow,
  setShinyGlow,
}) {
  return (
    <>
      {/* 🌙 Dark Mode */}
      <button
        className={styles.darkButton}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ✨ Shiny Mode */}
      <button
        className={styles.shinyButton}
        onClick={() => setShinyMode(!shinyMode)}
      >
        ✨ Shiny Mode: {shinyMode ? "ON" : "OFF"}
      </button>

      {/* 💡 Glow */}
      <button
        className={styles.glowButton}
        onClick={() => setShinyGlow(!shinyGlow)}
      >
        💡 Glow: {shinyGlow ? "ON" : "OFF"}
      </button>
    </>
  );
}