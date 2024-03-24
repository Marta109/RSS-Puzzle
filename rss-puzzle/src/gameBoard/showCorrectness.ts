export const showCorrectness = (gameBoardWordItems: NodeListOf<HTMLElement>, sentence: string) => {
  const checkSentenceBtn = document.querySelector<HTMLButtonElement>('.checkGame');
  const sentenceArr = sentence?.split(' ');
  console.log(sentenceArr);
  let result = '';

  if (gameBoardWordItems !== null && checkSentenceBtn) {
    checkSentenceBtn.disabled = true;
    gameBoardWordItems.forEach((el, i) => {
      let word = el.querySelector('span');
      if (word) {
        word.textContent === sentenceArr[i]
          ? el.classList.add('correctWord')
          : el.classList.add('inCorrectWord');
        result += word.textContent + ' ';
      } else {
        el.textContent === sentenceArr[i]
          ? el.classList.add('correctWord')
          : el.classList.add('inCorrectWord');
        result += el.textContent + ' ';
      }
    });
  }

  return result;
};

export const clearBorders = (gameBoardWordItems: NodeListOf<HTMLElement>) => {
  gameBoardWordItems.forEach((el) => el.classList.remove('correctWord', 'inCorrectWord'));
};
