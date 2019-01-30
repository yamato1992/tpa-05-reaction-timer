const getRandomInt = function(min, max) {
  const range = Math.floor(max) - Math.ceil(min);
  return Math.floor(Math.random() * range) + min;
};

const getOrdinalNum = function(num) {
  let suffix;
  switch (num % 10) {
  case 1:
    suffix = num % 100 === 11 ? 'th' : 'st';
    break;
  case 2:
    suffix = num % 100 === 12 ? 'th' : 'nd';
    break;
  case 3:
    suffix = num % 100 === 13 ? 'th' : 'rd';
    break;
  default:
    suffix = 'th';
  }
  return String(num) + suffix;
};

export {
  getRandomInt,
  getOrdinalNum,
};
