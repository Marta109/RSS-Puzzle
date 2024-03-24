import { createGameBoardItems } from './createGameBoardItems';
import { PuzzleData } from '../data/getData';
import { gameBoardItemListener, puzzleBoardItemListener } from './gameBoardListeners';
import {
  gameBoardPuzzleItemDragstart,
  gameBoardPuzzleItemDragover,
  gameBoardPuzzleItemDrop,
} from './gameDragDrop';

export function changePuzzle(round: number, level: number, data: PuzzleData): void {
  const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
  const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
  const showHintBtn = document.querySelector<HTMLElement>('.showHint');
  const showAudioHintBtn = document.querySelector<HTMLButtonElement>('#audioHintToggleBtn');
  const audioHintBtn = document.querySelector<HTMLButtonElement>('#audio-hint');

  if (nextPuzzleBtn?.textContent === 'Next Round' && autoCompleteBtn && gameBoard) {
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
    if (showAudioHintBtn && showHintBtn && audioHintBtn) {
      audioHintBtn.classList.remove('audioBtnShow');
      showAudioHintBtn.classList.remove('btnDisabled');
      showHintBtn.style.display = 'block';
      showAudioHintBtn.disabled = false;
    }

    round++;
    level = 0;

    createGameBoardItems(data, round, level, true);

    const gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[level];
    const gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');

    function puzzleBoardHandler(e: MouseEvent) {
      puzzleBoardItemListener(e, gameBoardWordItems);
    }

    gameBoardRow?.addEventListener('click', gameBoardItemListener);
    puzzlesBoard?.addEventListener('click', puzzleBoardHandler);

    gameBoardWordItems.forEach((puzzleItem) => {
      puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
      puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
      puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
    });
  }
}
