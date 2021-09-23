import setTodoCount from '../set-todo-count';
import { initializeClassListActive, initializeImportantStarEls } from '../initialize/initialize';
import { makeWeeklyItem, makeWeeklyIteminnerHTML } from '../template/makeTemplate';

interface ItodoList {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export default function onClickEditBtn(plusEl: Element): void {
  const editBtn: HTMLDivElement | null = document.querySelector('.btn__edit');
  const completionBtn: HTMLDivElement | null = document.querySelector('.btn__completion');
  plusEl.addEventListener('click', event => {
    if (event.target === editBtn) {
      const currentId: string | null = localStorage.getItem('currentId');
      const currentDay: string | null = localStorage.getItem('currentDay');

      const currentPlusTitleEl: HTMLInputElement | null = document.querySelector('.plus-title-input');
      const currentPlusTimeEl: HTMLInputElement | null = document.querySelector('#time-input');
      const currentPlusTitleInput: string | undefined = currentPlusTitleEl?.value;
      const currentPlusTimeInput: string | undefined = currentPlusTimeEl?.value;
      const currentPlusDayItemText: string | null | undefined =
        document.querySelector<HTMLDivElement>('.plus-day-item.active')?.textContent;
      const currentPlusImportantStarCount: string | undefined =
        document.querySelector<HTMLDivElement>('.important-item-star.active')?.dataset.important;
      const editWeeklyItemEl: HTMLDivElement | null = document.querySelector(
        `.weekly-item[data-itemid="${currentId}"]`,
      );

      const plusDayEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-day-item');
      const plusImportantStarEls: NodeListOf<HTMLDivElement> =
        document.querySelectorAll<HTMLDivElement>('.important-item-star');

      if (
        currentDay === currentPlusDayItemText &&
        currentId &&
        currentPlusTitleInput &&
        currentPlusTimeInput &&
        currentPlusImportantStarCount
      ) {
        const template: string = makeWeeklyIteminnerHTML(
          currentId,
          currentPlusTitleInput,
          currentPlusTimeInput,
          currentPlusImportantStarCount,
        );

        if (editWeeklyItemEl) {
          editWeeklyItemEl.innerHTML = template;
        }

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));

        const todoListWithString: string | null = localStorage.getItem('todo-list');
        let todoList: ItodoList[] | null = null;
        if (todoListWithString) {
          todoList = JSON.parse(todoListWithString);
        }

        todoList?.forEach(todo => {
          if (String(todo.randomId) === currentId) {
            todo.template = template;
          }
        });
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      } else {
        const weeklyItemEl: HTMLDivElement | null = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);
        if (currentPlusTitleInput && currentPlusTimeInput && currentPlusDayItemText && currentPlusImportantStarCount) {
          makeWeeklyItem(
            currentPlusTitleInput,
            currentPlusTimeInput,
            currentPlusDayItemText,
            currentPlusImportantStarCount,
          );
        }

        weeklyItemEl?.remove();

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));

        const todoListWithString: string | null = localStorage.getItem('todo-list');
        let todoList: ItodoList[] | null | undefined = null;
        if (todoListWithString) {
          todoList = JSON.parse(todoListWithString);
        }

        todoList = todoList?.filter(todo => String(todo.randomId) !== currentId);
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      }
      completionBtn?.classList.remove('active');
      editBtn?.classList.add('active');
      plusEl?.classList.remove('active');

      initializeClassListActive(plusDayEls);
      initializeImportantStarEls(plusImportantStarEls);
      if (currentPlusTitleEl && currentPlusTimeEl) {
        currentPlusTitleEl.value = '';
        currentPlusTimeEl.value = '';
      }
    }
  });
}
