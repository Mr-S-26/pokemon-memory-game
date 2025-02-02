import axios from 'axios';

export const fetchPokemon = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12');
      const pokemonList = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: pokemon.name,
            image: details.data.sprites.other['official-artwork'].front_default
          };
        })
      );
      return pokemonList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Pokémon');
    }
  };