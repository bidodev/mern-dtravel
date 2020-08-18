/**
 * Function to capitalize the first letter of each word.
 * @param {string}
 */
const sanitizeNames = (str) => {
  return str
    ? str
        .split(" ")
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(" ")
    : "null";
};

export default sanitizeNames;
