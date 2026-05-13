import { useState } from 'react'
import './App.css'
import { getPokemonData } from './services/pokemonService'
import { useEffect } from 'react'
import type { PokemonListado } from './types/pokemon'
import jordi from './assets/jordiwild.jpg'

function App() {
  const [listaPokemones, setListaPokemones] = useState<PokemonListado[]>([]);
  useEffect(() => {
    const pruebaAPI = async () => {
      try {
        const data = await getPokemonData();
        console.log("Pokemos traidos de la API: ", data);
        setListaPokemones(data);
      }
      catch (error) {
        console.log("Error al traer los pokemons: ", error);
      }
    };
    pruebaAPI();
  }, [])
  return (
    <div>
      <h1>Pokédex</h1>
      <ul className="lista-pokemones">
        {listaPokemones.map((pokemon) => {
          return <li className="pokemon-card" key={pokemon.name}> {pokemon.name} </li>
        })}
      </ul>
      <img className="jordi-wild" src={jordi} alt="Logo de la Pokédex" />
    </div>
  )
}

export default App
