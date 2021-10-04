import SetTodoCount from '../set-todo-count';
import dragAndDrop from '../drag-and-drop';

interface ItodoList {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

function compareDeleteIdAndItemId(deleteEl: HTMLDivElement, itemEl: HTMLDivElement): void {
  if (deleteEl.dataset.deleteid === itemEl.dataset.itemid) {
    itemEl.remove();

    const todoListWithString: string | null = localStorage.getItem('todo-list');
    let todoList: ItodoList[] | null | undefined = null;
    if (todoListWithString) {
      todoList = JSON.parse(todoListWithString);
    }

    todoList = todoList?.filter(todo => String(todo.randomId) !== itemEl.dataset.itemid);
    localStorage.setItem('todo-list', JSON.stringify(todoList));

    new SetTodoCount().countTodoList();
  }
}

function compareTargetAndDeleteEl(deleteEl: HTMLDivElement): void {
  const itemEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-item');
  itemEls.forEach(itemEl => {
    compareDeleteIdAndItemId(deleteEl, itemEl);
  });
}

export default function onClickDeleteBtn(weeklyEl: HTMLDivElement): void {
  weeklyEl.addEventListener('click', event => {
    const deleteEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.delete-icon');
    deleteEls.forEach(deleteEl => {
      if (event.target === deleteEl) {
        compareTargetAndDeleteEl(deleteEl);
        dragAndDrop();
      }
    });
  });
}
