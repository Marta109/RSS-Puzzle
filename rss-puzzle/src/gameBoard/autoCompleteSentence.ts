import { PuzzleData } from '../data/getData';

export function autoCompleteSentence(
  isHintText: boolean,
  data: PuzzleData,
  round: number,
  level: number,
): void {
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[level];
  const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
  const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
  const audioHintBtn = document.querySelector<HTMLButtonElement>('#audio-hint');
  const checkGameBtn = document.querySelector<HTMLButtonElement>('.checkGame');
  const textHint = document.querySelector<HTMLElement>('.hint');

  if (autoCompleteBtn && puzzlesBoard && checkGameBtn && nextPuzzleBtn && audioHintBtn) {
    if (!isHintText && textHint) {
      textHint.textContent = data.rounds[round].words[level].textExampleTranslate;
      textHint.style.display = 'inline-block';
    }
    checkGameBtn.disabled = true;
    checkGameBtn.classList.add('btnDisabled');
    audioHintBtn.classList.remove('audioBtnShow');
    nextPuzzleBtn.disabled = false;
    nextPuzzleBtn.classList.remove('btnDisabled');
    autoCompleteBtn.disabled = true;
    autoCompleteBtn.classList.add('btnDisabled');
    const string = data.rounds[round].words[level].textExample.split(' ');

    gameBoardRow.querySelectorAll('.gameBoardItemWord').forEach((el, i) => {
      el.textContent = string[i];
    });

    puzzlesBoard.querySelectorAll('.puzzleItem').forEach((el) => (el.innerHTML = ''));
  }
}
