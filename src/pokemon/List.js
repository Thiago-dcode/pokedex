import React, { useEffect, useState } from "react";

const List = ({ className, data, title }) => {
  let id = 0;
  return (
    <div className={className}>
      {title && <div>{title}</div>}

      <ul>
        {data.map((obj) => {
          const [name, value] = obj;
          id++;
          return (
            <li key={id}>
              <h4>{`${name}: `}</h4>
              <span>{value ? value : "unknown"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
