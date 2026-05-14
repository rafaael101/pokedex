import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { getPokemonData } from '../services/pokemonService'
import type { PokemonListado } from '../types/pokemon'

function Home() {
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
      <ul className="lista-pokemones">
        {listaPokemones.map((pokemonActual) => {
          return <PokemonCard key={pokemonActual.name} pokemon={pokemonActual} />
        })}
      </ul>
    </div>
  )
}

export default Home
