import setTodoCount from '../set-todo-count';

export default function onClickCheckIcon(weeklyEl: Element): void {
  weeklyEl.addEventListener('click', event => {
    const checkIconEls = document.querySelectorAll('.check-icon');
    checkIconEls.forEach(checkIconEl => {
      if (event.target === checkIconEl) {
        const currentId = checkIconEl.dataset.checkid;
        const currentWeeklyItemEl = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);
        const editIconEl = document.querySelector(`.edit-icon[data-editid="${currentId}"]`);
        let template = '';
        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));
        if (currentWeeklyItemEl?.classList.contains('active')) {
          currentWeeklyItemEl.classList.remove('active');
          editIconEl?.classList.remove('active');
          template = currentWeeklyItemEl?.innerHTML;
          todoList?.forEach(todo => {
            if (String(todo.randomId) === currentId) {
              todo.template = template;
              todo.isActive = false;
            }
          });
        } else {
          currentWeeklyItemEl?.classList.add('active');
          editIconEl?.classList.add('active');
          template = currentWeeklyItemEl?.innerHTML;
          todoList?.forEach(todo => {
            if (String(todo.randomId) === currentId) {
              todo.template = template;
              todo.isActive = true;
            }
          });
        }

        localStorage.setItem('todo-list', JSON.stringify(todoList));

        const currentDay: string =
          currentWeeklyItemEl?.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;
        setTodoCount(currentDay);
      }
    });
  });
}
