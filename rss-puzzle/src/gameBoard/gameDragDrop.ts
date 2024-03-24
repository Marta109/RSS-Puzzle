export const puzzleBoarDragStart = (event: DragEvent) => {
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

export const gameBoardPuzzleItemDragstart = (event: DragEvent) => {
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

export const gameBoardPuzzleItemDragover = (event: DragEvent) => {
  event.preventDefault();
};

export const gameBoardPuzzleItemDrop = (event: DragEvent) => {
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
