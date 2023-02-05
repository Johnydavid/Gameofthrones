// Title of the Webpage

const titleDiv = document.createElement("div");

titleDiv.className = "bodyClass";

document.body.append(titleDiv);

// Main DIV
const mainDiv = document.createElement("div");

mainDiv.className = "table-responsive ";

document.body.append(mainDiv);

// Creating Table Elements
const tableEle = document.createElement("table");
tableEle.className = " table table-primary";

tableEle.id = "table";

// Creating Table Head Elements
const theadEle = document.createElement("thead");
// theadEle.className = "table-dark";

// Creating Table Tr Elements
const trEle = document.createElement("tr");

["Character Names", "", "Quotes"].forEach((columnName) => {
  // Creating Table Head Elements
  const thEle = document.createElement("th");
  thEle.className = " table-dark";
  thEle.innerText = columnName;
  trEle.appendChild(thEle);
});

theadEle.appendChild(trEle);

// Creating Table Body Elements
const tbodyEle = document.createElement("tbody");

const innerTr = document.createElement("tr");

tbodyEle.append(innerTr);

tableEle.append(theadEle, tbodyEle);
tableEle.className = "container ";

mainDiv.appendChild(tableEle);

// Creating Empty Array for displaying characters
var globalData = [];

var currPage = 0;

const getCharacters = async () => {
  try {
    const response = await fetch(
      "https://api.gameofthronesquotes.xyz/v1/characters"
    ); // Fetching data from API
    const characters = await response.json(); // Getting data in json format

    globalData = characters;

    characters.slice(currPage, 1).forEach((character) => {
      // Map used for destructuring the values of the Objects and stored as an array
      const characterNames = ["name"].map((values) => character[values]);

      const quotes = ["quotes"].map((values) => character[values].slice(0, 1));

      // ForEach used for creating td elements of the body from the required values stored in the array
      characterNames.forEach((names) => {
        const characterName = document.createElement("td");
        const gotTd = document.createElement("td");
        gotTd.className = "shield";
        characterName.className = "nameFont";

        characterName.innerText = names;
        innerTr.append(characterName, gotTd);
      });

      quotes.forEach((quote) => {
        const characterQuotes = document.createElement("td");
        characterQuotes.innerText = `" ${quote} "`;
        characterQuotes.className = "characterFont";
        innerTr.append(characterQuotes);
      });

      tbodyEle.appendChild(innerTr);
    });
  } catch (error) {
    console.log(error);
  }
};

getCharacters();

// Creating Function to display Pages

const populateTable = (startIndex, endIndex) => {
  globalData.slice(startIndex, endIndex).forEach((character) => {
    const innerTr = document.createElement("tr");

    // Map used for destructuring the values of the Objects and stored as an array
    const characterNames = ["name"].map((values) => character[values]);

    const quotes = ["quotes"].map((values) => character[values].slice(0, 1));

    // ForEach used for creating td elements of the body from the required values stored in the array
    characterNames.forEach((names) => {
      const characterName = document.createElement("td");
      const midTd = document.createElement("td");
      midTd.className = "shield";
      characterName.innerText = names;
      characterName.className = "nameFont";

      innerTr.append(characterName, midTd);
      characterName.style.borderSpacing = "10px";
    });

    quotes.forEach((quote) => {
      const characterQuotes = document.createElement("td");
      characterQuotes.innerText = `" ${quote} "`;
      characterQuotes.className = "characterFont";
      innerTr.append(characterQuotes);
    });

    tbodyEle.appendChild(innerTr);
  });
// inserting audio to previous and next buttons
  const btnAction = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-metal-hit-woosh-1485.mp3"
    );
    audio.play();
  };

  btnAction();
};

// Buttons Div
const btnsDiv = document.createElement("div");


btnsDiv.className = "container sm-12,text-center buttonClass";

// Next Button
const nextBtn = document.createElement("button");

nextBtn.title = "Hit the Sword to meet the Next Characters";

nextBtn.className = "nextBtn";

// Previous Button

const prevBtn = document.createElement("button");

prevBtn.title = "Hit the Sword to meet the Previous Characters";

prevBtn.className = "prevBtn";

const showNextSetOfData = (prev = false) => {
  if (prev && currPage > 0) currPage--;
  else if (!prev && currPage < 25) currPage++;
  else return;

  tbodyEle.innerHTML = "";

  const startIndex = currPage * 1;

  const endIndex = currPage + 1;

  populateTable(startIndex, endIndex);
};

//  Creating Action to Next Button using addEventListener
nextBtn.addEventListener("click", () => showNextSetOfData());

//  Creating Action to Previous Button using addEventListener

prevBtn.addEventListener("click", () => {
  showNextSetOfData(true);
});
btnsDiv.append(prevBtn, nextBtn);
mainDiv.append(btnsDiv);

const scrollDown=()=>{
  window.scrollTo({ bottom: 0, left: 0, behavior: "smooth" });
};

mainDiv.addEventListener("mouseenter",()=>{

  scrollDown();

})
