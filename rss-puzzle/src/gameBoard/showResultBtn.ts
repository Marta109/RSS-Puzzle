import { changePuzzle } from './changePuzzle';
import { PuzzleData } from '../data/getData';

export function showResultBtn(
  autoCompleteCounter: number,
  round: number,
  level: number,
  data: PuzzleData,
): void {
  const resultsBtn = document.getElementById('resultsBtn');

  if (resultsBtn) {
    resultsBtn.style.display = 'inline-block';
  }

  resultsBtn?.addEventListener('click', () => {
    const gameModal: HTMLElement | null = document.querySelector('.modal_container');
    const modalContent: HTMLElement | null = document.querySelector('.modal_content');
    const modalInfo = document.getElementById('modalInfo');
    const nextPuzzleBtn = modalContent?.querySelector<HTMLButtonElement>('.nextPuzzle');

    if (gameModal && modalContent) {
      gameModal.classList.add('show');
      modalContent.classList.add('show');
    }

    if (modalInfo) {
      modalInfo.innerHTML = `Number of all Sentence - ${data.rounds[round].words.length}<br>Number of automatically compiled sentence - ${autoCompleteCounter}<br> Number of sentence you've completed - ${data.rounds[round].words.length - autoCompleteCounter}`;
    }

    if (nextPuzzleBtn) {
      nextPuzzleBtn.textContent = 'Next Round';
      nextPuzzleBtn.classList.remove('btnDisabled');
      nextPuzzleBtn.disabled = false;
    }

    nextPuzzleBtn?.addEventListener('click', () => {
      changePuzzle(round, level, data);

      if (gameModal && modalContent) {
        gameModal.classList.remove('show');
        modalContent.classList.remove('show');
      }
    });
  });
}
