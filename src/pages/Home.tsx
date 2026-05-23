import { useState, useEffect } from 'react'
import '../App.css'
import { PokemonCard } from '../components/PokemonCard'
import { getPokemonData } from '../services/pokemonService'
import type { PokemonDetails } from '../types/pokemon';
import { mapColorsType } from '../utils/typeColors';

function Home() {
  const [listaPokemones, setListaPokemones] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const guardados = localStorage.getItem("misFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  })
  useEffect(() => {
    const pruebaAPI = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getPokemonData();
        console.log("Pokemos traidos de la API: ", data);
        setListaPokemones(data);
      }
      catch (error) {
        console.log("Error al traer los pokemons: ", error);
        setError(true);
      }
      finally {
        setIsLoading(false);
      }
    };
    pruebaAPI();
  }, [])

  const pokemonesFiltrados = listaPokemones.filter((pokemon) => {
    const busquedaNombre = pokemon.name.toLowerCase().includes(busqueda.toLowerCase());
    
    const busquedaTipo = tipoSeleccionado === "" 
      ? true 
      : pokemon.types.some((t) => t.type.name === tipoSeleccionado);
      
    const busquedaFavorito = mostrarSoloFavoritos 
      ? favoritos.includes(pokemon.name) 
      : true;
    
    return busquedaNombre && busquedaTipo && busquedaFavorito;
  });

  // agregar o quitar de favoritos
  const toggleFavorito = (nombrePokemon: string) => {
    let nuevosFavoritos;
    
    if (favoritos.includes(nombrePokemon)) {
      // si ya esta se filtra para sacarlo de la lista
      nuevosFavoritos = favoritos.filter((fav) => fav !== nombrePokemon);
    } else {
      // si no estaba, se agregamos al final de la lista
      nuevosFavoritos = [...favoritos, nombrePokemon];
    }

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("misFavoritos", JSON.stringify(nuevosFavoritos));
  };

  if (isLoading) {
    return <div className="text-center mt-20 text-2xl font-bold">Cargando Pokédex...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 text-xl font-bold">Hubo un error...</div>;
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {/* barra de busqueda */}
      <div className="mb-8 flex justify-center">
        <input 
          type="text" 
          placeholder="Buscar pokemon..." 
          className="w-full max-w-md p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} // se guarda lo que el usuario escribe
        />
      </div>
      
      {/* filtro por tipo */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Filtrar por tipo:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(mapColorsType).map((tipo) => (
            <button
              key={tipo}
              onClick={() => tipo === 'reset' ? setTipoSeleccionado("") : setTipoSeleccionado(tipo)}
              className={`
                ${mapColorsType[tipo]} 
                text-white px-4 py-1 rounded-full capitalize font-semibold shadow-sm transition-transform hover:scale-105
                ${tipoSeleccionado === tipo ? 'ring-4 ring-offset-2 ring-gray-300 scale-105' : ''}
              `}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setMostrarSoloFavoritos(!mostrarSoloFavoritos)} 
          className={`px-6 py-2 rounded-full font-bold shadow-sm transition-all flex items-center gap-2
            ${mostrarSoloFavoritos 
              ? 'bg-red-500 text-white ring-4 ring-red-200 hover:bg-red-600' 
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          {mostrarSoloFavoritos ? 'Mostrando mis favoritos' : 'Filtrar por favoritos'}
        </button>
      </div>
      
      {pokemonesFiltrados.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-xl">
          No se encontró ningún Pokémon {busqueda !== "" ? ` llamado "${busqueda}"` : ""}

          {tipoSeleccionado !== "" ? ` de tipo ${tipoSeleccionado}` : ""}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemonesFiltrados.map((pokemonActual) => {
            return (
              <PokemonCard 
                key={pokemonActual.name} 
                pokemon={pokemonActual} 
                isFavorite={favoritos.includes(pokemonActual.name)}
                toggleFavorito={() => toggleFavorito(pokemonActual.name)}
              />
            )
          })}
        </ul>
      )}

    </div>
  )
}

export default Home
