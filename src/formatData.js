export const formatData = (obj) =>{



    const idFormated =
    obj.id < 10
      ? `00${obj.id}`
      : obj.id < 100
      ? `0${obj.id}`
      : `${obj.id}`;
  return {
    idFormated: idFormated,
    imgMain: obj.sprites.other["official-artwork"].front_default,
    ...obj,
  };
  }