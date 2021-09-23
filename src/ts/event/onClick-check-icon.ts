import setTodoCount from '../set-todo-count';

interface ItodoList {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export default function onClickCheckIcon(weeklyEl: HTMLTableSectionElement): void {
  weeklyEl.addEventListener('click', event => {
    const checkIconEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.check-icon');
    checkIconEls.forEach(checkIconEl => {
      if (event.target === checkIconEl) {
        const currentId = checkIconEl.dataset.checkid;
        const currentWeeklyItemEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
          `.weekly-item[data-itemid="${currentId}"]`,
        );
        const editIconEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
          `.edit-icon[data-editid="${currentId}"]`,
        );
        let template: string | undefined = '';

        const todoListWithString: string | null = localStorage.getItem('todo-list');
        let todoList: ItodoList[] | null = null;
        if (todoListWithString) {
          todoList = JSON.parse(todoListWithString);
        }

        if (currentWeeklyItemEl?.classList.contains('active')) {
          currentWeeklyItemEl.classList.remove('active');
          editIconEl?.classList.remove('active');
          template = currentWeeklyItemEl?.innerHTML;
          todoList?.forEach(todo => {
            if (String(todo.randomId) === currentId && template) {
              todo.template = template;
              todo.isActive = false;
            }
          });
        } else {
          currentWeeklyItemEl?.classList.add('active');
          editIconEl?.classList.add('active');
          template = currentWeeklyItemEl?.innerHTML;
          todoList?.forEach(todo => {
            if (String(todo.randomId) === currentId && template) {
              todo.template = template;
              todo.isActive = true;
            }
          });
        }

        localStorage.setItem('todo-list', JSON.stringify(todoList));

        const currentDay: string | null | undefined =
          currentWeeklyItemEl?.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;

        currentDay && setTodoCount(currentDay);
      }
    });
  });
}
