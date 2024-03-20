import '../main/mainPage.css';

const mixingArr = (arr: string[]): string[] => {
  return arr.sort(() => Math.random() - 0.5);
};

interface PuzzleData {
  rounds: {
    words: {
      textExample: string;
    }[];
  }[];
}

const gameBoardRowItems: HTMLDivElement[] = [];

export function createGameBoardItems(
  data: PuzzleData,
  column: number,
  line: number,
  bool: boolean = false,
): void {
  const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
  const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
  const words = data.rounds[column].words;
  const setting = words[line].textExample;
  const puzzleWordArr = setting.split(' ');

  if (bool && gameBoard) {
    for (let i = 0; i < words.length; i++) {
      const gameBoardItem = document.createElement('div');
      gameBoardItem.className = 'gameBoardItem';
      gameBoard.appendChild(gameBoardItem);
      gameBoardRowItems.push(gameBoardItem);
    }
  }

  const gameBoardItem = gameBoardRowItems[line];
  const mixArr = mixingArr(puzzleWordArr);
  if (puzzlesBoard) puzzlesBoard.innerHTML = '';
  for (let i = 0; i <= mixArr.length; i++) {
    if (i < mixArr.length && puzzlesBoard) {
      const div = document.createElement('div');
      div.className = 'puzzleItem draggable';
      div.draggable = true;
      div.id = `puzzleItem_${i}`;
      div.textContent = mixArr[i];
      puzzlesBoard.appendChild(div);
    }
    const gameBoardPuzzleItem = document.createElement('div') as HTMLDivElement;
    gameBoardPuzzleItem.textContent = i == 0 ? `${line + 1}` : '';
    if (i !== 0) {
      gameBoardPuzzleItem.className = 'gameBoardItemWord draggable';
      gameBoardPuzzleItem.draggable = true;
      gameBoardPuzzleItem.id = `${line}-${i}`;
    } else {
      gameBoardPuzzleItem.className = 'gameBoardItemNum';
    }

    gameBoardItem.appendChild(gameBoardPuzzleItem);
  }
}
