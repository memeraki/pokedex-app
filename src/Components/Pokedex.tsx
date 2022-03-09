import { MouseEvent, useState } from "react";

import Pokemon from './Pokemon';
import Filters from "./Filters";
import { IPokemon } from '../Interfaces';

interface Props {
  pokemons: IPokemon[];
}

const Pokedex = ({ pokemons }: Props) => {

  // pagination handler
  const [displayed, setDisplayed] = useState<number>(20);

  // filters handler
  const [searchResults, setSearchResults] = useState<IPokemon[]>(pokemons);

  // details modal
  const [modalShown, toggleModal] = useState<boolean>(false);
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>();

  const [theme, setTheme] = useState('dark');
  
  const handleLoadMore = () => {
    setDisplayed(displayed+20);
  }

  const handleOpenModal = (event: MouseEvent<HTMLElement>)=> {
    toggleModal(!modalShown);
    setCurrentPokemon(pokemons[pokemons.findIndex((pokemon: IPokemon) => pokemon.name === event.currentTarget.id)]);
  }

  const changePokemon = (pokemonId: number) => {
    return (event: React.MouseEvent) => {
      setCurrentPokemon(pokemons[pokemons.findIndex((pokemon: IPokemon) => pokemon.id === pokemonId)]);
      event.preventDefault();
    }
  }

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <div className="pokedex" data-theme={theme}>
      <div className="header">
        <h1>Pokedex</h1>
        <button className="mode" onClick={switchTheme}>{theme === 'light' ? 'dark' : 'light'} mode</button>
        <Filters pokemons={pokemons} setSearchResults={setSearchResults}setDisplayed={setDisplayed}/>
      </div>
      <div className="pokemon-list">
        <ul>
          {
            searchResults.slice(0,displayed).map((pokemon:any) => (
              <li key={pokemon.id} onClick={handleOpenModal} id={pokemon.name}>
                #{pokemon.id >= 100 ? pokemon.id : pokemon.id < 10 ? "00"+pokemon.id: "0"+pokemon.id}
                <img src={pokemon.img} alt={pokemon.name}/>
                {pokemon.name} - {pokemon.types.map((type: string) => (type+" "))}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="footer">
        <button onClick={handleLoadMore} className="more">load more pokémons</button>
      </div>
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
