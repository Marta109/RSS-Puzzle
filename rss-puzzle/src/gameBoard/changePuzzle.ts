import { createGameBoardItems } from './createGameBoardItems';

interface PuzzleData {
  rounds: {
    levelData: {
      author: string;
      cutSrc: string;
      id: string;
      imageSrc: string;
      name: string;
      year: string;
    };
    words: {
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
    }[];
  }[];
}

export function changePuzzle(
  column: number,
  line: number,
  data: PuzzleData,
  gameBoardItemListener: (this: HTMLElement, e: MouseEvent) => void,
  puzzleBoardItemListener: (this: HTMLElement, e: MouseEvent) => void,
  gameBoardPuzzleItemDragstart: (event: DragEvent) => void,
  gameBoardPuzzleItemDragover: (event: DragEvent) => void,
  gameBoardPuzzleItemDrop: (event: DragEvent) => void,
): void {
  const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
  const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
  const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
  const audioHintToggleBtn = document.querySelector<HTMLButtonElement>('#audioHintToggleBtn');
  const showHint = document.querySelector<HTMLElement>('.showHint');
  const audioHintBtnIcon = document.querySelector<HTMLButtonElement>('#audio-hint');
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');

  if (nextPuzzleBtn?.textContent === 'Next Round' && autoCompleteBtn) {
    const resultsBtn = document.getElementById('resultsBtn');
    if (resultsBtn) {
      resultsBtn.style.display = 'none';
    }
    nextPuzzleBtn.disabled = true;
    nextPuzzleBtn.classList.add('btnDisabled');
    nextPuzzleBtn.textContent = 'Next Puzzle';
    autoCompleteBtn.disabled = false;
    autoCompleteBtn.classList.remove('btnDisabled');

    const imgData = document.getElementById('imgData');
    if (imgData && gameBoard) {
      gameBoard.innerHTML = '';
      gameBoard.style.backgroundImage = '';
      imgData.remove();
    }
    if (audioHintToggleBtn && showHint && audioHintBtnIcon) {
      audioHintBtnIcon.classList.remove('audioBtnShow');
      audioHintToggleBtn.classList.remove('btnDisabled');
      showHint.style.display = 'block';
      audioHintToggleBtn.disabled = false;
    }

    column++;
    line = 0;

    createGameBoardItems(data, column, line, true);

    const gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[line];
    const gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');

    gameBoardRow?.addEventListener('click', gameBoardItemListener);
    puzzlesBoard?.addEventListener('click', puzzleBoardItemListener);

    gameBoardWordItems.forEach((puzzleItem) => {
      puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
      puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
      puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
    });
  }
}
