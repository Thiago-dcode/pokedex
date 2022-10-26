

export const GetBackground = (type) => {
  switch (type) {
    case "bug":
      return "#94862E";
    case "dark":
      return "#252426";
    case "dragon":
      return "#686DB8";
    case "electric":
      return "#D48634";
    case "fairy":
      return "#EFB7F0";
    case "fighting":
      return "#7E3626";
    case "fire":
      return "#D8380F";
    case "flying":
      return "#6C79DA";
    case "ghost":
      return "#575FA7";
    case "grass":
      return "#79BF3E";
    case "ground":
      return "#D9A24B";
    case "ice":
      return "#78D3F4";
    case "normal":
      return "#A4A1A5";
    case "poison":
      return "#7D4B79";
    case "psychic":
      return "#E6454C";
    case "rock":
      return "#92832C";
    case "steel":
      return "#949187";
    case "water":
      return "#3892EC";
  }
};

export default GetBackground;
