import axios from "axios";
import type { PokemonListado } from '../types/pokemon';

export const getPokemonData = async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const listaInicio = response.data.results;

        const promesasDetalles = listaInicio.map(async (pokemonInicio: PokemonListado) => {
            const detalleResponse = await axios.get(pokemonInicio.url);
            return detalleResponse.data; 
        });

        const listaDetalles = await Promise.all(promesasDetalles);
        return listaDetalles;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getPokemonDetail = async (name: string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching Pokémon detail:", error);
        throw error;
    }
}