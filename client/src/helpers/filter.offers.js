//
/* let numOfCalls = 0; */


const handleOfferSearch = ({ input }, fulldata) => {
  let numOfBestMatches = 0;

  //prevent empty input treating
  if (input === undefined || input === null) {
    const firstNItems = [];
    (() => {
      fulldata.forEach(element => {
        firstNItems.push(element)
      });

    })();
    return firstNItems;
  }
  //search goes a bit smarter
  //------
  //tools for data/input request comparing
  //accepting results that meets: 2 of 3/3 of 4/4 of 5 matches, allowing an user be less precise
  //also best match gets {bestMatch: true}
  const numOfMatches = {
    //leaves an entry point for custom this.max values
    get min() {
      //handles also one word search
      return inputArr.length === 1
        ? inputArr.length
        : Math.floor((inputArr.length * 3) / 4);
    },
    current: 0,
  };
  //storage for matches
  const resultObjsArr = [];
  //treats when the input isn't an array but one item string
  const inputArr = input.constructor !== Array ? input.split(" ") : input;
  //handling string/number case
  fulldata = fulldata.constructor !== Array ? fulldata.split(" ") : fulldata;
  //first, handling a loop for an outer cycle, JSON/array of objects
  fulldata.forEach((fulldataElem) => {
    //cache side effect
    fulldataElem.bestMatch = false;
    /* console.log(fulldataElem.bestMatch) */
    if(fulldataElem.id.toString() === "404") { return}
    //checking every item {currentObj} in offers.db how it meets the query input
    inputArr.forEach((inputElem) => {
      inputElem = inputElem.toLowerCase();
      //handleSearch assigns every obj a matching rank
      let fulldataElemToArr = fulldataElem;

      if (fulldataElem.constructor === Object) {
        fulldataElemToArr = Object.entries(fulldataElem);
      }
      //now we are inside of an Object
      for (let [key, value] of fulldataElemToArr) {
        if (key === "description" || key === "src") {
          continue;
        }
        if (value === inputElem) {
/*           console.warn(value);
          console.warn("PASSED " + inputElem); */
          numOfMatches.current++;
        } else {
          //same idea for spellCheck
          const valueToStr = value.toString();
          const spellNumOfMatches = {
            get min() {
              return valueToStr.length < 2
                ? 2
                : Math.floor(valueToStr.length / 2 + 1);
            },
            current: 0,
          };
          const controlSum =
            inputElem.length > valueToStr.length
              ? valueToStr.length
              : inputElem.length;
          for (let i = 0; i < controlSum; i++) {
            if (i > controlSum - 2) {
              continue;
            } else {
              const inputSubStr = inputElem.substring(i, i + 2);
              if (valueToStr.includes(inputSubStr)) {
                spellNumOfMatches.current++;
              }
            }
          }
          for (let i = 0; i < controlSum; i++) {
            if (i > controlSum - 2) {
              continue;
            } else {
              const inputSubStr = inputElem.substring(i, i + 3);
              if (valueToStr.includes(inputSubStr)) {
/*                 console.warn(valueToStr);
                console.warn("PASSED " + inputSubStr); */
                spellNumOfMatches.current++;
              }
            }
          }
          for (let i = 0; i < controlSum; i++) {
            if (i > controlSum - 3) {
              continue;
            } else {
              const inputSubStr = inputElem.substring(i, i + 4);
              if (valueToStr.includes(inputSubStr)) {
/*                 console.warn(valueToStr);
                console.warn("PASSED " + inputSubStr); */
                spellNumOfMatches.current++;
                spellNumOfMatches.current++;
              }
            }
          }
          if (inputElem[0] === valueToStr[0]) {
/*             console.warn(valueToStr);
            console.warn("PASSED " + inputElem); */
            spellNumOfMatches.current++;
          }
          if (inputElem.substring(0,4) === valueToStr.substring(0,4)) {
/*             console.warn(valueToStr);
            console.warn("PASSED " + inputElem); */
            spellNumOfMatches.current = 100;
          }
          if (spellNumOfMatches.current >= spellNumOfMatches.min) {
/*             console.warn(value);
            console.warn("PASSED " + inputElem); */
            numOfMatches.current++;
          }
        }
      }
      return;
    });
    //now checking if current item doesn't fit, fits or fits best
    if (numOfMatches.current === numOfMatches.min) {
      resultObjsArr.push(fulldataElem);
    } else if (
      numOfMatches.current >= numOfMatches.min ||
      numOfMatches.current >= inputArr.length
    ) {
      if (fulldataElem.constructor === Object) {
        if (numOfBestMatches < 2) {
          fulldataElem["bestMatch"] = true;
          numOfBestMatches++;
        }
      }
      resultObjsArr.push(fulldataElem);
    }
    numOfMatches.current = 0;
  });
  //if nothing matches
  if (resultObjsArr.length < 1) {
    return [
      {
        "id": 404,
        "productName": "Neverland",
        "continent": "Neverland",
        "description": "Try one more time",
        "photo": "../public/img/404.png",
        "cover": {
          "url": "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          "description": "The Colosseum or Coliseum, also known as the Flavian Amphitheatre"
        },
        "country": "Neverland",
        "prices": "sure, you want to know",
        "type": "Neverland",
        "difficulty": "easy",
        "bestMatch": false
      }
    ];
  }
  if (resultObjsArr.length === 1) {
    if (numOfBestMatches < 2) {
    resultObjsArr[0]["bestMatch"] = true;
    numOfBestMatches++;
    }
  } 
  //otherwise what we need
  console.log(resultObjsArr);
  return resultObjsArr;
};

export default handleOfferSearch;
