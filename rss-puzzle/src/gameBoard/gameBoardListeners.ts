import { isCanCheck } from './checkSentence';
import { clearBorders } from './showCorrectness';

export function puzzleBoardItemListener(
  e: MouseEvent,
  gameBoardWordItems: NodeListOf<HTMLElement>,
) {
  const target = e.target as HTMLElement;
  const puzzleItem = target.closest('.puzzleItem');
  if (puzzleItem?.innerHTML == '') return;

  if (puzzleItem) {
    const emptyGameBoardItemWord = Array.from(gameBoardWordItems).find(
      (item) =>
        !Array.from(item.querySelectorAll('span')).some((span) => span.textContent?.trim() !== ''),
    );

    if (emptyGameBoardItemWord) {
      emptyGameBoardItemWord.innerHTML = puzzleItem.innerHTML;
      puzzleItem.innerHTML = '';
    }
    isCanCheck(gameBoardWordItems);
  }

  clearBorders(gameBoardWordItems);
}

export function gameBoardItemListener(this: HTMLElement, e: MouseEvent) {
  const puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');
  const target = e.target as HTMLElement;
  const gameBoardItemWord = target.closest('.gameBoardItemWord');
  if (gameBoardItemWord) {
    const emptyPuzzleItems = Array.from(puzzleItems).find(
      (item) =>
        !Array.from(item.querySelectorAll('span')).some((span) => span.textContent?.trim() !== ''),
    );
    if (emptyPuzzleItems) {
      emptyPuzzleItems.innerHTML = gameBoardItemWord.innerHTML;
      gameBoardItemWord.innerHTML = '';
    }
    isCanCheck(puzzleItems);
  }

  const gameBoardItem = gameBoardItemWord?.parentElement;
  if (gameBoardItem) {
    const gameBoardItemWords: NodeListOf<HTMLElement> =
      gameBoardItem?.querySelectorAll('.gameBoardItemWord');
    clearBorders(gameBoardItemWords);
  }
}
