import styles from "./PokemonCard.module.css";
import pokemonColors from "../../utils/pokemonColors"

export default function PokemonCard({ nome, imagem, numero, tipo, aoClicar }) {

  const numeroFormatado = String(numero).padStart(3, "0")

  return (
    <div className={`${styles.card} pokemon-card`} onClick={aoClicar} style={{ backgroundColor: pokemonColors[tipo] }}>

      <span className={styles.numero}>
        #{numeroFormatado}
      </span>

      <img src={imagem} alt={nome} />

      <h2>
        {nome.charAt(0).toUpperCase() + nome.slice(1)}
      </h2>

      <p>{tipo}</p>

    </div>
  );
}
