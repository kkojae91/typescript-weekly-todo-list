import setTodoCount from './set-todo-count';
import dragAndDrop from './drag-and-drop';

export default function importPreviousRecord(): void {
  const previousRecord = JSON.parse(localStorage.getItem('todo-list'));

  for (let i = 0; i < previousRecord.length; i++) {
    const id = previousRecord[i].randomId;
    const day = previousRecord[i].day;
    const template = previousRecord[i].template;
    const isActive = previousRecord[i].isActive;
    const weeklyItemEl: Element = document.createElement('div');
    weeklyItemEl.setAttribute('class', 'weekly-item');
    weeklyItemEl.setAttribute('data-itemid', String(id));
    weeklyItemEl.setAttribute('draggable', 'true');
    if (isActive) {
      weeklyItemEl.setAttribute('class', 'weekly-item active');
    }

    weeklyItemEl.innerHTML = template;

    const weeklyContainerEls: Elemnet[] = document.querySelectorAll('.weekly-container');
    weeklyContainerEls.forEach(weeklyContainerEl => {
      if (weeklyContainerEl.dataset.weekly === day) {
        weeklyContainerEl.lastChild.previousSibling.appendChild(weeklyItemEl);
      }
    });
    const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
    dayList.forEach(day => setTodoCount(day));
  }
  dragAndDrop();
}
