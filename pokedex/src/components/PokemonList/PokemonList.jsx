import PokemonCard from "../PokemonCard/PokemonCard";

export default function PokemonList({
  pokemons,
  setPokemonSelecionado,
  shinyMode,
  shinyGlow,
}) {
  return (
    <main className="container">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          nome={pokemon.name}
          numero={pokemon.id}
          imagem={
            shinyMode
              ? pokemon.sprites.front_shiny
              : pokemon.sprites.front_default
          }
          tipo={pokemon.types[0].type.name}
          shinyMode={shinyMode}
          shinyGlow={shinyGlow}
          aoClicar={() => setPokemonSelecionado(pokemon)}
        />
      ))}
    </main>
  );
}
