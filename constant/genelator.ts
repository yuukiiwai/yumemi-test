const get150 = () => {
  return Math.floor(Math.random() * 170);
};

export const getRandomColor = () => {
  const red = get150();
  const green = get150();
  const blue = get150();
  return "rgb(" + red + "," + green + "," + blue + ")";
};
