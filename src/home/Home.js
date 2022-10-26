import React, { useEffect, useState } from "react";
import GetBackground from './GetBackground.js';
import NavBar from "./NavBar";
import Main from "./Main";
import LoadSection from "./LoadSection";
import Warning from "./Warning";
import { useFetchBeta } from "./useFetchBeta";

function Home({ getPoke, getType }) {
  const [data, isPending2, error2] = useFetchBeta(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );

  //useState for getting the data from pokeData and print it
  const [pokeLoaded, setpokeLoaded] = useState(data);

  //useState for reset the loadMore button
  const [checkCharge, setcheckCharge] = useState(true);

  //Grab the input value
  const [classType, setClassType] = useState([]);
  const [input, setInput] = useState("");

  //add more pokemons to print each time pressing the button load more
  const [charge, setCharge] = useState(6);

  //display errors and loading
  const [warning, setWarning] = useState("");

  //handle the button for searching poke by id or name, filtering the
  // the input value
  const handleSearch = () => {
    if (input) {
      setClassType([]);
      setWarning("");
      const re = /^[0-9]*$/;

      setpokeLoaded([]);

      if (checkCharge) {
        setCharge(6);
      }

      const pokeInput = data.filter((poke, i) => {
        if (!re.test(input)) return poke.name.includes(input);
        else return poke.idFormated.toString().includes(input);
      });

      setpokeLoaded(pokeInput);

      setcheckCharge(false);
      if (pokeInput.length === 0 && !isPending2 && !error2) {
        setWarning("Any pokemon matched :(");
      } else if (error2) setWarning(error2);
      else if (isPending2) {
        setWarning("Loading");
        if (
          pokeInput.length === 1 &&
          input.length === 3 &&
          !isNaN(parseInt(input))
        )
          setWarning("");
      }
    }
  };
  //handle the event of pressing Enter button
  const pressEnter = (e) => {
    if (e.nativeEvent.keyCode === 13) handleSearch();
  };

  //Handle the button load More and Load Less.
  const handleLoad = (btn) => {
    if (btn === "more") {
      setCharge(charge + 6);
      if (isPending2) handleSearch();
    } else {
      if (charge > 6) setCharge(charge - 6);
    }
  };

  //filter pokemon by their type.
  const handleFilterType = (target) => {
    if (typeof target !== "object") {
      setClassType([target]);
    } else {
      const getClass = target.parentElement.classList[0];

      const checkClass = [...target.parentElement.classList].includes(
        "selected"
      );

      if (classType.length < 2 || checkClass) {
        setWarning("");
        if (!checkClass) {
          target.parentElement.classList.add("selected");
          setClassType([...classType, getClass]);
        } else {
          target.parentElement.classList.remove("selected");
          const removeClassType = classType.filter((cls) => {
            return cls !== getClass;
          });

          setClassType(removeClassType);
        }
      }
    }
  };
  //Each time the input change, grab it and set it in the useState
  const handleInput = (input) => setInput(input.trim());

  //Change the backGround color basing the type selected

  const setBackGround = () => {
    const style = document.body.style;
    if (classType.length === 0) {
  
      style.backgroundColor = "var(--main-bg-color)";
      style.backgroundImage = ''
      return
      }

      style.backgroundImage =`linear-gradient(to bottom right, ${GetBackground(classType[0])}, ${classType[1]?GetBackground(classType[1]): GetBackground(classType[0])}`


      
  };

  useEffect(()=>{
      setBackGround()
  },[classType])

  // for printing pokemons automatically until aren't a search
  useEffect(() => {
    

    if (!input && classType.length === 0) {
      setWarning("");
      setpokeLoaded(data);

      if (!checkCharge) setCharge(6);
      setcheckCharge(true);
    }
  }, [data, input, classType]);

  useEffect(() => {
    if (classType.length > 0) {
      if (checkCharge) {
        setCharge(6);
      }
      const pokeFiltered = data.filter((poke) => {
        let pokeTypes = [];
        for (const type of poke.types) {
          const typeName = type.type.name;

          pokeTypes.push(typeName);
        }
        return classType.every((tp) => pokeTypes.includes(tp));
      });
      setpokeLoaded(pokeFiltered);
      setcheckCharge(false);
      if (pokeFiltered.length === 0 && !isPending2) {
        setWarning("Doesn't exist pokemos with this types");
      } else if (pokeFiltered.length === 0 && isPending2) {
        setWarning("Loading");
      } else if (!isPending2) setWarning("");
    }
  }, [classType, isPending2, data]);

  useEffect(() => {
    if (
      !input &&
      classType.length === 0 &&
      warning.toLowerCase() === "loading"
    ) {
      handleSearch();
    }
  }, [data, isPending2]);

  useEffect(() => {
    if (getType) handleFilterType(getType);
  }, [getType]);

  useEffect(() => {
    setWarning("");
    if (!error2) return;
    setWarning(error2);
  }, [error2]);
  useEffect(() => {
    document.body.style.backgroundColor = "var(--main-bg-color)";
    if (error2) setWarning(error2);
    if (data.length === 0 && !error2) setWarning("loading");
  }, []);

  return (
    <div className="App">
      <NavBar
        handleInput={handleInput}
        handleSearch={handleSearch}
        handleType={handleFilterType}
        pressEnter={pressEnter}
        isSelected={getType}
      />

      {pokeLoaded && (
        <Main
          pokeData={pokeLoaded.filter((poke, i) => {
            return i < charge;
          })}
          getPoke={getPoke}
        />
      )}
      {pokeLoaded && (
        <LoadSection
          handleLoad={handleLoad}
          charge={charge}
          length={
            pokeLoaded.filter((poke, i) => {
              return i < charge;
            }).length
          }
        />
      )}
      <Warning message={warning} />
    </div>
  );
}

export default Home;
