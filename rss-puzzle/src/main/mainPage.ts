import './mainPage.css';
import { puzzlesBoardSetter } from './puzzleBoard';

export const createMainPage = (): void => {
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.id = 'mainPage';
  wrapper.classList.add('wrapper');
  const appDiv: HTMLElement | null = document.getElementById('app');
  if (appDiv) {
    appDiv.appendChild(wrapper);
  }

  const menu: HTMLDivElement = document.createElement('div');
  menu.classList.add('menu');
  wrapper.appendChild(menu);
  const gameTitle: HTMLHeadingElement = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.textContent = 'RSS - PUZZLE';

  const logOutBtn: HTMLButtonElement = document.createElement('button');
  logOutBtn.className = 'login-btn-grad logOut';
  logOutBtn.textContent = 'LogOut';

  const gameBoard: HTMLDivElement = document.createElement('div');
  gameBoard.classList.add('gameBoard');
  wrapper.appendChild(gameBoard);
  const puzzlesBoard: HTMLDivElement = document.createElement('div');
  puzzlesBoard.classList.add('puzzlesBoard');
  wrapper.appendChild(puzzlesBoard);

  const puzzlesBoardBtns: HTMLDivElement = document.createElement('div');
  puzzlesBoardBtns.classList.add('puzzlesBoardBtns');
  wrapper.appendChild(puzzlesBoardBtns);

  const checkBtn: HTMLButtonElement = document.createElement('button');
  checkBtn.className = 'login-btn-grad checkGame';
  checkBtn.textContent = 'Check';
  puzzlesBoardBtns.appendChild(checkBtn);

  const nextBtn: HTMLButtonElement = document.createElement('button');
  nextBtn.className = 'login-btn-grad nextPuzzle btnDisabled';
  nextBtn.textContent = 'Next Puzzle';
  puzzlesBoardBtns.appendChild(nextBtn);

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
