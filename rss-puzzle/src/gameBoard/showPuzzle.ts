export function showPuzzle(imageSrc: string, author: string, name: string, year: string): void {
  const checkGameBtn = document.querySelector<HTMLButtonElement>('.checkGame');
  const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
  const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
  const audioHintToggleBtn = document.querySelector<HTMLButtonElement>('#audioHintToggleBtn');
  const showHint = document.querySelector<HTMLElement>('.showHint');
  const textHint = document.querySelector<HTMLElement>('.hint');
  const audioHintBtnIcon = document.querySelector<HTMLButtonElement>('#audio-hint');
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const wrapper = document.querySelector<HTMLElement>('.wrapper');
  const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');

  if (
    autoCompleteBtn &&
    gameBoard &&
    audioHintToggleBtn &&
    showHint &&
    wrapper &&
    checkGameBtn &&
    audioHintBtnIcon &&
    puzzlesBoard &&
    textHint
  ) {
    autoCompleteBtn.disabled = true;
    autoCompleteBtn.classList.add('btnDisabled');
    checkGameBtn.disabled = true;
    checkGameBtn.classList.add('btnDisabled');
    audioHintBtnIcon.classList.add('audioBtnShow');
    audioHintToggleBtn.classList.add('btnDisabled');
    audioHintToggleBtn.disabled = true;

    showHint.style.display = 'none';
    textHint.style.display = 'none';

    gameBoard.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imageSrc})`;
    
    const innerElements = gameBoard.querySelectorAll('.gameBoardItem');

    if (gameBoard) {
      setTimeout(() => {
        innerElements.forEach((item) => {
          item.classList.add('fadeOutOnGameBoard');
        });
      }, 2000);
      
      innerElements.forEach((item) => {
        item.classList.remove('fadeOutOnGameBoard');
      });

      const imgData: HTMLDivElement = document.createElement('div');
      imgData.classList.add('hint');
      imgData.id = 'imgData';

      imgData.innerHTML = `Author - ${author}<br>
             Image name - ${name}<br> 
             Year - ${year}<br> `;

      const puzzlesBoardParent = puzzlesBoard.parentNode;

      puzzlesBoardParent?.insertBefore(imgData, puzzlesBoard);

      if (nextPuzzleBtn) {
        nextPuzzleBtn.textContent = 'Next Round';
        nextPuzzleBtn.classList.remove('btnDisabled');
        nextPuzzleBtn.disabled = false;
      }
    }
  }
}
