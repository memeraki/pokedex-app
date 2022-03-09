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
      <br />
      <h1>{pokemon.name}</h1>
      <img src={pokemon.imgOfficial} alt={pokemon.name}/>
      <p> #{pokemon.id >= 100 ? pokemon.id : pokemon.id < 10 ? "00"+pokemon.id: "0"+pokemon.id} </p>
      <p> type: {pokemon.types.map((type: string) => (type+" "))} </p>
      <p> height: {pokemon.height} </p>
      <p> weight: {pokemon.weight} </p>
      <br />
      <div>
        <button onClick={change(pokemon.id-1)} >Previous Pokemon</button>
        <button onClick={change(pokemon.id+1)} >Next Pokemon</button>
      </div>
    </div>
  </div>
  ) : null;
};

export default Pokemon;