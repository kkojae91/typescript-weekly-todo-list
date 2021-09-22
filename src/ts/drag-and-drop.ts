import setTodoCount from './set-todo-count';
import getDayOfEdit from './get-day-of-edit';

export default function dragAndDrop(): void {
  const weeklyItemsEls: Element[] = document.querySelectorAll('.weekly-items');
  const weeklyItemEls: Element[] = document.querySelectorAll('.weekly-item');
  let draggedItem: Element | null = null;
  const htmlEl: HTMLHtmlElement | null = document.querySelector('html');
  for (let i = 0; i < weeklyItemEls.length; i++) {
    const weeklyItemEl: Element = weeklyItemEls[i];

    weeklyItemEl.addEventListener('dragstart', () => {
      draggedItem = weeklyItemEl;
      setTimeout(() => {
        weeklyItemEl.style.opacity = '0.5';
      }, 0);
    });

    weeklyItemEl.addEventListener('dragend', () => {
      setTimeout(() => {
        if (weeklyItemEl.classList.contains('active')) {
          weeklyItemEl.style.opacity = '0.5';
        } else {
          weeklyItemEl.style.opacity = '1';
        }
        draggedItem = null;
      }, 0);
    });

    for (let j = 0; j < weeklyItemsEls.length; j++) {
      const weeklyItemsEl: Element = weeklyItemsEls[j];

      weeklyItemsEl.addEventListener('dragover', event => {
        event.preventDefault();
      });

      weeklyItemsEl.addEventListener('dragenter', event => {
        event.preventDefault();
        if (htmlEl?.classList.contains('dark')) {
          weeklyItemsEl.style.backgroundColor = '#575757';
        } else {
          weeklyItemsEl.style.backgroundColor = '#f0f0f0';
        }
      });

      weeklyItemsEl.addEventListener('dragleave', () => {
        weeklyItemsEl.style.backgroundColor = 'var(--weeklyItemsBgColor)';
      });

      weeklyItemsEl.addEventListener('drop', () => {
        weeklyItemsEl.appendChild(draggedItem);
        weeklyItemsEl.style.backgroundColor = 'var(--weeklyItemsBgColor)';

        const currentId = draggedItem.dataset.itemid;
        const currentDay = getDayOfEdit(draggedItem);
        const template = draggedItem.innerHTML;
        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));
        todoList?.forEach(todo => {
          if (String(todo.randomId) === currentId) {
            todo.day = currentDay;
            todo.template = template;
          }
        });
        localStorage.setItem('todo-list', JSON.stringify(todoList));

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));
      });
    }
  }
}
