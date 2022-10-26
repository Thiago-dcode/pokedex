import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Btn from "../home/Btn";

import GetBackground from "../home/GetBackground";

import Input from "../home/Input";
import { useFetchBeta } from "../home/useFetchBeta";

const NavBar = ({
  pokeToCharge,
  pokemon,
  getValue,
  handleSearch,
  backPage,
  getError,
  handlePrevNext,
}) => {
  const [navStyle, setNavStyle] = useState({});
  const [btnStyle, setbtnStyle] = useState({});
  const [input, setInput] = useState(pokeToCharge.name);
  const [pokePrev, errorPrev] = useFetchBeta(
    "https://pokeapi.co/api/v2/pokemon/" + (pokeToCharge.id - 1),
    true
  );
  const [pokeNext, errorNext] = useFetchBeta(
    "https://pokeapi.co/api/v2/pokemon/" + (pokeToCharge.id + 1),
    true
  );

  const getTo = async () => {
    await getError;

    if (getError) {
      console.log(pokeToCharge.name);
      setInput(pokeToCharge.name);
    } else setInput(input);
  };
  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {

    try {
      const navStyle = {
        backgroundColor: GetBackground(pokeToCharge.types[0].type.name) + "D9",
      };
      setNavStyle(navStyle);
    } catch (error) {
      console.log(error);
    }
  }, [pokeToCharge]);
  useEffect(()=>{


      try{
        console.log( GetBackground(pokePrev.types[0].type.name) + "D9",)
        console.log(pokeNext.types[0].type.name)
          const btnStyle = {

              prevBtn: {
                backgroundColor: GetBackground(pokePrev.types[0].type.name) + "D9",
              },
              nextBtn: {
                backgroundColor: GetBackground(pokeNext.types[0].type.name) + "D9",
              }

          }
          setbtnStyle(btnStyle)
      }
      catch(error){
          console.log(error)
      }


  },[pokeNext, pokePrev])

  return (
    <nav className="container-child" >
      <div className="prev-next">
        {Object.entries(pokePrev).length !== 0 && (
          <Btn
          style={btnStyle.prevBtn}
            className={"prev-btn btn"}
            content={`← ${pokePrev.name}`}
            handle={handlePrevNext}
            arg={pokePrev.name}
          />
        )}
           <div className="input-btn-poke">
      <Input
        placeholder={"search for a poke by name or id"}
        className={"input-div"}
        handleInput={getValue}
        inputType={"text"}
      />

      <Btn
        handle={handleSearch}
        className="btn-div"
        content="search"
        btnType="button"
      />
      </div>

        {Object.entries(pokeNext).length !== 0 && (
          <Btn
          style={btnStyle.nextBtn}
            className={"next-btn btn"}
            content={`${pokeNext.name} →`}
            handle={handlePrevNext}
            arg={pokeNext.name}
          />
        )}
      </div>
     
    </nav>
  );
};

export default NavBar;
