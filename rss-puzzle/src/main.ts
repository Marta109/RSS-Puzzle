import './style.css';
import { createForm } from './loginPage/loginPage.ts';
import { createMainPage } from './mainPage/mainPage.ts';
import { createWelcomePage } from './welcomePage/welcomePage.ts';

document.querySelector<HTMLBodyElement>('body')!.innerHTML = `
<div id="app">
</div>
`;

createWelcomePage();
createForm();
createMainPage();

document.addEventListener('DOMContentLoaded', () => {
  const userName: string | null = localStorage.getItem('userName');
  const userSurName: string | null = localStorage.getItem('userSurName');
  const loginPage: HTMLFormElement | null = document.querySelector('#loginForm');
  const mainPage: HTMLElement | null = document.querySelector('#mainPage');
  const welcomePage: HTMLElement | null = document.querySelector('#welcomePage');

  if (userName && userSurName) {
    if (loginPage && welcomePage && mainPage) {
      welcomePage.style.display = 'flex';
      loginPage.style.display = 'none';
      mainPage.style.display = 'none';
    }
  } else {
    if (mainPage && welcomePage) {
      mainPage.style.display = 'none';
      welcomePage.style.display = 'none';
    }
  }
});
