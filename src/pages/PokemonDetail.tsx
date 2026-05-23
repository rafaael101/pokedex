import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetails } from '../types/pokemon';
import { mapColorsType } from '../utils/typeColors';

export function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                if (name) {
                    const data = await getPokemonDetail(name);
                    console.log("Detalle del Pokémon: ", data);
                    setPokemon(data);
                }
            }
            catch (error) {
                console.log("Error al traer el detalle del Pokémon: ", error);
            }
        };
        fetchPokemonDetail();
    }, [name]);

    if (!pokemon) {
        return <div className="text-center mt-20 text-2xl font-bold text-gray-600">Cargando datos de {name}...</div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10 p-4">
            <h1 className="text-4xl font-black mb-8 capitalize text-center text-gray-800">{pokemon.name}</h1>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">

                <div className="w-full md:w-1/2 bg-gray-100 rounded-2xl flex justify-center p-8 shadow-inner">
                    <img 
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name} 
                        className="w-3/4 drop-shadow-xl hover:scale-105 transition-transform"
                    />
                </div>

                <div className="bg-[#525040] text-white p-8 rounded-2xl w-full md:w-1/2 grid grid-cols-2 gap-6 shadow-lg">
                    <div>
                        <h4 className="text-white/70 text-sm uppercase tracking-wider mb-1">Altura</h4>
                        <p className="font-bold text-2xl mb-6">{pokemon.height / 10} m</p>

                        <h4 className="text-white/70 text-sm uppercase tracking-wider mb-1">Peso</h4>
                        <p className="font-bold text-2xl">{pokemon.weight / 10} kg</p>
                    </div>

                    <div>
                        <h4 className="text-white/70 text-sm uppercase tracking-wider mb-2">Habilidades</h4>
                        <div className="flex flex-col gap-2">
                            {pokemon.abilities.map((habilidad) => (
                                <p key={habilidad.ability.name} className="font-bold text-lg capitalize bg-white/10 px-3 py-1 rounded-lg inline-block text-center">
                                    {habilidad.ability.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-8">

                {/* Tipos */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b-2 pb-2 border-gray-200">Tipos</h3>
                    <div className="flex flex-wrap gap-3">
                        {pokemon.types.map((tipoActual) => (
                            <span
                                key={tipoActual.type.name}
                                className={`${mapColorsType[tipoActual.type.name] || 'bg-gray-500'} text-white px-6 py-2 rounded-xl capitalize font-bold shadow-md text-lg`}
                            >
                                {tipoActual.type.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-2/3 bg-[#C7C7C5] p-6 rounded-2xl shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">Estadísticas Base</h3>

                    <div className="flex flex-col gap-3">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name} className="flex justify-between items-center bg-white/40 px-4 py-2 rounded-lg">
                                <span className="text-gray-800 capitalize font-bold tracking-wide">{stat.stat.name}</span>
                                <span className="font-black text-lg text-gray-900">{stat.base_stat}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-8 w-full">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 pb-2 border-gray-100">Datos Adicionales</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="font-bold text-gray-400 uppercase text-sm tracking-wider">ID Nacional:</span>
                        <span className="text-gray-800 font-black text-lg">#{pokemon.id}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="font-bold text-gray-400 uppercase text-sm tracking-wider">Exp. Base:</span>
                        <span className="text-blue-600 font-bold text-lg">{pokemon.base_experience || 'N/A'} XP</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="font-bold text-gray-400 uppercase text-sm tracking-wider">Especie base:</span>
                        <span className="text-gray-800 capitalize font-semibold">{pokemon.species.name}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="font-bold text-gray-400 uppercase text-sm tracking-wider">Forma por defecto:</span>
                        <span className="text-gray-800 font-semibold">{pokemon.is_default ? 'Sí' : 'No'}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 md:col-span-2">
                        <span className="font-bold text-gray-400 uppercase text-sm tracking-wider">Cant. Movimientos:</span>
                        <span className="text-gray-800 font-semibold bg-gray-100 px-4 py-1 rounded-full">{pokemon.moves.length} movimientos aprendibles</span>
                    </div>

                </div>
            </div>
        </div>
    );
}