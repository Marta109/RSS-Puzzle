import { getData } from '../data/getData';

const mixingArr = (arr: string[]): string[] => {
  return arr.sort(() => Math.random() - 0.5);
};

interface PuzzleData {
  rounds: {
    words: {
      textExample: string;
    }[];
  }[];
}

interface HTMLDivElementWithNum extends HTMLDivElement {
  textContent: string;
}

export function puzzlesBoardSetter(): void {
  getData().then((data: PuzzleData) => {
    let column = 0;
    let line = 0;
    const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
    const gameBoard = document.querySelector<HTMLElement>('.gameBoard');

    if (!puzzlesBoard || !gameBoard) {
      console.error('Puzzles board or game board not found.');
      return;
    }

    const puzzleArr = data.rounds[column].words[line].textExample.split(' ');

    const gameBoardItems: HTMLDivElement[] = [];
    const words = data.rounds[column].words;
    for (let i = 0; i < words.length; i++) {
      const gameBoardItem = document.createElement('div');
      gameBoardItem.className = 'gameBoardItem';
      gameBoard.appendChild(gameBoardItem);
      gameBoardItems.push(gameBoardItem);
    }

    const gameBoardItem = gameBoardItems[column];
    if (!gameBoardItem) {
      console.error('Game board item not found.');
      return;
    }

    const mixArr = mixingArr(puzzleArr);
    for (let i = 0; i <= mixArr.length; i++) {
      if (i < mixArr.length) {
        const div = document.createElement('div');
        div.className = 'puzzleItem';
        div.textContent = mixArr[i];
        puzzlesBoard.appendChild(div);
      }

      const gameBoardPuzzleItem = document.createElement('div') as HTMLDivElementWithNum;
      gameBoardPuzzleItem.textContent = i == 0 ? `${i + 1}` : '';
      gameBoardPuzzleItem.className = i == 0 ? 'gameBoardItemNum' : 'gameBoardItemWord';
      gameBoardItem.appendChild(gameBoardPuzzleItem);
    }

    const gameBoardItemArr = gameBoard.querySelectorAll('.gameBoardItem');
    const gameBoardWordArr = gameBoardItemArr[column]?.querySelectorAll('.gameBoardItemWord');

    if (!gameBoardWordArr) {
      console.error('Game board word array not found.');
      return;
    }

    puzzlesBoard.addEventListener('click', (e: MouseEvent) => {
      let index = 0;
      const target = e.target as HTMLElement;
      if (target.classList.contains('puzzleItem')) {
        const puzzleItem = target;
        // puzzleItem.classList.add('hide');
        const word = puzzleItem.textContent || '';
        puzzleItem.textContent = '';
        while (index < gameBoardWordArr.length && gameBoardWordArr[index].textContent) {
          index++;
        }
        (gameBoardWordArr[index] as HTMLDivElementWithNum).textContent = word;
      }
    });

    // console.log(gameBoardItemArr[column]);
    // console.log(gameBoardItem);

    gameBoardItem.addEventListener('click', (e: MouseEvent) => {
      let index = 0;
      const target = e.target as HTMLElement;
      if (target.classList.contains('gameBoardItemWord')) {
        const gameBoardWord = target.textContent?.trim();
        if (gameBoardWord) {
          const puzzleItems = puzzlesBoard.querySelectorAll('.puzzleItem');

          while (index < puzzleItems.length && puzzleItems[index].textContent) {
            index++;
          }
          (puzzleItems[index] as HTMLDivElementWithNum).textContent = gameBoardWord;
          target.textContent = '';
          // puzzleItems.forEach((puzzleItem) => {
          //   if (puzzleItem.textContent?.trim() === gameBoardWord) {
          //     // puzzleItem.classList.remove('hide');
          //   }
          // });
        }
      }
    });
  });
}
