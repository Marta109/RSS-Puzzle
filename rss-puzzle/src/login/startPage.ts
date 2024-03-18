import './login.css';

export const createForm = () => {
  const forma = document.createElement('form');
  forma.className = 'form';
  const loginTitle = document.createElement('h2');
  loginTitle.textContent = 'Login and start game';
  const inputName = document.createElement('input');
  inputName.className = 'input';
  const inputSurName = document.createElement('input');
  inputSurName.className = 'input';
  const button = document.createElement('button');
  button.className = 'login-btn-grad';
  const result = document.createElement('div');

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
  result.setAttribute('id', 'result');

  forma.appendChild(loginTitle);
  forma.appendChild(inputName);
  forma.appendChild(inputSurName);

  forma.appendChild(button);

  const appDiv = document.getElementById('app');
  if (appDiv) {
    appDiv.appendChild(forma);
    appDiv.appendChild(result);
  }
};
