import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetails } from '../types/pokemon';

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
    }, [])
    if (!pokemon) {
        return <div>Cargando datos de {name}...</div>;
    }
    else {
        return (
            <div className="max-w-4xl mx-auto mt-10 mb-10">
                <h1 className="text-3xl font-bold mb-6 capitalize text-center">{pokemon.name}</h1>
                {/* Imagen y Cuadro */}
                <div className="flex gap-8 items-center">

                    {/* Imagen */}
                    <div className="w-1/2 bg-gray-100 rounded-2xl flex justify-center p-8">
                        <img src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name} />
                    </div>

                    {/* Cuadro Detalles */}
                    <div className="bg-[#525040] text-white p-6 rounded-xl w-1/2 grid grid-cols-2 gap-4">
                        {/* Columna Izquierda  */}
                        <div>
                            <h4 className="text-white/80 text-sm">Altura</h4>
                            <p className="font-bold text-lg mb-4">{pokemon.height / 10} m</p>

                            <h4 className="text-white/80 text-sm">Peso</h4>
                            <p className="font-bold text-lg">{pokemon.weight / 10} kg</p>
                        </div>

                        {/* Columna Derecha */}
                        <div>
                            <h4 className="text-white/80 text-sm">Habilidades</h4>
                            {pokemon.abilities.map((habilidad) => (
                                <p key={habilidad.ability.name} className="font-bold text-lg capitalize">
                                    {habilidad.ability.name}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Tipos y Stats */}
                <div className="mt-12 flex gap-12">

                    {/*Tipos*/}
                    <div className="w-1/2">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Tipos</h3>
                        <div className="flex gap-2">
                            {pokemon.types.map((tipoActual) => (
                                <span
                                    key={tipoActual.type.name}
                                    className="bg-[#525250] text-white px-6 py-1 rounded-md capitalize font-semibold"
                                >
                                    {tipoActual.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="w-1/2 bg-[#C7C7C5] p-6 rounded-xl ">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Estadísticas Base</h3>

                        <div className="flex flex-col gap-2">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name} className="flex justify-between border-b border-gray-300 pb-1">
                                    <span className="text-gray-600 capitalize font-medium">{stat.stat.name}</span>
                                    <span className="font-bold">{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}