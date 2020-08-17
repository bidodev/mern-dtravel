//function to scroll into the results
const smoothScroll = () => {
  const element = document.getElementById("offers");

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};



export default smoothScroll