import './login.css';
import { validateName, validateSurname, capitalizeFirstLetter } from './loginValidation';
import { createWelcomePage } from '../welcome/welcomePage.ts';

export const createForm = (): void => {
  const forma: HTMLFormElement = document.createElement('form');
  forma.className = 'form';
  forma.id = 'loginForm';
  const loginTitle: HTMLHeadingElement = document.createElement('h2');
  loginTitle.textContent = 'Login and start game';
  const inputName: HTMLInputElement = document.createElement('input');
  inputName.className = 'input';
  const inputSurName: HTMLInputElement = document.createElement('input');
  inputSurName.className = 'input';
  const button: HTMLButtonElement = document.createElement('button');
  button.className = 'login-btn-grad';
  const errorMessageName: HTMLDivElement = document.createElement('div');
  errorMessageName.className = 'errorMessage';
  const errorMessageSurName: HTMLDivElement = document.createElement('div');
  errorMessageSurName.className = 'errorMessage';

  inputName.setAttribute('type', 'text');
  inputName.placeholder = 'Name';
  inputName.setAttribute('name', 'name');
  inputName.setAttribute('required', '');
  inputSurName.setAttribute('type', 'text');
  inputSurName.placeholder = 'Surname';
  inputSurName.setAttribute('id', 'surName');
  inputSurName.setAttribute('name', 'surName');
  inputSurName.setAttribute('required', '');
  button.textContent = 'Login';

  forma.appendChild(loginTitle);
  forma.appendChild(inputName);
  forma.appendChild(errorMessageName);
  forma.appendChild(inputSurName);
  forma.appendChild(errorMessageSurName);
  forma.appendChild(button);

  const appDiv: HTMLElement | null = document.getElementById('app');
  if (appDiv) {
    appDiv.appendChild(forma);
  }

  forma.addEventListener('input', () => {
    const nameValue: string = inputName.value.trim();
    const surNameValue: string = inputSurName.value.trim();

    errorMessageName.innerHTML = '';
    errorMessageSurName.innerHTML = '';

    let isValid: boolean = true;

    if (nameValue.length < 3) {
      errorMessageName.textContent = 'Name should be at least 3 characters long.';
      isValid = false;
    } else if (!validateName(nameValue)) {
      errorMessageName.textContent =
        "Name should contain only accept English letters and '-', and start with a letter.";
      isValid = false;
    }

    if (surNameValue.length < 4) {
      errorMessageSurName.textContent = 'Surname should be at least 4 characters long.';
      isValid = false;
    } else if (!validateSurname(surNameValue)) {
      errorMessageSurName.textContent =
        "Surname should contain only accept English letters and '-' and start with a letter. ";
      isValid = false;
    }

    if (isValid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
    inputName.value = capitalizeFirstLetter(nameValue);
    inputSurName.value = capitalizeFirstLetter(surNameValue);
  });

  forma.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!button.disabled) {
      const nameValue: string = inputName.value.trim();
      const surNameValue: string = inputSurName.value.trim();
      localStorage.setItem('userName', nameValue);
      localStorage.setItem('userSurName', surNameValue);
      createWelcomePage();
    }
  });
};
