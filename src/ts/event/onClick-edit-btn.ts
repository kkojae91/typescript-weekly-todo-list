import setTodoCount from '../set-todo-count';
import { initializeClassListActive, initializeImportantStarEls } from '../initialize/initialize';
import { makeWeeklyItem, makeWeeklyIteminnerHTML } from '../template/makeTemplate';

export default function onClickEditBtn(plusEl: Element): void {
  const editBtn: Element | null = document.querySelector('.btn__edit');
  const completionBtn: Element = document.querySelector('.btn__completion');
  plusEl.addEventListener('click', event => {
    if (event.target === editBtn) {
      const currentId: string | null = localStorage.getItem('currentId');
      const currentDay: string | null = localStorage.getItem('currentDay');

      const currentPlusTitleEl = document.querySelector('.plus-title-input');
      const currentPlusTimeEl = document.querySelector('#time-input');
      const currentPlusTitleInput: string = currentPlusTitleEl?.value;
      const currentPlusTimeInput: string = currentPlusTimeEl?.value;
      const currentPlusDayItemText: string | null | undefined =
        document.querySelector('.plus-day-item.active')?.textContent;
      const currentPlusImportantStarCount: string =
        document.querySelector('.important-item-star.active')?.dataset.important;
      const editWeeklyItemEl: Element = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);

      const plusDayEls = document.querySelectorAll('.plus-day-item');
      const plusImportantStarEls: Element[] = document.querySelectorAll('.important-item-star');

      if (currentDay === currentPlusDayItemText) {
        const template: string = makeWeeklyIteminnerHTML(
          currentId,
          currentPlusTitleInput,
          currentPlusTimeInput,
          currentPlusImportantStarCount,
        );
        editWeeklyItemEl.innerHTML = template;

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));

        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));
        todoList?.forEach(todo => {
          if (String(todo.randomId) === currentId) {
            todo.template = template;
          }
        });
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      } else {
        const weeklyItemEl: Element = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);
        makeWeeklyItem(
          currentPlusTitleInput,
          currentPlusTimeInput,
          currentPlusDayItemText,
          currentPlusImportantStarCount,
        );
        weeklyItemEl.remove();

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));

        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));

        todoList = todoList?.filter(todo => String(todo.randomId) !== currentId);
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      }
      completionBtn.classList.remove('active');
      editBtn.classList.add('active');
      plusEl.classList.remove('active');

      initializeClassListActive(plusDayEls);
      initializeImportantStarEls(plusImportantStarEls);
      currentPlusTitleEl.value = '';
      currentPlusTimeEl.value = '';
    }
  });
}
