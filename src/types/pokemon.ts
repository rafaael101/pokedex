export interface PokemonListado {
  name: string;
  url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    
    height: number;
    weight: number;
    base_experience: number;
    is_default: boolean;
    species: {
        name: string;
        url: string;
    };
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
}

