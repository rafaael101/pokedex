import axios from "axios";

export const getPokemonData = async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error;
    }
}