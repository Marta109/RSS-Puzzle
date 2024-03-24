import './mainPage.css';
import { puzzlesBoardSetter } from './puzzleBoard';

export const createMainPage = (): void => {
  const appDiv: HTMLElement | null = document.getElementById('app');
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.classList.add('wrapper');
  wrapper.id = 'mainPage';
  if (appDiv) {
    appDiv.appendChild(wrapper);
  }

  const menu: HTMLDivElement = document.createElement('div');
  menu.classList.add('menu');
  wrapper.appendChild(menu);
  const gameTitle: HTMLHeadingElement = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.textContent = 'RSS - PUZZLE';
  menu.appendChild(gameTitle);
  const logOutBtn: HTMLButtonElement = document.createElement('button');
  logOutBtn.className = 'login-btn-grad logOut';
  logOutBtn.textContent = 'LogOut';

  const audio = document.createElement('audio');
  audio.id = 'audio';

  const audioToggleBtn: HTMLButtonElement = document.createElement('button');
  audioToggleBtn.classList.add('login-btn-grad', 'btns');
  audioToggleBtn.id = 'audio-toggle';

  const audioHintToggleBtn: HTMLButtonElement = document.createElement('button');
  audioHintToggleBtn.classList.add('login-btn-grad', 'btns');
  audioHintToggleBtn.id = 'audioHintToggleBtn';
  audioHintToggleBtn.textContent = 'Audio Hint';

  menu.appendChild(logOutBtn);
  menu.appendChild(audioHintToggleBtn);
  menu.appendChild(audio);
  menu.appendChild(audioToggleBtn);

  const icon: HTMLSpanElement = document.createElement('span');
  icon.classList.add('fa-solid', 'fa-volume-high');
  audioToggleBtn.appendChild(icon);

  audioToggleBtn.addEventListener('click', () => {
    const iconElement = audioToggleBtn.querySelector('span.fa-solid');
    if (iconElement) {
      iconElement.classList.toggle('fa-volume-off');
    }
    audio.muted = !audio.muted;
  });

  const showHint: HTMLDivElement = document.createElement('div');
  showHint.classList.add('showHint');
  let word = 'HINT';
  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span');
    span.textContent = word[i];
    span.style.setProperty('--i', (i + 1).toString());
    showHint.appendChild(span);
  }
  wrapper.appendChild(showHint);

  const hint: HTMLDivElement = document.createElement('div');
  hint.classList.add('hint');
  hint.style.display = 'none';
  wrapper.appendChild(hint);

  const audioHintBtn: HTMLButtonElement = document.createElement('button');
  audioHintBtn.classList.add('login-btn-grad');
  audioHintBtn.id = 'audio-hint';
  wrapper.appendChild(audioHintBtn);

  const audioHintBtnIcon: HTMLSpanElement = document.createElement('span');
  audioHintBtnIcon.classList.add('fa', 'fa-volume-down');
  audioHintBtnIcon.id = 'audioHintBtnIcon';
  audioHintBtn.appendChild(audioHintBtnIcon);

  const gameBoard: HTMLDivElement = document.createElement('div');
  gameBoard.classList.add('gameBoard');
  wrapper.appendChild(gameBoard);
  const puzzlesBoard: HTMLDivElement = document.createElement('div');
  puzzlesBoard.classList.add('puzzlesBoard');
  wrapper.appendChild(puzzlesBoard);

  const puzzlesBoardBtns: HTMLDivElement = document.createElement('div');
  puzzlesBoardBtns.classList.add('puzzlesBoardBtns');
  wrapper.appendChild(puzzlesBoardBtns);

  const gameModal: HTMLDivElement = document.createElement('div');
  gameModal.classList.add('modal_container');
  wrapper.appendChild(gameModal);

  const modalContent: HTMLDivElement = document.createElement('div');
  modalContent.classList.add('modal_content');
  gameModal.appendChild(modalContent);

  const modalTitle: HTMLHeadingElement = document.createElement('h3');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = 'Results';
  modalContent.appendChild(modalTitle);

  const modalInfo: HTMLDivElement = document.createElement('div');
  modalInfo.classList.add('modal-info', 'hint');
  modalInfo.textContent = 'Results';
  modalInfo.id = 'modalInfo';
  modalContent.appendChild(modalInfo);
  
  const ModalNextBtn: HTMLButtonElement = document.createElement('button');
  ModalNextBtn.className = 'login-btn-grad nextPuzzle btnDisabled';
  ModalNextBtn.textContent = 'Next Puzzle';
  modalContent.appendChild(ModalNextBtn);
  
  const checkBtn: HTMLButtonElement = document.createElement('button');
  checkBtn.className = 'login-btn-grad checkGame';
  checkBtn.textContent = 'Check';
  puzzlesBoardBtns.appendChild(checkBtn);
  
  const nextBtn: HTMLButtonElement = document.createElement('button');
  nextBtn.className = 'login-btn-grad nextPuzzle btnDisabled';
  nextBtn.textContent = 'Next Puzzle';
  puzzlesBoardBtns.appendChild(nextBtn);

  const autoCompleteBtn: HTMLButtonElement = document.createElement('button');
  autoCompleteBtn.className = 'login-btn-grad autoCompleteBtn ';
  autoCompleteBtn.textContent = 'Auto-Complete';
  puzzlesBoardBtns.appendChild(autoCompleteBtn);

  const resultsBtn: HTMLButtonElement = document.createElement('button');
  resultsBtn.className = 'login-btn-grad autoCompleteBtn ';
  resultsBtn.textContent = 'Results';
  resultsBtn.style.display = "none";
  resultsBtn.id = "resultsBtn";
  puzzlesBoardBtns.appendChild(resultsBtn);

  menu.appendChild(gameTitle);
  menu.appendChild(logOutBtn);
  if (gameBoard) {
    puzzlesBoardSetter();
  }

  logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    const mainPage: HTMLElement | null = document.querySelector('#mainPage');
    const loginPage: HTMLFormElement | null = document.querySelector('#loginForm');
    const welcomePage: HTMLElement | null = document.querySelector('#welcomePage');
    if (mainPage && welcomePage) {
      mainPage.style.display = 'none';
      welcomePage.style.display = 'none';
    }
    if (loginPage) {
      loginPage.style.display = 'block';
    }
  });
};
