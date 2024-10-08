import '../mainPage/mainPage.css';
import { PuzzleData } from '../data/getData';

const mixingArr = (arr: string[]): string[] => {
  return arr.sort(() => Math.random() - 0.5);
};

let gameBoardRowItems: HTMLDivElement[] = [];

export function createGameBoardItems(
  data: PuzzleData,
  round: number,
  level: number,
  bool: boolean = false,
): void {
  const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const words = data.rounds[round].words;
  const sentence = words[level].textExample;
  const stringArr = sentence.split(' ');
  const puzzleWordArr = sentence.split(' ');

  if (bool && gameBoard) {
    gameBoard.innerHTML = '';
    gameBoardRowItems = [];

    for (let i = 0; i < words.length; i++) {
      const gameBoardItem = document.createElement('div');
      gameBoardItem.className = 'gameBoardItem';
      gameBoard.appendChild(gameBoardItem);
      gameBoardRowItems.push(gameBoardItem);
    }
  }

  const gameBoardItem = gameBoardRowItems[level];

  const mixArr = mixingArr(puzzleWordArr);

  if (puzzlesBoard) puzzlesBoard.innerHTML = '';


  for (let i = 0; i <= mixArr.length; i++) {
    if (i < mixArr.length && puzzlesBoard) {
      const div = document.createElement('div');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const span3 = document.createElement('span');
      div.className = 'puzzleItem draggable';
      div.draggable = true;
      div.id = `puzzleItem_${i}`;


      const itemIndex = stringArr.findIndex((el) => el === mixArr[i]);
      if (itemIndex === 0) {
        span1.classList.add('shapeRight');
      } else if (itemIndex === stringArr.length - 1) {
        span1.classList.add('shapeLeft');
      } else {
        span1.classList.add('shapeRight');
        span2.classList.add('shapeLeft');
      }
      span3.classList.add('text');
      span3.textContent = mixArr[i];
      div.appendChild(span3);
      div.appendChild(span1);
      div.appendChild(span2);
      puzzlesBoard.appendChild(div);
    }
    const gameBoardPuzzleItem = document.createElement('div') as HTMLDivElement;
    gameBoardPuzzleItem.textContent = i == 0 ? `${level + 1}` : '';

    if (i !== 0) {
      gameBoardPuzzleItem.className = 'gameBoardItemWord draggable';
      gameBoardPuzzleItem.draggable = true;
      gameBoardPuzzleItem.id = `${level}-${i}`;
    } else {
      gameBoardPuzzleItem.className = 'gameBoardItemNum';
    }

    gameBoardItem.appendChild(gameBoardPuzzleItem);
  }
}
