export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function hexToRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16); // start at 1 to skip the #
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return [r, g, b];
}
const colorsHex = ['#F6412D', '#FF5607', '#FF9800', '#FFC100', '#FFEC19']

export function getColor(rating) {
  var colorsRGB =  colorsHex.map(hexToRGB);
  // if rating is an integer, return the corresponding color
  if (rating % 1 === 0) {
    return colorsHex[rating - 1];
  }
  // Clamp the rating between 1 and 5
  rating = Math.min(Math.max(rating, 1), 5);

  // Determine the index of the first color in the list
  const index = Math.floor(rating - 1);

  // Calculate the percentage of interpolation between the two colors
  const percentage = rating - 1 - index;

  // Get the first and second colors from the list
  const color1 = colorsRGB[index];
  const color2 = colorsRGB[index + 1];
  //console.log(color1, color2, percentage);

  // Function to convert a color to its hexadecimal representation
  const toHex = (color) => {
    return '#' + color.map((component) => component.toString(16).padStart(2, '0')).join('');
  };

  // Function to interpolate between two colors
  const interpolateColors = (color1, color2, percentage) => {
    const resultColor = color1.map((component, i) => {
      const delta = color2[i] - component;
      return Math.round(component + delta * percentage);
    });
    return resultColor;
  };

  // Interpolate the colors and convert the result to hexadecimal
  const interpolatedColor = interpolateColors(color1, color2, percentage);
  const hexadecimalColor = toHex(interpolatedColor);

  return hexadecimalColor;
}


