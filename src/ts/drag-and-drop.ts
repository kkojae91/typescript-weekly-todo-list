import SetTodoCount from './set-todo-count';
import GetDayOfEdit from './get-day-of-edit';

interface ItodoList {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export default function dragAndDrop(): void {
  const weeklyItemsEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-items');
  const weeklyItemEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-item');
  let draggedItem: HTMLDivElement | null = null;
  const htmlEl: HTMLHtmlElement | null = document.querySelector('html');
  for (let i = 0; i < weeklyItemEls.length; i++) {
    const weeklyItemEl: HTMLDivElement = weeklyItemEls[i];

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
      const weeklyItemsEl: HTMLDivElement = weeklyItemsEls[j];

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
        if (draggedItem) {
          weeklyItemsEl.appendChild(draggedItem);
        }
        weeklyItemsEl.style.backgroundColor = 'var(--weeklyItemsBgColor)';

        const currentId = draggedItem?.dataset.itemid;

        let currentDay: string;
        if (draggedItem) {
          const getDay = new GetDayOfEdit(draggedItem).getDay();
          if (getDay) {
            currentDay = getDay;
          }
        }

        let template: string;
        if (draggedItem) {
          template = draggedItem.innerHTML;
        }

        const todoListWithString: string | null = localStorage.getItem('todo-list');
        let todoList: ItodoList[] | null = null;
        if (todoListWithString) {
          todoList = JSON.parse(todoListWithString);
        }

        todoList?.forEach(todo => {
          if (String(todo.randomId) === currentId) {
            todo.day = currentDay;
            todo.template = template;
          }
        });
        localStorage.setItem('todo-list', JSON.stringify(todoList));

        new SetTodoCount().countTodoList();
      });
    }
  }
}
