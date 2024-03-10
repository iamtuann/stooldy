
export const decToBin = (decimal) => {
  return Number(decimal).toString(2);
}

export const decToBinArray = (decimal) => {
  const bin = Number(decimal).toString(2);
  return bin.split("");
}