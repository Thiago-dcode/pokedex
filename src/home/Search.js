import React from "react";
import Btn from "./Btn";

const Search = ({ handleBtnType, isSelected }) => {
  const types = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  return (
    <div className="search">
      <h4>Search by type</h4>
      <div className="btns-poke-type">
        {types.map((type,i) => {

        
          return (
            <Btn key={i}
              className={isSelected === type? `${type} selected`:type }
              content={type}
              btnType="button"
              handle={handleBtnType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
