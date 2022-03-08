import React, { useEffect, useState } from 'react';
import './App.css';
import Pokedex from './Components/Pokedex';
import { fetchPokemonsData } from "./API/fetchData";

import { IPokemon } from './Interfaces';

function App() {
  // fetched Pokemons
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  // loading status
  const [status, setStatus] = useState<string>("Let's start");

  useEffect(() => {
    fetchPokemonsData(setStatus, setPokemons);
  }, []);

  return (
    <>
      { status !==  "Done" ? 
        <div className='status'> {status} </div> : 
        <Pokedex pokemons={pokemons}/>}
    </>
  );
}

export default App;
