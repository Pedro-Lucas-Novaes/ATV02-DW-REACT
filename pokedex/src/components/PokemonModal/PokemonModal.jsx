import styles from "./PokemonModal.module.css";
import pokemonColors from "../../utils/pokemonColors";
import { useEffect } from "react";

export default function PokemonModal({ pokemon, fecharModal, shinyMode, shinyGlow }) {
  useEffect(() => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);

      audio.volume = 0.2;

      audio.play();
    }
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className={styles.overlay} onClick={fecharModal}>
      <div
        className={
          shinyMode && shinyGlow
            ? `${styles.modal} ${styles.shinyModal}`
            : styles.modal
        }
        style={{
          backgroundColor: pokemonColors[pokemon.types[0].type.name],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={fecharModal}>
          X
        </button>

        <img
          src={
            shinyMode
              ? pokemon.sprites.front_shiny
              : pokemon.sprites.front_default
          }
          alt={pokemon.name}
        />

        <h1>{pokemon.name}</h1>

        <p>#{String(pokemon.id).padStart(3, "0")}</p>

        <p>Tipo: {pokemon.types[0].type.name}</p>

        <p>Altura: {pokemon.height}</p>

        <p>Peso: {pokemon.weight}</p>

        <div>
          <h3>Habilidades</h3>

          {pokemon.abilities.map((ability) => (
            <p key={ability.ability.name}>{ability.ability.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
