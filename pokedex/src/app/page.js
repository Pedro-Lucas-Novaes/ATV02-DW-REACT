"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList/PokemonList";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import PokemonModal from "../components/PokemonModal/PokemonModal";
import pokemonTypes from "../utils/pokemonTypes";
import pokemonGenerations from "../utils/pokemonGenerations";

export default function Home() {
  // STATES
  const [pokemons, setPokemons] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [geracaoSelecionada, setGeracaoSelecionada] = useState("Kanto");

  // USE EFFECTS
  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);

      const geracaoAtual =
        pokemonGenerations.find((gen) => gen.nome === geracaoSelecionada) ||
        pokemonGenerations[0];

      const totalPokemons = geracaoAtual.fim - geracaoAtual.inicio + 1;

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}&offset=${geracaoAtual.inicio - 1}`,
      );

      const detalhesPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const responsePokemon = await axios.get(pokemon.url);

          return responsePokemon.data;
        }),
      );

      setPokemons(detalhesPokemons);

      setLoading(false);
    }

    fetchPokemons();
  }, [geracaoSelecionada]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // FILTROS
  const geracaoAtual = pokemonGenerations.find(
    (gen) => gen.nome.toLowerCase() === geracaoSelecionada,
  );

  const pokemonsFiltrados = pokemons.filter((pokemon) => {
    const nomeMatch = pokemon.name
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    const tipoMatch =
      tipoSelecionado === "" ||
      tipoSelecionado === "todos" ||
      pokemon.types.some((type) => type.type.name === tipoSelecionado);

    return nomeMatch && tipoMatch;
  });

  // LOADING
  if (loading) {
    return <Loading />;
  }

  // RETURN
  return (
    <>
      <Header
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        tipos={pokemonTypes}
        tipoSelecionado={tipoSelecionado}
        setTipoSelecionado={setTipoSelecionado}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        geracoes={pokemonGenerations}
        geracaoSelecionada={geracaoSelecionada}
        setGeracaoSelecionada={setGeracaoSelecionada}
      />

      <PokemonList
        pokemons={pokemonsFiltrados}
        setPokemonSelecionado={setPokemonSelecionado}
      />

      <PokemonModal
        pokemon={pokemonSelecionado}
        fecharModal={() => setPokemonSelecionado(null)}
      />
    </>
  );
}
