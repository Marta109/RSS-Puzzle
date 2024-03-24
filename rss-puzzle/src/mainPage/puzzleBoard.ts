import { getData } from '../data/getData';
import { createGameBoardItems } from '../gameBoard/createGameBoardItems';
import { changePuzzle } from '../gameBoard/changePuzzle';
import { showPuzzle } from '../gameBoard/showPuzzle';
import { showResultBtn } from '../gameBoard/showResultBtn';
import { PuzzleData } from '../data/getData';
import { autoCompleteSentence } from '../gameBoard/autoCompleteSentence';
import { audioHint, showAudioHint, showTranslationHint } from '../gameBoard/gameHint';
import { checkSentence, isCanCheck } from '../gameBoard/checkSentence';
import { gameBoardItemListener, puzzleBoardItemListener } from '../gameBoard/gameBoardListeners';
import {
  gameBoardPuzzleItemDragover,
  gameBoardPuzzleItemDragstart,
  gameBoardPuzzleItemDrop,
  puzzleBoarDragStart,
} from '../gameBoard/gameDragDrop';

export function puzzlesBoardSetter(): void {
  getData().then((data: PuzzleData) => {
    let round: number = 0;
    let level: number = 0;
    console.log(data);

    createGameBoardItems(data, round, level, true);

    const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
    const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
    const checkBtn = document.querySelector<HTMLButtonElement>('.checkGame');
    const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
    const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
    const audioHintBtn = document.querySelector<HTMLButtonElement>('#audio-hint');
    const showAudioHintBtn = document.querySelector<HTMLButtonElement>('#audioHintToggleBtn');
    const showHintBtn = document.querySelector<HTMLElement>('.showHint');

    if (nextPuzzleBtn) {
      nextPuzzleBtn.disabled = true;
    }

    const gameBoardItem = gameBoard?.querySelectorAll<HTMLElement>('.gameBoardItem');

    let gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[level];
    let gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
    let puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');
    let hint = document.querySelector<HTMLElement>('.hint');
    let isHintAudio = true;
    let isHintText = false;
    let allWordsFilled = false;
    let autoCompleteCounter = 0;

    function puzzleBoardHandler(e: MouseEvent) {
      puzzleBoardItemListener(e, gameBoardWordItems);
    }

    showHintBtn?.addEventListener('click', () => {
      isHintText = showTranslationHint(
        data.rounds[round].words[level].textExampleTranslate,
        isHintText,
      );
    });

    showAudioHintBtn?.addEventListener('click', () => {
      isHintAudio = showAudioHint(isHintAudio);
    });

    audioHintBtn?.addEventListener('click', () => {
      audioHint(`${data.rounds[round].words[level].audioExample}`);
    });

    isCanCheck(gameBoardWordItems);

    gameBoardWordItems.forEach((puzzleItem) => {
      puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
      puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
      puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
    });

    if (puzzlesBoard) {
      gameBoardRow.removeEventListener('click', gameBoardItemListener);
      gameBoardRow.addEventListener('click', gameBoardItemListener);

      puzzlesBoard.removeEventListener('click', puzzleBoardHandler);
      puzzlesBoard.addEventListener('click', puzzleBoardHandler);
      puzzlesBoard.addEventListener('dragstart', puzzleBoarDragStart);
    }

    if (checkBtn && gameBoardWordItems && puzzlesBoard && gameBoardItem) {
      checkBtn.addEventListener('click', (e) => checkSentence(e, round, level, data, isHintText));
    }

    if (
      nextPuzzleBtn &&
      checkBtn &&
      puzzlesBoard &&
      gameBoardItem &&
      autoCompleteBtn &&
      audioHintBtn
    ) {
      nextPuzzleBtn.addEventListener('click', () => {
        if (nextPuzzleBtn.textContent === 'Next Round') {
          changePuzzle(round, level, data);
          autoCompleteCounter = 0;
          round++;
          level = 0;
          return;
        }

        if (isHintAudio) {
          audioHintBtn.classList.remove('audioBtnShow');
        } else {
          audioHintBtn.classList.add('audioBtnShow');
        }
        nextPuzzleBtn.classList.add('btnDisabled');
        nextPuzzleBtn.disabled = true;
        allWordsFilled = false;
        gameBoardWordItems.forEach((puzzleItem) => {
          puzzleItem.removeEventListener('dragstart', gameBoardPuzzleItemDragstart);
          puzzleItem.removeEventListener('dragover', gameBoardPuzzleItemDragover);
          puzzleItem.removeEventListener('drop', gameBoardPuzzleItemDrop);
        });
        puzzlesBoard.classList.remove('noHover');
        level++;

        if (level == data.rounds[round].words.length - 1) {
          nextPuzzleBtn.textContent = 'Show Puzzle';
        }

        if (!isHintText && hint) {
          hint.style.display = 'none';
        }

        //  open next sentence
        if (level < data.rounds[round].words.length) {
          createGameBoardItems(data, round, level, false);

          gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[level];
          gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
          puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');

          gameBoardRow.addEventListener('click', gameBoardItemListener);
          puzzlesBoard?.addEventListener('click', puzzleBoardHandler);

          gameBoardWordItems.forEach((puzzleItem) => {
            puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
            puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
            puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
          });

          if (autoCompleteBtn) {
            autoCompleteBtn.disabled = false;
            autoCompleteBtn.classList.remove('noHover');
            autoCompleteBtn.classList.remove('btnDisabled');
          }
        } else {
          showResultBtn(autoCompleteCounter, round, level, data);
          showPuzzle(
            `${data.rounds[round].levelData.imageSrc}`,
            `${data.rounds[round].levelData.author}`,
            `${data.rounds[round].levelData.name}`,
            `${data.rounds[round].levelData.year}`,
          );
          autoCompleteCounter = 0;
          round++;
          level = 0;
        }
      });
    }

    //  autoComplete  Sentence
    autoCompleteBtn?.addEventListener('click', () => {
      autoCompleteCounter++;
      autoCompleteSentence(isHintText, data, round, level);
      gameBoardRow.removeEventListener('click', gameBoardItemListener);
      puzzlesBoard?.removeEventListener('click', puzzleBoardHandler);
    });
  });
}
