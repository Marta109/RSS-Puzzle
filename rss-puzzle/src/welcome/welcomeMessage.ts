import './welcomePage.css';

export function showWelcomeMessage(): void {
  const userName: string | null = localStorage.getItem('userName');
  const userSurName: string | null = localStorage.getItem('userSurName');
  const app: HTMLElement | null = document.querySelector('#app');

  if (userName && userSurName && app) {
    const welcomeMessage: HTMLDivElement = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.textContent = `Welcome, ${userName} ${userSurName}!`;
    app.appendChild(welcomeMessage);

    setTimeout(() => {
      welcomeMessage.classList.add('show');
    }, 100);

    setTimeout(() => {
      // console.log('dbd');

      welcomeMessage.classList.remove('show');
      setTimeout(() => {
        welcomeMessage.remove();
      }, 500);
    }, 5000);
  }
}
