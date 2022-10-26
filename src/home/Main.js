import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

import GetBackground from "./GetBackground";
import ImgDiv from "../pokemon/ImgDiv";
import { formatData } from "../formatData";

const Main = ({ pokeData, getPoke }) => {
  return (
    <main>
      {pokeData.map((poke) => {
        let idType = 0;
        const { id, name, types, idFormated, imgMain } = formatData(poke);

        const cardStyle = {
          backgroundColor: GetBackground(types[0].type.name) + "B3",
          border: "none",
        };
        const linkStyle = {
          textDecoration: "none",
          color: "inherit",
        };

        return (
          <Link
            key={id}
            onClick={(e) => {
              getPoke(poke);
            }}
            style={linkStyle}
            to={"/pokemon/" + name}
          >
            <div style={cardStyle} key={id} id={id} className="card">
              <ImgDiv url={imgMain} alt={"poke pic"} />

              <div className="poke-info">
                <h4>
                  <span>{`#${idFormated}`}</span>
                </h4>
                <h2>
                  <span>{name}</span>
                </h2>
                <div className="type">
                  {types.map((tp) => {
                    idType++;
                    const styleType = {
                      backgroundColor: GetBackground(tp.type.name),
                    };
                    return (
                      <p style={styleType} key={idType}>
                        <span>{tp.type.name}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </main>
  );
};

export default Main;
