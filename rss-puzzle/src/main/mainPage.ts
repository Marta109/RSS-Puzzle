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

  const LogOutBtn: HTMLButtonElement = document.createElement('button');
  LogOutBtn.className = 'login-btn-grad logOut';
  LogOutBtn.textContent = 'LogOut';

  const gameBoard: HTMLDivElement = document.createElement('div');
  gameBoard.classList.add('gameBoard');
  wrapper.appendChild(gameBoard);
  const puzzlesBoard: HTMLDivElement = document.createElement('div');
  puzzlesBoard.classList.add('puzzlesBoard');
  wrapper.appendChild(puzzlesBoard);

  menu.appendChild(gameTitle);
  menu.appendChild(LogOutBtn);
  if (gameBoard) {
    puzzlesBoardSetter();
  }

  LogOutBtn.addEventListener('click', () => {
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


