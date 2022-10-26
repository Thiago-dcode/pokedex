import React from "react";
import Input from "./Input";
import Btn from "./Btn";

import Search from "./Search";

const NavBar = ({ handleInput, handleSearch, handleType, pressEnter, isSelected }) => {
  return (
    <header className="nav-bar">
      <div className="input">
        <Input
          label={false}
          handleInput={handleInput}
          inputType="text"
          placeholder=" Search by the name or ID"
          className="pokeInput"
          handleKeyPress = {pressEnter}
        />
        <Btn handle={handleSearch} className="btn-input" content="" btnType="button" />
      </div>

      <Search 
      handleBtnType={handleType}
      isSelected = {isSelected}/>
    </header>
  );
};

export default NavBar;
