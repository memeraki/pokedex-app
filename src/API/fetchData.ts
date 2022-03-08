const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/?limit=160"; //with no limit 898

export const fetchData = async (url: RequestInfo) => {
  let res = await fetch(url);
  res = await res.json();
  return res;
};

const getAllPokemons = () => {
  return fetchData(POKEMON_API_BASE_URL);
}; 

async function getOnePokeData(pokemon: { url: RequestInfo; id: any; weight: any; height: any; types: any; img: any; imgOfficial: any;  name: string; }, setStatus: (arg0: string) => void) {
  const responseOne:any = await fetchData(pokemon.url);
  pokemon.id = responseOne.id;
  pokemon.weight = responseOne.weight;
  pokemon.height = responseOne.height;
  pokemon.types = responseOne.types.map((el: { type: { name: any; }; }) => {
      return el.type.name;
  });
  pokemon.img = responseOne.sprites.front_default;
  pokemon.imgOfficial = responseOne.sprites.other["official-artwork"].front_default;
  setStatus(pokemon.name + " caught!");
  return pokemon;
}

export async function fetchPokemonsData(setStatus: (arg0: string) => void, setPokemons: (arg0: any) => void) {
  setStatus("Searching for pokemons...");
  try {
    const response:any = await getAllPokemons(); 
    const pokemonsPromises = response.results.map( (pokemon: any) => getOnePokeData(pokemon, setStatus) );
    const pokemons = await Promise.all(pokemonsPromises);
    setPokemons(pokemons);
    setStatus("Done");
  } catch (e) {
      console.error(e);
      setStatus("Oh no, all the pokemons are gone!");
  }
};