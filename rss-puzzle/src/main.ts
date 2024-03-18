import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.ts';
import { createForm } from './login/startPage.ts';

document.querySelector<HTMLBodyElement>('body')!.innerHTML = `
<div id="app">
</div>
`;

createForm();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
