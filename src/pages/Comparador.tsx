import { useState, useEffect } from 'react';
import { getPokemonData, getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetails } from '../types/pokemon';

export function Comparador() {
  const [listaOpciones, setListaOpciones] = useState<PokemonDetails[]>([]);
  const [pokemonA, setPokemonA] = useState<PokemonDetails | null>(null);
  const [pokemonB, setPokemonB] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const data = await getPokemonData();
        setListaOpciones(data);
      } catch (error) {
        console.error("Error al cargar opciones del comparador:", error);
      }
    };
    cargarOpciones();
  }, []);

  const manejarSeleccion = async (nombre: string, posicion: 'A' | 'B') => {
    if (!nombre) return;
    try {
      setLoading(true);
      const detalle = await getPokemonDetail(nombre);
      if (posicion === 'A') setPokemonA(detalle);
      if (posicion === 'B') setPokemonB(detalle);
    } catch (error) {
      console.error("Error al traer detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6 mb-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Comparador de Estadísticas</h1>

      <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <label className="font-bold text-gray-600">Pokémon A</label>
          <select 
            onChange={(e) => manejarSeleccion(e.target.value, 'A')}
            className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 font-medium capitalize"
          >
            <option value="">Selecciona un Pokémon...</option>
            {listaOpciones.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <label className="font-bold text-gray-600">Pokémon B</label>
          <select 
            onChange={(e) => manejarSeleccion(e.target.value, 'B')}
            className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 font-medium capitalize"
          >
            <option value="">Selecciona un Pokémon...</option>
            {listaOpciones.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </div>
      </div>

      {loading && <div className="text-center text-xl font-bold text-gray-500">Analizando datos...</div>}

      {!loading && pokemonA && pokemonB && (
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto border border-gray-100">
          
          <div className="grid grid-cols-3 items-center mb-8">
            <div className="text-center">
              <img className="w-36 sm:w-44 mx-auto drop-shadow-md" src={pokemonA.sprites.other['official-artwork'].front_default} alt={pokemonA.name} />
              <h2 className="text-xl sm:text-2xl font-black capitalize text-blue-600 mt-2">{pokemonA.name}</h2>
            </div>

            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-gray-300 italic">VS</span>
            </div>

            <div className="text-center">
              <img className="w-36 sm:w-44 mx-auto drop-shadow-md" src={pokemonB.sprites.other['official-artwork'].front_default} alt={pokemonB.name} />
              <h2 className="text-xl sm:text-2xl font-black capitalize text-red-600 mt-2">{pokemonB.name}</h2>
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col gap-4">
              {pokemonA.stats.map((statA, index) => {
                const statB = pokemonB.stats[index];
                const nombreStat = statA.stat.name;
                const valorA = statA.base_stat;
                const valorB = statB.base_stat;

                return (
                  <div key={nombreStat} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className={`text-lg sm:text-xl w-1/3 text-center ${valorA > valorB ? 'text-green-600 font-black' : 'text-gray-400 font-medium'}`}>
                      {valorA}
                    </span>
                    <span className="text-gray-700 capitalize font-bold w-1/3 text-center uppercase tracking-wider text-xs sm:text-sm">
                      {nombreStat}
                    </span>
                    <span className={`text-lg sm:text-xl w-1/3 text-center ${valorB > valorA ? 'text-green-600 font-black' : 'text-gray-400 font-medium'}`}>
                      {valorB}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}