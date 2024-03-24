import { PuzzleData } from '../data/getData';
import { showCorrectness } from './showCorrectness';

export const isCanCheck = (gameBoardWordItems: NodeListOf<HTMLElement>) => {
  const checkSentenceBtn = document.querySelector<HTMLButtonElement>('.checkGame');

  if (checkSentenceBtn) {
    checkSentenceBtn.disabled = false;
    let allWordsFilled = true;

    gameBoardWordItems.forEach((word) => {
      if (!word.querySelector('span')) {
        allWordsFilled = false;
        return;
      }
    });

    if (allWordsFilled) {
      checkSentenceBtn.disabled = false;
      checkSentenceBtn.classList.remove('btnDisabled');
    } else {
      checkSentenceBtn.disabled = true;
      checkSentenceBtn.classList.add('btnDisabled');
    }
  }
};

export const checkSentence = (
  e: MouseEvent,
  round: number,
  level: number,
  data: PuzzleData,
  isHintText: boolean,
) => {
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[level];
  const gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
  const checkSentenceBtn = document.querySelector<HTMLButtonElement>('.checkGame');
  const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
  const textHint = document.querySelector<HTMLElement>('.hint');
  const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
  const audioHintBtn = document.querySelector<HTMLButtonElement>('#audio-hint');
  const string = data.rounds[round].words[level].textExample;

  const result = showCorrectness(gameBoardWordItems, string);

  if (result.trim() === string.trim()) {
    if (nextPuzzleBtn && textHint && autoCompleteBtn && audioHintBtn && checkSentenceBtn) {
      checkSentenceBtn.classList.add('btnDisabled');
      checkSentenceBtn.disabled = true;

      puzzlesBoard?.classList.add('noHover');
      gameBoardRow.classList.add('noHover');
      nextPuzzleBtn.classList.remove('btnDisabled');
      nextPuzzleBtn.disabled = false;
      if (!isHintText) {
        textHint.style.display = 'inline-block';
      }
      autoCompleteBtn.disabled = true;
      autoCompleteBtn.classList.add('btnDisabled');
      audioHintBtn.classList.remove('audioBtnShow');
    }
  } else {
    if (autoCompleteBtn && checkSentenceBtn) {
      checkSentenceBtn.disabled = false;
      autoCompleteBtn.disabled = false;
      autoCompleteBtn.classList.remove('btnDisabled');
    }
  }
  console.log('answer ', string);
};
