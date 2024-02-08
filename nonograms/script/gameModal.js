import {gameData as allGameData} from "./data.js";
import {createBoard, gameRestart} from "./main.js";

let firstStart = false;
const data = {
  level: Object.keys(allGameData),
  //  variants:
};

Object.keys(allGameData).forEach((el, i) => {
  data[el] = Object.keys(allGameData[el]);
  // console.log(i);
  // console.log(Object.keys(allGameData[el]));
});
console.log(data);

document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.querySelector("#modal-btn"),
    waring = document.querySelector(".waring");

  let gameData = {};

  // ------------- select  nonogram for  start game
  const selectNonogram = (level) => {
    const selectNonogram = document.querySelector("#select-nonogram"),
      selectNonogramInfo = document.querySelector(".select-nonogram-info"),
      gameTitle = document.querySelector(".game-title");

    selectNonogramInfo.textContent = "";

    selectNonogram.innerHTML =
      '<option value="" disabled="" selected>Select nonogram</option>';

    const data = allGameData[level];
    Object.keys(data).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectNonogram.appendChild(selectOptions);
    });

    selectNonogram.addEventListener("change", (e) => {
      waring.textContent = "";
      gameData = data[e.target.value];
      selectNonogramInfo.textContent = `You chose the level ${level}, Nonogram - ${e.target.value}`;
      gameTitle.textContent = `Level ${level} Nonogram - ${e.target.value} `;
      // gameDecr.textContent = `Level ${level} `;
    });
  };

  //  ------------- open modal start game
  const gameStart = () => {
    const gameModal = document.querySelector(".modal_container"),
      modalContent = document.querySelector(".modal_content"),
      selectLevel = document.querySelector(".select-level");

    gameModal.classList.add("show");
    modalContent.classList.add("show");

    Object.keys(allGameData).forEach((el, i) => {
      const selectOptions = document.createElement("option");
      selectOptions.classList.add("select-options");
      selectOptions.text = el;
      selectOptions.value = el;
      selectLevel.appendChild(selectOptions);
      // console.log("create options");
    });

    selectLevel.addEventListener("change", (e) =>
      selectNonogram(e.target.value)
    );
  };

  //   close modal and start game
  modalButton.addEventListener("click", () => {
    if (Object.keys(gameData).length > 0) {
      waring.textContent = "";
      document.querySelector(".modal_container").classList.remove("show");
      document.querySelector(".modal_content").classList.remove("show");
      document.querySelector("#audio").pause();

      createBoard(gameData);
      // createNonogramPromptColumn(gameData);
    } else {
      waring.textContent =
        "Please select a nonogram and level to start the game!";
    }
  });

  // gameStart();
  gameStart();

  if (!firstStart) {
    document.querySelector(".modal_container").classList.remove("show");
    document.querySelector(".modal_content").classList.remove("show");
    const gameTitle = document.querySelector(".game-title");
    gameTitle.textContent = "Level Easy - 5x5 Nonogram - tower ";

    gameData = allGameData["Easy - 5x5"].tower;
    createBoard(allGameData["Easy - 5x5"].tower);
    firstStart = !firstStart;
  }

  document.querySelector("#random-game").addEventListener("click", () => {
    console.log(allGameData);
    let randomLevel = [Math.floor(Math.random() * data.level.length)];
    let randomLevelName = data.level[randomLevel].trim();

    let randomNameIndex = [
      Math.floor(Math.random() * data[randomLevelName].length),
    ];

    let randomNonogramName = data[randomLevelName][randomNameIndex].trim();
    console.log(randomLevelName);
    console.log(randomNameIndex);
    console.log(randomNonogramName);
    console.log(allGameData[randomLevelName][randomNonogramName]);
    // console.log(allGameData["Hard  - 15x15"]["robot "]);
    gameRestart();
    createBoard(allGameData[randomLevelName][randomNonogramName]);
    // console.log("data.level[randomLevel]", data.level[randomLevel]);
    // console.log(
    //   "data.level[randomLevel][nonogramNameIndex]",
    //   data.level[randomLevel][nonogramNameIndex]
    // );
    // console.log("nonogramNameIndex", nonogramNameIndex);
    // console.log("nonogramName=", data[randomLevelName]);
  });
});
