import setTodoCount from '../set-todo-count';
import dragAndDrop from '../drag-and-drop';

function compareDeleteIdAndItemId(deleteEl: Element, itemEl: Element): void {
  if (deleteEl.dataset.deleteid === itemEl.dataset.itemid) {
    itemEl.remove();

    let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));

    todoList = todoList?.filter(todo => String(todo.randomId) !== itemEl.dataset.itemid);
    localStorage.setItem('todo-list', JSON.stringify(todoList));

    const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
    dayList.forEach(day => setTodoCount(day));
  }
}

function compareTargetAndDeleteEl(deleteEl: Element): void {
  const itemEls = document.querySelectorAll('.weekly-item');
  itemEls.forEach(itemEl => {
    compareDeleteIdAndItemId(deleteEl, itemEl);
  });
}

export default function onClickDeleteBtn(weeklyEl: Element): void {
  weeklyEl.addEventListener('click', event => {
    const deleteEls: Element[] = document.querySelectorAll('.delete-icon');
    deleteEls.forEach(deleteEl => {
      if (event.target === deleteEl) {
        compareTargetAndDeleteEl(deleteEl);
        dragAndDrop();
      }
    });
  });
}
