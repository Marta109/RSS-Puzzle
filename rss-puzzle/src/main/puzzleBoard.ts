import { getData } from '../data/getData';
import { createGameBoardItems } from '../gameBoard/createGameBoardItems';

interface PuzzleData {
  rounds: {
    words: {
      textExample: string;
    }[];
  }[];
}

export function puzzlesBoardSetter(): void {
  getData().then((data: PuzzleData) => {
    let column: number = 0;
    let line: number = 0;

    createGameBoardItems(data, column, line, true);

    const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
    const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
    const checkBtn = document.querySelector<HTMLButtonElement>('.checkGame');
    const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
    const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');

    if (nextPuzzleBtn) {
      nextPuzzleBtn.disabled = true;
    }

    const gameBoardItem = gameBoard?.querySelectorAll<HTMLElement>('.gameBoardItem');

    let gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[line];
    let gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
    let puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');

    const puzzleBoardItemListener = function (this: HTMLElement, e: MouseEvent) {
      let index = 0;
      const target = e.target as HTMLElement;
      if (target.classList.contains('puzzleItem') && target.textContent !== '') {
        const puzzleItem = target;
        const word = puzzleItem.textContent || '';
        puzzleItem.textContent = '';
        while (index < gameBoardWordItems.length && gameBoardWordItems[index].textContent) {
          index++;
        }
        if (index < gameBoardWordItems.length) {
          gameBoardWordItems[index].textContent = word;
        }
      }
    };

    const gameBoardItemListener = function (this: HTMLElement, e: MouseEvent) {
      let index = 0;
      const target = e.target as HTMLElement;
      if (target.classList.contains('gameBoardItemWord')) {
        const gameBoardWord = target.textContent?.trim();
        if (gameBoardWord && puzzlesBoard) {
          while (index < puzzleItems.length && puzzleItems[index].textContent) {
            index++;
          }
          puzzleItems[index].textContent = gameBoardWord;
          target.textContent = '';
        }
      }
    };

    if (puzzlesBoard) {
      gameBoardRow.removeEventListener('click', gameBoardItemListener);
      puzzlesBoard.removeEventListener('click', puzzleBoardItemListener);

      gameBoardRow.addEventListener('click', gameBoardItemListener);
      puzzlesBoard.addEventListener('click', puzzleBoardItemListener);
    }

    if (checkBtn && gameBoardWordItems && puzzlesBoard && gameBoardItem) {
      checkBtn.addEventListener('click', () => {
        if (gameBoardWordItems !== null) {
          checkBtn.disabled = true;
          const string = data.rounds[column].words[line].textExample;
          let result = '';
          gameBoardWordItems.forEach((el) => (result += el.textContent + ' '));
          if (result.trim() === string.trim()) {
            if (nextPuzzleBtn) {
              nextPuzzleBtn.classList.remove('btnDisabled');
              checkBtn.classList.add('btnDisabled');
              puzzlesBoard.classList.add('noHover');
              gameBoardItem[line].classList.add('noHover');
              nextPuzzleBtn.disabled = false;
            }
          } else {
            checkBtn.disabled = false;
          }
          console.log('answer ', string);
        }
      });
    }

    if (nextPuzzleBtn && checkBtn && puzzlesBoard && gameBoardItem) {
      nextPuzzleBtn.addEventListener('click', () => {
        checkBtn.classList.remove('btnDisabled');
        puzzlesBoard.classList.remove('noHover');
        checkBtn.disabled = false;
        gameBoardRow.removeEventListener('click', gameBoardItemListener);
        puzzlesBoard.removeEventListener('click', puzzleBoardItemListener);
        nextPuzzleBtn.classList.add('btnDisabled');
        nextPuzzleBtn.disabled = true;
        console.log(data);
        line++;

        if (line < data.rounds[column].words.length) {
          createGameBoardItems(data, column, line, false);

          gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[line];
          gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
          puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');

          gameBoardRow.addEventListener('click', gameBoardItemListener);
          puzzlesBoard.addEventListener('click', puzzleBoardItemListener);

          if (autoCompleteBtn) autoCompleteBtn.disabled = false;
        } else {
          if (autoCompleteBtn) {
            autoCompleteBtn.disabled = true;
            autoCompleteBtn.classList.add('btnDisabled');
            checkBtn.disabled = true;
            checkBtn.classList.add('btnDisabled');
          }
        }
      });
    }

    if (autoCompleteBtn && puzzlesBoard) {
      autoCompleteBtn.addEventListener('click', () => {
        const string = data.rounds[column].words[line].textExample.split(' ');
        gameBoardRow
          .querySelectorAll('.gameBoardItemWord')
          .forEach((el, i) => (el.textContent = string[i]));
        puzzlesBoard.querySelectorAll('.puzzleItem').forEach((el) => (el.textContent = ''));
      });
    }
  });
}
