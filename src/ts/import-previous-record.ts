import setTodoCount from './set-todo-count';
import dragAndDrop from './drag-and-drop';

interface IpreviousRecord {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export default function importPreviousRecord(): void {
  const todoListWithString: string | null = localStorage.getItem('todo-list');
  let previousRecord: IpreviousRecord[] | null = null;
  if (todoListWithString) {
    previousRecord = JSON.parse(todoListWithString);
  }

  if (previousRecord) {
    for (let i = 0; i < previousRecord.length; i++) {
      const id: number = previousRecord[i].randomId;
      const day: string = previousRecord[i].day;
      const template: string = previousRecord[i].template;
      const isActive: boolean = previousRecord[i].isActive;
      const weeklyItemEl: HTMLDivElement = document.createElement('div');
      weeklyItemEl.setAttribute('class', 'weekly-item');
      weeklyItemEl.setAttribute('data-itemid', String(id));
      weeklyItemEl.setAttribute('draggable', 'true');
      if (isActive) {
        weeklyItemEl.setAttribute('class', 'weekly-item active');
      }

      weeklyItemEl.innerHTML = template;

      const weeklyContainerEls: NodeListOf<HTMLDivElement> =
        document.querySelectorAll<HTMLDivElement>('.weekly-container');

      weeklyContainerEls.forEach(weeklyContainerEl => {
        if (weeklyContainerEl.dataset.weekly === day) {
          weeklyContainerEl?.lastChild?.previousSibling?.appendChild(weeklyItemEl);
        }
      });
      const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
      dayList.forEach(day => setTodoCount(day));
    }
  }
  dragAndDrop();
}
