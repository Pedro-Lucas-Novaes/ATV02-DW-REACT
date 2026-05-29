import styles from "./Header.module.css";
import pokemonTypeIcons from "../../utils/pokemonTypeIcons";
import generationIcons from "../../utils/generationIcons";
import { useState } from "react";
import SettingsButtons from "../SettingsButtons/SettingsButtons";

export default function Header({
  pesquisa,
  setPesquisa,

  tipos,
  tipoSelecionado,
  setTipoSelecionado,

  darkMode,
  setDarkMode,

  geracoes,
  geracaoSelecionada,
  setGeracaoSelecionada,

  shinyMode,
  setShinyMode,

  shinyGlow,
  setShinyGlow,
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
    setMenuAberto(false);
  };

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
    setSettingsOpen(false);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Pokédex</h1>

      {/* ⚙️ Settings */}
      <button className={styles.settingsButton} onClick={toggleSettings}>
        ⚙️
      </button>

      <div
        className={
          settingsOpen
            ? `${styles.settingsPanel} ${styles.settingsOpen}`
            : styles.settingsPanel
        }
      >
        <SettingsButtons
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          shinyMode={shinyMode}
          setShinyMode={setShinyMode}
          shinyGlow={shinyGlow}
          setShinyGlow={setShinyGlow}
        />
      </div>

      {/* ☰ Mobile */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>

      <div
        className={
          menuAberto
            ? `${styles.mobileMenu} ${styles.mobileOpen}`
            : styles.mobileMenu
        }
      >
        <SettingsButtons
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          shinyMode={shinyMode}
          setShinyMode={setShinyMode}
          shinyGlow={shinyGlow}
          setShinyGlow={setShinyGlow}
        />
      </div>

      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className={styles.input}
      />

      {/* 🎛️ Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.selectWrapper}>
          <select
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
            className={styles.select}
          >
            <option hidden value="">
              🔥 Tipo
            </option>

            <option value="todos">⭐ Todos</option>

            {tipos
              .filter((tipo) => tipo !== "todos")
              .map((tipo) => (
                <option key={tipo} value={tipo}>
                  {pokemonTypeIcons[tipo]} {tipo}
                </option>
              ))}
          </select>

          <span className={styles.arrow}>▼</span>
        </div>

        <div className={styles.selectWrapper}>
          <select
            value={geracaoSelecionada}
            onChange={(e) => setGeracaoSelecionada(e.target.value)}
            className={styles.select}
          >
            <option hidden value="">
              🌎 Região
            </option>

            <option value="todas">
              {generationIcons["Todas"]} Todas
            </option>

            {geracoes
              .filter((g) => g.nome !== "Todas")
              .map((geracao) => (
                <option
                  key={geracao.nome}
                  value={geracao.nome.toLowerCase()}
                >
                  {generationIcons[geracao.nome]} {geracao.nome}
                </option>
              ))}
          </select>

          <span className={styles.arrow}>▼</span>
        </div>
      </div>
    </header>
  );
}