import type { PokemonDetails } from "../types/pokemon";
import { mapColorsType } from "../utils/typeColors";
import { Link } from "react-router-dom";

interface Props {
    pokemon: PokemonDetails;
    isFavorite: boolean;
    toggleFavorito: () => void;
}

export function PokemonCard({ pokemon, isFavorite, toggleFavorito }: Props) {
    return (
        <li className="pokemon-card relative bg-gray-100 rounded-2xl p-6 text-center transition-transform hover:-translate-y-2 shadow-md">
            
            {/* boton de favorito*/}
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorito();
                }}
                className="absolute top-3 right-3 text-2xl z-20 hover:scale-125 transition-transform"
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <Link to={`/pokemon/${pokemon.name}`}>
                
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {pokemon.types.map((tipoActual) => (
                        <span 
                            key={tipoActual.type.name} 
                            className={`${mapColorsType[tipoActual.type.name] || 'bg-gray-500'} text-white text-xs px-3 py-1 rounded-md capitalize font-bold shadow-sm`}
                        >
                            {tipoActual.type.name}
                        </span>
                    ))}
                </div>

                <img 
                    className="w-3/4 mx-auto drop-shadow-lg" 
                    src={pokemon.sprites.other['official-artwork'].front_default} 
                    alt={pokemon.name} 
                /> 
                
                <p className="mt-4 text-xl font-bold capitalize text-gray-800">
                    {pokemon.name}
                </p>
            </Link>
        </li>
    );
}