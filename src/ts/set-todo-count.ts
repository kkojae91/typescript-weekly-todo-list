import { ISetTodoCount } from './types/types';

export default class SetTodoCount implements ISetTodoCount {
  private dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  constructor() {}

  public countTodoList(): void {
    this.dayList.forEach(day => {
      const itemLength: number = document.querySelectorAll(`.${day}-container .weekly-items .weekly-item`).length;
      const doneItemLength: number = document.querySelectorAll(
        `.${day}-container .weekly-items .weekly-item.active`,
      ).length;
      const todoCountEl: HTMLParagraphElement | null = document.querySelector(
        `.${day}-container .weekly-container-header .weekly-todo-count`,
      );

      if (todoCountEl) {
        todoCountEl.textContent = String(itemLength - doneItemLength);
      }
    });
  }
}
