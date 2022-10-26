import { useEffect, useState } from "react";
import { formatData } from "../formatData";
export const useFetchBeta = (urlGlobal, onlyOne = false) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setData([])
    if (!urlGlobal) {
      setData("This url don't exist");
      return;
    }
    setIsPending(true);
    const getData = async (url) => {
      // const formatData = (obj) =>{



      //   const idFormated =
      //   obj.id < 10
      //     ? `00${obj.id}`
      //     : obj.id < 100
      //     ? `0${obj.id}`
      //     : `${obj.id}`;
      // return {
      //   idFormated: idFormated,
      //   imgMain: obj.sprites.other["official-artwork"].front_default,
      //   ...obj,
      // };
      // }
      try {
        const response = await fetch(url);
        if (response.ok) {
          setError("");
          const dataJson = await response.json();

          if (!onlyOne) {
          
            for (const poke of dataJson.results) {
              const response = await fetch(poke.url);
              if (!response.ok) {
                setError(`Error ${response.status} ${response.statusText}`);
                setIsPending(false);
              } else {
                setError("");

                setIsPending(true);
                const dataJson = await response.json();
              

                setData((prevData) => [...prevData, formatData(dataJson)]);
              }
            }
            console.log(data);
          } else {
            if (typeof urlGlobal === "string") {
              setData(dataJson);
              return;
            }

            setData((data) => [...data, dataJson]);
          }
          setIsPending(false);
        } else {
          setError(`Error ${response.status} ${response.statusText}`);
          setIsPending(false);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      setIsPending(false);
    };

    if (typeof urlGlobal === "string") {
      getData(urlGlobal);
      return;
    }
    urlGlobal.forEach((ur) => {
      getData(ur);
    });
  }, [urlGlobal]);
  return [data, isPending, error];
};
