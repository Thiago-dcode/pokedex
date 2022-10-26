import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import "./style.css";

import { useFetchBeta } from "../home/useFetchBeta";

import GetBackground from "../home/GetBackground";
import { formatData } from "../formatData";

const Pokemon = ({ getType, pokemon, getPoke }) => {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [pokeInput, error] = useFetchBeta(url, true);
  const [getError, setGetError] = useState(error);
  const [pokeToCharge, setPokeToCharge] = useState(pokemon);

  const [pokeSpecies, errorSpecies, isPending] = useFetchBeta(
    pokeToCharge.species.url,
    true
  );

  const getInput = (target) => {
    setGetError("");
    setInput(target.value);
  };
  const handleSearch = () => {
    if (input) {
      console.log(input);
      setUrl("https://pokeapi.co/api/v2/pokemon/" + input);
    }
  };

  //Changing the body background dinamically with the colours of the type of the pokemon
  useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(to bottom right, ${GetBackground(
      pokeToCharge.types[0].type.name
    )}, ${
      pokeToCharge.types[1]
        ? GetBackground(pokeToCharge.types[1].type.name)
        : GetBackground(pokeToCharge.types[0].type.name)
    }`;
  }, []);

  useEffect(() => {
    if (input && url) {
      setPokeToCharge(pokeInput);
      setGetError(error);
    }
    setInput("");

    setUrl("");
  }, [pokeInput, error]);

  useEffect(() => {
    const stats = pokeToCharge.stats.reduce((obj, stat) => {
      const key = stat.stat.name;
      return {
        ...obj,
        [key]: stat.base_stat,
      };
    }, {});

    console.log(stats);
  }, [pokeToCharge]);

  useEffect(()=>{
   
    setPokeToCharge(formatData(pokemon))

  },[pokemon])

  return (
    <div className="pokemon">
      <div className="container">
        {/*    #######        navbar component     #######      */}

        {Object.entries(pokeToCharge).length !== 0 && (
          <NavBar
            getValue={getInput}
            handleSearch={handleSearch}
            pokeToCharge={pokeToCharge}
            getError={getError}
            pokemon={[1, 2, 3, 4, 5, 6, 9]}
          />
        )}

        {/*    #######        Tittle component       #######    */}

        {Object.entries(pokeToCharge).length !== 0 && (
          <div className="tittle">
            <h1>{pokeToCharge.name}</h1>
          </div>
        )}

        {/*    #######        Main component       #######    */}

        {Object.entries(pokeToCharge).length !== 0 &&
          Object.entries(pokeSpecies).length !== 0 && (
            <Main
              getPoke={getPoke}
              getType={getType}
              pokeToCharge={pokeToCharge}
              pokeSpecies={pokeSpecies}
            />
          )}

        {/*        #######    section evo chain component      #######     */}
      </div>
    </div>
  );
};

export default Pokemon;
