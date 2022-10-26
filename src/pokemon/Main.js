import { Link } from "react-router-dom";
import List from "./List";
import Btn from "../home/Btn";
import RadarChart from "./RadarChart";
import ResponsiveComponent from "./ResponsiveComponent";
import ImgDiv from "./ImgDiv";
import { useState } from "react";
import { useEffect } from "react";
import { useFetchBeta } from "../home/useFetchBeta";
import { default as MainHome } from "../home/Main";

const Main = ({
  pokeToCharge,
  pokeSpecies,
  getType,
  handlePrevNext,
  getPoke,
}) => {
  /*                   #######  HOOKS     #######                         */

  const [width, setWidth] = useState();
  const [totalStat, setTotalStat] = useState(0);
  const [urlAbil, seturlAbil] = useState([]);
  const [habilities, setHabilities] = useState([]);
  const [fetchHability, isPending, error] = useFetchBeta(urlAbil, true);
  const [fetchEvo, isPendingEvo, errorEvo] = useFetchBeta(
    pokeSpecies.evolution_chain.url,
    true
  );
  const [urlEvoPokes, setUrlEvoPokes] = useState("");
  const [evoPokes, isPendingEvoPokes, errorIsEvoPoke] = useFetchBeta(
    urlEvoPokes,
    true
  );
  const [chartData, setChartData] = useState(() => {
    let total = 0;
    const ObjkeyValue = pokeToCharge.stats.reduce((obj, stat) => {
      const key = stat.stat.name;

      total += stat.base_stat;

      return {
        ...obj,
        [key]: stat.base_stat,
      };
    }, {});

    setTotalStat(
      pokeToCharge.stats.reduce((i, stat) => {
        return i + stat.base_stat;
      }, 0)
    );
    const [label, data, colour] = [
      Object.keys(ObjkeyValue),
      Object.values(ObjkeyValue),
      Object.keys(ObjkeyValue).map((stat) => {
        const stats = {
          hp: "#D8380F",
          attack: "#7E3626",
          defense: "#949187",
          ["special-attack"]: "#3892EC",
          ["special-defense"]: "#92832C",
          speed: "#D48634",
        };

        return stats[stat];
      }),
    ];
    return {
      labels: label,
      datasets: [
        {
          label: "Base Stats",
          data: data,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    };
  });

  //get all pics of the current pokemon by iter
  const [spritePics, setSpritePics] = useState(() => {
    let urls = [];
    //iterate over all objects nested in the object passed as a parameter
    //If find a string, push it into urls
    const iterate = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key]) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            iterate(obj[key]);
          } else {
            const keySplited = key.split("_");
            const keyFormated = `${keySplited[0]} ${keySplited[1]}`;

            urls.push([keyFormated, obj[key]]);
          }
        }
      });
    };
    iterate(pokeToCharge.sprites);
    console.log({ urls });

    return urls;
  });

  const [gifs, setGif] = useState(() => {
    let normal = [];

    let shiny = [];
    let gif = false;

    spritePics.reverse().forEach((pic, i) => {
      const [key, url] = pic;
      const urlSplited = url.split(".");
      const getPic = () => {
        const [frontBack, defaultShiny] = key.split(" ");

        defaultShiny === "shiny" ? shiny.push(pic) : normal.push(pic);
      };

      if (urlSplited[urlSplited.length - 1] === "gif") {
        gif = true;
        getPic();
      } else if (
        i <= spritePics.length - 1 &&
        i > spritePics.length - 5 &&
        !gif
      ) {
        getPic();
      }
    });
    console.log(normal);
    return [...normal, ...shiny];
  });

  useEffect(() => {
    console.log(gifs);
  }, [gifs]);

  useEffect(() => {
    seturlAbil([]);
    const abis = pokeToCharge.abilities.map((hab) => hab.ability.url);
    seturlAbil(abis);
  }, []);
  useEffect(() => {
    console.log(fetchEvo);
    let urlsPoke = [];

    const getEvoNames = (obj) => {
      try {
        const urlPoke = "https://pokeapi.co/api/v2/pokemon/" + obj.species.name;
        console.log(urlPoke);
        console.log(obj.evolves_to);
        if (typeof urlPoke === "undefined") return;
        urlsPoke.push(urlPoke);
        getEvoNames(obj.evolves_to[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getEvoNames(fetchEvo.chain);
    setUrlEvoPokes(urlsPoke);
  }, [fetchEvo]);
  useEffect(() => {
    console.log(evoPokes);
  }, [evoPokes]);
  useEffect(() => {
    const abis = fetchHability.map((abi) => {
      return {
        name: abi.name,
        effect: abi["effect_entries"][1].effect,
      };
    });
    setHabilities(abis);
  }, [fetchHability]);
  useEffect(() => {}, [pokeToCharge]);

  useEffect(() => {}, [habilities]);
  window.addEventListener("resize", (e) => {
    setWidth(window.innerWidth);
  });
  useEffect(() => {
    getPoke(pokeToCharge);
  }, [getPoke]);

  return (
    <main>
      {/* poke img && poke info Div */}

      <div className="img-info-stat main-child">
        <ImgDiv
          className="img-div main-child-child"
          url={pokeToCharge.imgMain}
          alt={"poke pic"}
        />
        <div className="info-type main-child-child">
          <List
            className="list info-stats"
            title={<h3>{"poke info"}</h3>}
            data={Object.entries({
              "National №": pokeToCharge?.idFormated,
              Color: pokeSpecies.color?.name,
              height:
                pokeToCharge.height / 10 === 1
                  ? pokeToCharge.height / 10 + " meter"
                  : pokeToCharge.height / 10 + " meters",
              weight: pokeToCharge?.weight / 10 + " kg",
            })}
          />
          <div className="type">
            {pokeToCharge.types.map((type, i) => {
              return (
                <Link key={i} to="/">
                  <Btn
                    className={`${type.type.name} btn-type`}
                    content={type.type.name}
                    btnType={"button"}
                    arg={type.type.name}
                    handle={getType}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* ######## EVO CHAIN ####### */}
      {Array.isArray(evoPokes) && (
        <ResponsiveComponent
          content={"Evolution"}
          element={
            <div className="evo-pokes">
              {evoPokes
                .sort((a, b) => {
                  return a.id - b.id;
                })
                .map((poke, i) => {
                  if (evoPokes.length === 1) {
                    return (
                      <div>
                        <h2> {evoPokes[0].name + " don't evolve"} </h2>
                      </div>
                    );
                  }
                  return (
                    <div className="card-arrow"
                   
                    >
                      <MainHome pokeData={[poke]} getPoke={getPoke} />{" "}
                      {i !== evoPokes.length - 1 && (
                        <span className="arrow"
                        
                        ></span>
                      )}{" "}
                    </div>
                  );
                })}

              {/* */}
            </div>
          }
        />
      )}

      {/* { Array.isArray(evoPokes) && evoPokes.length > 1 && <div
            className="evo-pokes">

              {evoPokes.sort((a,b)=>{
                    return a.id -b.id
                  }).map(poke =>{

                  return  <MainHome
                  pokeData={[poke]}
                  getPoke = {getPoke}
                  />

              })}


      </div>
      } */}

      {/*     ################           poke    ##############      */}
      <div className="sprites-abilities">
        <ResponsiveComponent
          content={"sprites"}
          element={
            <div className="sprites">
              {gifs.map((gif, i) => {
                const [key, url] = gif;

                return (
                  <div>
                    <h6>{key}</h6>
                    <div>
                      <img key={i} src={url} alt="poke-sprite" />
                    </div>
                  </div>
                );
              })}
            </div>
          }
        />
      </div>

      {/*~~~~~~~ extra stats && base stats chart Div ~~~~~~~~*/}
      <div className="stats main-child">
        {/*     #######       base stats component      #######     */}

        {Object.entries(pokeSpecies).length !== 0 && (
          <List
            className={"list extra-stats main-child-child"}
            title={<h3>{"extra stats"}</h3>}
            data={Object.entries({
              generation: pokeSpecies.generation?.name,
              "base happiness": pokeSpecies.base_happiness,
              "capture rate": pokeSpecies.capture_rate,
              "growth rate": pokeSpecies.growth_rate.name,
              "egg group": pokeSpecies.egg_groups
                ?.map((egg) => {
                  return egg.name;
                })
                .join(" ,"),
            })}
          />
        )}

        {/*  ###### RADAR CHART COMPONENT ######*/}

        {Object.entries(chartData).lenght !== 0 && (
          <div className="list chart-stat main-child-child">
            <div>
              {" "}
              <h3>Base Stats</h3>{" "}
            </div>
            <div
              className="chart"
              style={{
                width: width < 1101 ? width : 600,
                position: "relative",
                left: -15,
              }}
            >
              <RadarChart
                type={"radar"}
                chartData={chartData}
                options={{
                  maintainAspectRatio: true,
                  responsive: true,

                  plugins: {
                    legend: {
                      display: false,
                      labels: {
                        color: "white",

                        font: {
                          size: width < 1101 ? "20min" : "40vmin",
                        },
                      },
                    },
                  },

                  elements: {
                    line: {
                      borderWidth: 3,
                    },
                  },

                  scales: {
                    r: {
                      angleLines: {
                        color: "white",
                      },
                      scaleLabel: { fontSize: 4 },
                      pointLabels: {
                        color: "white",
                        font: {
                          size: width < 1101 ? "10vmin" : "15vmin",
                        },
                      },
                      grid: {
                        color: "white",
                      },
                      max: 255,
                      min: 1,
                      ticks: {
                        stepSize: width < 526 ? 45 : 25,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="total">
              <h4>{"Total: " + totalStat}</h4>
            </div>
          </div>
        )}
      </div>

      {/* <ResponsiveComponent
          content={"abilities"}
          element={
            <div className="abilities">
              {habilities.map((ab, i) => {
                const { name, effect } = ab;

                return (
                  <div>
                    <a
                      target="_blank"
                      href={
                        "https://pokemondb.net/ability/adaptability/" + name
                      }
                    >
                      <h6>{name}</h6>
                    </a>
                    <p>{effect}</p>
                  </div>
                );
              })}
            </div>
          }
        /> */}
    </main>
  );
};

export default Main;
