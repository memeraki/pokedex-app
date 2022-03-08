import { MouseEventHandler } from "react";
import { IPokemon } from "../Interfaces";

interface Props {
  pokemon: IPokemon;
  isUp: boolean;
  close(): void;
  change(pokemonId: number): MouseEventHandler;
}

const Pokemon = ({ pokemon, isUp, close, change }: Props) => {

  return isUp ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        close();
      }}
    >
    <div
      className="modal-content"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <button onClick={close} >Close</button>
      <button onClick={change(pokemon.id-1)} >Prev Pokemon</button>
      <button onClick={change(pokemon.id+1)} >Next Pokemon</button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.imgOfficial} alt={pokemon.name}/>
        id: {pokemon.id}<br />
        type: {pokemon.types.map((type: string) => (type+" "))}<br />
        height: {pokemon.height}<br />
        weight: {pokemon.weight}<br />
    </div>
  </div>
  ) : null;
};

export default Pokemon;