import { getData } from '../data/getData';
import { createGameBoardItems } from '../gameBoard/createGameBoardItems';

interface PuzzleData {
  rounds: {
    levelData: {
      author: string;
      cutSrc: string;
      id: string;
      imageSrc: string;
      name: string;
      year: string;
    };
    words: {
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
    }[];
  }[];
}

export function puzzlesBoardSetter(): void {
  getData().then((data: PuzzleData) => {
    let column: number = 0;
    let line: number = 0;

    createGameBoardItems(data, column, line, true);

    const puzzlesBoard = document.querySelector<HTMLElement>('.puzzlesBoard');
    const gameBoard = document.querySelector<HTMLElement>('.gameBoard');
    const checkBtn = document.querySelector<HTMLButtonElement>('.checkGame');
    const nextPuzzleBtn = document.querySelector<HTMLButtonElement>('.nextPuzzle');
    const autoCompleteBtn = document.querySelector<HTMLButtonElement>('.autoCompleteBtn');
    const audioHintBtnIcon = document.querySelector<HTMLButtonElement>('#audio-hint');
    const audio = document.querySelector<HTMLButtonElement>('#audio');
    const showHint = document.querySelector<HTMLElement>('.showHint');

    if (nextPuzzleBtn) {
      nextPuzzleBtn.disabled = true;
    }

    const gameBoardItem = gameBoard?.querySelectorAll<HTMLElement>('.gameBoardItem');

    let gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[line];
    let gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
    let puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');
    let hint = document.querySelector<HTMLElement>('.hint');

    showHint?.addEventListener('click', () => {
      if (hint) {
        hint.textContent = data.rounds[column].words[line].textExampleTranslate;
        if (hint.style.display === 'inline-block') {
          hint.style.display = 'none';
        } else {
          hint.style.display = 'inline-block';
        }
      }
    });

    audioHintBtnIcon?.addEventListener('click', () => {
      if (audio instanceof HTMLAudioElement) {
        const audioHintBtnIcon = document.querySelector('#audioHintBtnIcon');
        audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${data.rounds[column].words[line].audioExample}`;
        audio.addEventListener('loadeddata', () => {
          audio.play();
          audioHintBtnIcon?.classList.add('fa-solid', 'fa-volume-high');
        });
        audio.addEventListener('ended', () => {
          audioHintBtnIcon?.classList.remove('fa-solid', 'fa-volume-high');
        });
      }
    });

    const puzzleBoardItemListener = function (this: HTMLElement, e: MouseEvent) {
      const target = e.target as HTMLElement;
      const puzzleItem = target.closest('.puzzleItem');
      if (puzzleItem) {
        const emptyGameBoardItemWord = Array.from(gameBoardWordItems).find(
          (item) =>
            !Array.from(item.querySelectorAll('span')).some(
              (span) => span.textContent?.trim() !== '',
            ),
        );
        if (emptyGameBoardItemWord) {
          emptyGameBoardItemWord.innerHTML = puzzleItem.innerHTML;
          puzzleItem.innerHTML = '';
        }
      }
    };

    const gameBoardItemListener = function (this: HTMLElement, e: MouseEvent) {
      const target = e.target as HTMLElement;
      const gameBoardItemWord = target.closest('.gameBoardItemWord');
      if (gameBoardItemWord) {
        const emptyPuzzleItems = Array.from(puzzleItems).find(
          (item) =>
            !Array.from(item.querySelectorAll('span')).some(
              (span) => span.textContent?.trim() !== '',
            ),
        );
        if (emptyPuzzleItems) {
          emptyPuzzleItems.innerHTML = gameBoardItemWord.innerHTML;
          gameBoardItemWord.innerHTML = '';
        }
      }
    };

    const dragstart = (event: DragEvent) => {
      if (event.dataTransfer) {
        const target = event.target as HTMLElement;
        const isText = target.querySelector('span');

        if (
          target.classList.contains('puzzleItem') &&
          isText?.textContent?.trim() !== '' &&
          isText !== null
        ) {
          const itemId = target.id;
          event.dataTransfer.setData('text/plain', itemId);
        } else {
          event.preventDefault();
        }
      }
    };

    const gameBoardPuzzleItemDragstart = (event: DragEvent) => {
      const puzzle = event.target as HTMLElement;
      const isText = puzzle.querySelector('span');
      if (
        puzzle.classList.contains('gameBoardItemWord') &&
        event.dataTransfer &&
        isText?.textContent?.trim() !== '' &&
        isText !== null
      ) {
        event.dataTransfer.setData('text/plain', puzzle.id);
      } else {
        event.preventDefault();
      }
    };

    const gameBoardPuzzleItemDragover = (event: DragEvent) => {
      event.preventDefault();
    };

    const gameBoardPuzzleItemDrop = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer) {
        const draggedElementId = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedElementId);
        let puzzle = event.target as HTMLElement;

        if (puzzle.tagName !== 'DIV' && puzzle.parentElement) {
          puzzle = puzzle.parentElement;
        }

        if (puzzle.innerHTML === '' && draggedElement) {
          puzzle.innerHTML = draggedElement.innerHTML;
          draggedElement.innerHTML = '';
        } else if (draggedElement && puzzle && puzzle !== draggedElement) {
          const nextHTML = puzzle.innerHTML;
          const currentHTML = draggedElement.innerHTML;
          puzzle.innerHTML = currentHTML;
          draggedElement.innerHTML = nextHTML;
        }
      }
    };

    gameBoardWordItems.forEach((puzzleItem) => {
      puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
      puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
      puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
    });

    if (puzzlesBoard) {
      gameBoardRow.removeEventListener('click', gameBoardItemListener);
      puzzlesBoard.removeEventListener('click', puzzleBoardItemListener);

      gameBoardRow.addEventListener('click', gameBoardItemListener);
      puzzlesBoard.addEventListener('click', puzzleBoardItemListener);
      puzzlesBoard.addEventListener('dragstart', dragstart);
    }

    if (checkBtn && gameBoardWordItems && puzzlesBoard && gameBoardItem) {
      checkBtn.addEventListener('click', () => {
        if (gameBoardWordItems !== null) {
          checkBtn.disabled = true;
          const string = data.rounds[column].words[line].textExample;
          let result = '';
          gameBoardWordItems.forEach((el) => {
            let word = el.querySelector('span');
            if (word) {
              result += word.textContent + ' ';
            } else {
              result += el.textContent + ' ';
            }
          });
          if (result.trim() === string.trim()) {
            if (nextPuzzleBtn && hint) {
              nextPuzzleBtn.classList.remove('btnDisabled');
              checkBtn.classList.add('btnDisabled');
              puzzlesBoard.classList.add('noHover');
              gameBoardItem[line].classList.add('noHover');
              nextPuzzleBtn.disabled = false;
              hint.style.display = 'inline-block';
            }
          } else {
            checkBtn.disabled = false;
            if (autoCompleteBtn) {
              autoCompleteBtn.disabled = false;
              autoCompleteBtn.classList.remove('btnDisabled');
            }
          }
          console.log('answer ', string);
        }
      });
    }

    if (nextPuzzleBtn && checkBtn && puzzlesBoard && gameBoardItem) {
      nextPuzzleBtn.addEventListener('click', () => {
        checkBtn.classList.remove('btnDisabled');
        puzzlesBoard.classList.remove('noHover');
        checkBtn.disabled = false;
        gameBoardRow.removeEventListener('click', gameBoardItemListener);
        puzzlesBoard.removeEventListener('click', puzzleBoardItemListener);
        nextPuzzleBtn.classList.add('btnDisabled');
        nextPuzzleBtn.disabled = true;

        gameBoardWordItems.forEach((puzzleItem) => {
          puzzleItem.removeEventListener('dragstart', gameBoardPuzzleItemDragstart);
          puzzleItem.removeEventListener('dragover', gameBoardPuzzleItemDragover);
          puzzleItem.removeEventListener('drop', gameBoardPuzzleItemDrop);
        });
        // console.log(data);
        line++;
        if (hint) {
          hint.style.display = 'none';
        }

        if (line < data.rounds[column].words.length) {
          createGameBoardItems(data, column, line, false);

          gameBoardRow = document.querySelectorAll<HTMLElement>('.gameBoardItem')[line];
          gameBoardWordItems = gameBoardRow.querySelectorAll<HTMLElement>('.gameBoardItemWord');
          puzzleItems = document.querySelectorAll<HTMLElement>('.puzzleItem');

          gameBoardRow.addEventListener('click', gameBoardItemListener);
          puzzlesBoard.addEventListener('click', puzzleBoardItemListener);

          gameBoardWordItems.forEach((puzzleItem) => {
            puzzleItem.addEventListener('dragstart', gameBoardPuzzleItemDragstart);
            puzzleItem.addEventListener('dragover', gameBoardPuzzleItemDragover);
            puzzleItem.addEventListener('drop', gameBoardPuzzleItemDrop);
          });

          if (autoCompleteBtn) autoCompleteBtn.disabled = false;
        } else {
          if (autoCompleteBtn && gameBoard) {
            autoCompleteBtn.disabled = true;
            autoCompleteBtn.classList.add('btnDisabled');
            checkBtn.disabled = true;
            checkBtn.classList.add('btnDisabled');

            gameBoard.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${data.rounds[column].levelData.imageSrc})`;
          }
        }
      });
    }

    if (autoCompleteBtn && puzzlesBoard && checkBtn && nextPuzzleBtn) {
      autoCompleteBtn.addEventListener('click', () => {
        if (hint) {
          hint.textContent = data.rounds[column].words[line].textExampleTranslate;
          hint.style.display = 'inline-block';
        }
        checkBtn.disabled = true;
        checkBtn.classList.add('btnDisabled');
        nextPuzzleBtn.disabled = false;
        nextPuzzleBtn.classList.remove('btnDisabled');
        autoCompleteBtn.disabled = true;
        autoCompleteBtn.classList.add('btnDisabled');
        const string = data.rounds[column].words[line].textExample.split(' ');
        gameBoardRow
          .querySelectorAll('.gameBoardItemWord')
          .forEach((el, i) => (el.textContent = string[i]));
        puzzlesBoard.querySelectorAll('.puzzleItem').forEach((el) => (el.innerHTML = ''));
      });
    }
  });
}
