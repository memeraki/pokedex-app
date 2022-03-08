import { IPokemon } from '../Interfaces';

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/?limit=160"; //with no limit 898

export const fetchData = async (url: string) => {
  let res = await fetch(url);
  res = await res.json();
  return res;
};

const getAllPokemons = () => {
  return fetchData(POKEMON_API_BASE_URL);
}; 

async function getOnePokeData(pokemon: IPokemon, setStatus: (status: string) => void) {
  const response:any = await fetchData(pokemon.url);
  pokemon.id = response.id;
  pokemon.weight = response.weight;
  pokemon.height = response.height;
  pokemon.types = response.types.map((el: { type: { name: string; }; }) => {
      return el.type.name;
  });
  pokemon.img = response.sprites.front_default;
  pokemon.imgOfficial = response.sprites.other["official-artwork"].front_default;
  setStatus(pokemon.name);
  return pokemon;
}

export async function fetchPokemonsData(setStatus: (status: string) => void, setPokemons: (pokemons: IPokemon[]) => void) {
  setStatus("Searching for pokemons...");
  try {
    const response:any = await getAllPokemons(); 
    const pokemonsPromises = response.results.map( (pokemon: IPokemon) => getOnePokeData(pokemon, setStatus) );
    const pokemons = await Promise.all(pokemonsPromises);
    setPokemons(pokemons);
    setStatus("Done");
  } catch (e) {
      console.error(e);
      setStatus("Oh no, all the pokemons are gone!");
  }
};