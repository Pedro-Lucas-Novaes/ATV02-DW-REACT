import styles from "./Header.module.css";
import pokemonTypeIcons from "../../utils/pokemonTypeIcons";
import generationIcons from "../../utils/generationIcons";

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
}) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Pokédex</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={styles.darkButton}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className={styles.input}
      />

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

            <option value="todas">{generationIcons["Todas"]} Todas</option>

            {geracoes

              .filter((geracao) => geracao.nome !== "Todas")

              .map((geracao) => (
                <option key={geracao.nome} value={geracao.nome.toLowerCase()}>
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
