import { useEffect, useState, SyntheticEvent, ChangeEvent } from "react";
import { IPokemon } from "../Interfaces";

interface Props {
  pokemons: IPokemon[];
  setSearchResults(searchResults: IPokemon[]): void;
  setDisplayed(displayed: number): void
}

const Filters = ({ pokemons, setSearchResults, setDisplayed }: Props) => {

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const search = searchInput.toLowerCase();
    const results = pokemons.filter(pokemon =>
      pokemon.name.includes(search)
      || pokemon.types.join().includes(search)
      || pokemon.id.toString().includes(search)
    );
    setSearchResults(results);
  }, [searchInput, pokemons]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }; 

  const handleClear = () => {
    setSearchInput("");
    setDisplayed(20);
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      <input
        type="text"
        id="search"
        placeholder="search by name or type"
        value={searchInput}
        onChange={handleChange}
      ></input>
      <button onClick={handleClear}>Reset</button>
    </form>
  )
};

export default Filters;