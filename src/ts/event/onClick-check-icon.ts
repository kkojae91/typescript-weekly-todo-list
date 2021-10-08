import SetTodoCount from '../set-todo-count';
import { ITodoList, IOnClickMain } from '../types/types';

export default class OnClickCheckIcon implements IOnClickMain {
  template: string | undefined = '';
  todoListWithString: string | null = localStorage.getItem('todo-list');
  todoList: ITodoList[] | null = null;
  constructor(private weeklyEl: HTMLTableSectionElement) {}

  private removeClassListActive(
    currentWeeklyItemEl: HTMLDivElement,
    editIconEl: HTMLDivElement,
    currentId: string,
  ): void {
    currentWeeklyItemEl.classList.remove('active');
    editIconEl.classList.remove('active');
    this.template = currentWeeklyItemEl?.innerHTML;
    this.todoList?.forEach(todo => {
      if (String(todo.randomId) === currentId && this.template) {
        todo.template = this.template;
        todo.isActive = false;
      }
    });
  }

  private addClassListActive(currentWeeklyItemEl: HTMLDivElement, editIconEl: HTMLDivElement, currentId: string): void {
    currentWeeklyItemEl.classList.add('active');
    editIconEl.classList.add('active');
    this.template = currentWeeklyItemEl?.innerHTML;
    this.todoList?.forEach(todo => {
      if (String(todo.randomId) === currentId && this.template) {
        todo.template = this.template;
        todo.isActive = true;
      }
    });
  }

  private checkClassListContainsActive(
    currentWeeklyItemEl: HTMLDivElement,
    editIconEl: HTMLDivElement,
    currentId: string,
  ): void {
    if (currentWeeklyItemEl.classList.contains('active')) {
      this.removeClassListActive(currentWeeklyItemEl, editIconEl, currentId);
    } else {
      this.addClassListActive(currentWeeklyItemEl, editIconEl, currentId);
    }
  }

  private jsonParse(): void {
    if (this.todoListWithString) {
      this.todoList = JSON.parse(this.todoListWithString);
    }
  }

  private getCurrentWeeklyItemElAndEditIconEl(
    checkIconEl: HTMLDivElement,
  ): [HTMLDivElement | null, HTMLDivElement | null, string | undefined] {
    const currentId = checkIconEl.dataset.checkid;
    const currentWeeklyItemEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
      `.weekly-item[data-itemid="${currentId}"]`,
    );
    const editIconEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
      `.edit-icon[data-editid="${currentId}"]`,
    );

    return [currentWeeklyItemEl, editIconEl, currentId];
  }

  private checkIconElsClickEvent(checkIconEls: NodeListOf<HTMLDivElement>, event: MouseEvent): void {
    checkIconEls.forEach(checkIconEl => {
      if (event.target === checkIconEl) {
        const [currentWeeklyItemEl, editIconEl, currentId] = this.getCurrentWeeklyItemElAndEditIconEl(checkIconEl);

        this.jsonParse();

        if (currentWeeklyItemEl && editIconEl && currentId) {
          this.checkClassListContainsActive(currentWeeklyItemEl, editIconEl, currentId);
        }

        localStorage.setItem('todo-list', JSON.stringify(this.todoList));

        const currentDay: string | null | undefined =
          currentWeeklyItemEl?.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;

        currentDay && new SetTodoCount().countTodoList();
      }
    });
  }

  public main(): void {
    this.weeklyEl.addEventListener('click', event => {
      const checkIconEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.check-icon');
      this.checkIconElsClickEvent(checkIconEls, event);
    });
  }
}
