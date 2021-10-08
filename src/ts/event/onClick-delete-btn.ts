import SetTodoCount from '../set-todo-count';
import dragAndDrop from '../drag-and-drop';
import { IOnClickMain, ITodoList } from '../types/types';

export default class OnClickDeleteBtn implements IOnClickMain {
  constructor(private weeklyEl: HTMLDivElement) {}

  private compareDeleteIdAndItemId(deleteEl: HTMLDivElement, itemEl: HTMLDivElement): void {
    if (deleteEl.dataset.deleteid === itemEl.dataset.itemid) {
      itemEl.remove();

      const todoListWithString: string | null = localStorage.getItem('todo-list');
      let todoList: ITodoList[] | null | undefined = null;
      if (todoListWithString) {
        todoList = JSON.parse(todoListWithString);
      }

      todoList = todoList?.filter(todo => String(todo.randomId) !== itemEl.dataset.itemid);
      localStorage.setItem('todo-list', JSON.stringify(todoList));

      new SetTodoCount().countTodoList();
    }
  }

  private compareTargetAndDeleteEl(deleteEl: HTMLDivElement): void {
    const itemEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-item');
    itemEls.forEach(itemEl => {
      this.compareDeleteIdAndItemId(deleteEl, itemEl);
    });
  }

  public main(): void {
    this.weeklyEl.addEventListener('click', event => {
      const deleteEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.delete-icon');
      deleteEls.forEach(deleteEl => {
        if (event.target === deleteEl) {
          this.compareTargetAndDeleteEl(deleteEl);
          dragAndDrop();
        }
      });
    });
  }
}
