import { MouseEvent, FC, useEffect, useState, SetStateAction } from "react";
import { fetchPokemonsData } from "../API/fetchData";

import Pokemon from './Pokemon'
import { IPokemon } from '../Interfaces'

const Pokedex: FC = () => {

  // fetched Pokemons
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  // loading status
  const [status, setStatus] = useState<string>("Let's start");
  // pagination handler
  const [displayed, setDisplayed] = useState<number>(20);

  // filters handler
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IPokemon[]>(pokemons);

  // details modal
  const [modalShown, toggleModal] = useState<boolean>(false);
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>();

  useEffect(() => {
    fetchPokemonsData(setStatus, setPokemons);
  }, []);
  
  useEffect(() => {
    const search = searchInput.toLowerCase();
    const results = pokemons.filter(pokemon =>
      pokemon.name.includes(search)
      || pokemon.types.join().includes(search)
      || pokemon.id.toString().includes(search)
    );
    setSearchResults(results);
  }, [searchInput, pokemons]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchInput(event.target.value);
  }; 

  const handleClear = (e: any) => {
    setSearchInput("");
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const handleLoadMore = () => {
    setDisplayed(displayed+20);
  }

  const handleOpenModal = (event: MouseEvent<HTMLElement>) => {
    toggleModal(!modalShown);
    setCurrentPokemon(pokemons[pokemons.findIndex((pokemon: IPokemon) => pokemon.name === event.currentTarget.id)]);
  }

  const changePokemon = (pokemonId: number) => {
    return (event: React.MouseEvent) => {
      setCurrentPokemon(pokemons[pokemons.findIndex((pokemon: IPokemon) => pokemon.id === pokemonId)]);
      event.preventDefault();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            id="search"
            placeholder="pikachu"
            value={searchInput}
            onChange={handleChange}
          ></input>
          <span data-tip data-for='info'> ? </span>
          <button onClick={handleClear}>Clear search</button>
      </form>
      <div className="pokemon-list">
        {status !==  "Done" ? status : 
          <ul>
          {
            searchResults.slice(0,displayed).map((pokemon:any) => (
              <li key={pokemon.id} onClick={handleOpenModal} id={pokemon.name}>
                <div>
                  <img src={pokemon.img} alt={pokemon.name}/>
                  {pokemon.name} - #{pokemon.id >= 100 ? pokemon.id : pokemon.id < 10 ? "00"+pokemon.id: "0"+pokemon.id} - {pokemon.types.map((type: string) => (type+" "))}
                </div>
              </li>
            ))
          }
        </ul>
        }
      </div>
      <button onClick={handleLoadMore}>load more pokémons</button>
      { currentPokemon && <Pokemon
        pokemon={currentPokemon}
        isUp={modalShown}
        close={() => {
        toggleModal(false);
        }}
        change={changePokemon}
      /> }
    </div>
  );
};

export default Pokedex;
