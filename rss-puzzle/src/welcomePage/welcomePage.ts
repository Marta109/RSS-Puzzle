import './welcomePage.css';
import { showWelcomeMessage } from './welcomeMessage.ts';

export const createWelcomePage = (): void => {
  const mainPage: HTMLElement | null = document.querySelector('#mainPage');
  const loginPage: HTMLFormElement | null = document.querySelector('#loginForm');
  if (mainPage && loginPage) {
    mainPage.style.display = 'none';
    loginPage.style.display = 'none';
  }

  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.id = 'welcomePage';
  wrapper.classList.add('welcomePage');
  const gameTitle: HTMLHeadingElement = document.createElement('h2');
  gameTitle.classList.add('gameTitleWelcome');
  gameTitle.textContent = 'RSS - PUZZLE';

  const gameDescr: HTMLDivElement = document.createElement('div');
  gameDescr.className = 'gameDescr';
  gameDescr.textContent =
    "Welcome to Puzzle - an exciting game where you can not only learn English but also immerse yourself in the world of art through captivating puzzles. Each level of Puzzle features a new painting or drawing that you piece together. As you progress, you'll learn new words and phrases in English related to the theme of the image. Not only do you learn the pronunciation of English words, but you also enjoy the beauty of art by assembling puzzles and learning more about each piece.Are you ready for an engaging journey into the world of language and beauty with Puzzle? Start playing now";

  const startBtn: HTMLButtonElement = document.createElement('button');
  startBtn.className = 'login-btn-grad';
  startBtn.textContent = 'Start Game';

  wrapper.appendChild(gameTitle);
  wrapper.appendChild(gameDescr);
  wrapper.appendChild(startBtn);

  const bodyElements: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
  if (bodyElements.length > 0) {
    const body: HTMLBodyElement = bodyElements[0];
    body.appendChild(wrapper);
  }
  if (wrapper) {
    showWelcomeMessage();
  }

  startBtn.addEventListener('click', () => {
    const mainPage: HTMLElement | null = document.querySelector('#mainPage');
    if (mainPage !== null) {
      mainPage.style.display = 'block';
      wrapper.style.display = 'none';
    }
  });
};
