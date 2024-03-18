import './style.css';
import { createForm } from './login/startPage.ts';
import { createMainPage } from './main/mainPage.ts';

document.querySelector<HTMLBodyElement>('body')!.innerHTML = `
<div id="app">
</div>
`;

createMainPage();
createForm();

document.addEventListener('DOMContentLoaded', () => {
  const userName: string | null = localStorage.getItem('userName');
  const userSurName: string | null = localStorage.getItem('userSurName');
  const loginPage: HTMLFormElement | null = document.querySelector('#loginForm');
  const mainPage: HTMLElement | null = document.querySelector('#mainPage');

  if (userName && userSurName) {
    if (loginPage && mainPage) {
      loginPage.style.display = 'none';
      mainPage.style.display = 'block';
      console.log('mainPage displayed');
    }
  } else {
    if (mainPage) {
      mainPage.style.display = 'none';
    }
  }
});
