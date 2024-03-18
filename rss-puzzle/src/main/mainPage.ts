import './mainPage.css';

export const createMainPage = (): void => {
  document.body.classList.add('light');

  // ----------- wrapper ------------------
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

  menu.appendChild(gameTitle);
  menu.appendChild(LogOutBtn);

  LogOutBtn.addEventListener('click', () => {
    localStorage.clear();
    const mainPage: HTMLElement | null = document.querySelector('#mainPage');
    const loginPage: HTMLFormElement | null = document.querySelector('#loginForm');
    if (mainPage) {
      mainPage.style.display = 'none';
    }
    if (loginPage) {
      loginPage.style.display = 'block';
    }
  });
};
