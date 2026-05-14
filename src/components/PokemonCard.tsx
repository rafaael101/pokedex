import type { PokemonListado } from "../types/pokemon"
import { Link } from "react-router-dom"

export function PokemonCard({ pokemon }: { pokemon: PokemonListado }) {
    const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
        <li className="pokemon-card" key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img className="pokemon-image" src={pokemonImageUrl} alt={pokemon.name} />
                {pokemon.name}
            </Link>
        </li>
    )
}