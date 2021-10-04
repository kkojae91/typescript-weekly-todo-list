import SetTodoCount from '../set-todo-count';
import { ITodoList, IMakeWeeklyIteminnerHTML, IMakeWeeklyItem } from '../types/types';

export class MakeWeeklyIteminnerHTML implements IMakeWeeklyIteminnerHTML {
  constructor(private _id: string, private _title: string, private _time: string, private _count: string) {}

  makeInnerHTML(): string {
    const importantDiv = `<div class="material-icons item-star weekly-item-important" data-importantid=${this._id}>star_rate</div>`;
    const template = `
    <h3 class="weekly-item-title" data-titleid=${this._id}>${this._title}</h3>
    <div class="weekly-item-box">
      <p class="weekly-item-time" data-timeid=${this._id}>${this._time}</p>
      <div class="weekly-item-stars" data-starsid=${this._id}>
        ${importantDiv.repeat(Number(this._count))}
      </div>
    </div>
    <div class="weekly-icons">
      <div class="material-icons weekly-icon edit-icon" data-editid=${this._id}>drive_file_rename_outline</div>
      <div class="material-icons weekly-icon check-icon" data-checkid=${this._id}>check_circle_outline</div>
      <div class="material-icons weekly-icon delete-icon" data-deleteid=${this._id}>delete_outline</div>
    </div>
  `;
    return template;
  }
}

export class MakeWeeklyItem implements IMakeWeeklyItem {
  constructor(
    private _userTitleInput: string,
    private _userTimeInput: string,
    private _userDayInput: string,
    private _userImportantInput: string,
    private _currentId: number = 0,
  ) {}

  private setWeeklyItemEl(): [number, HTMLDivElement, string] {
    let randomId = 0;
    this._currentId === 0 ? (randomId = Math.floor(Math.random() * 1000000000)) : (randomId = this._currentId);
    const weeklyItemEl: HTMLDivElement = document.createElement('div');
    weeklyItemEl.setAttribute('class', 'weekly-item');
    weeklyItemEl.setAttribute('data-itemid', String(randomId));
    weeklyItemEl.setAttribute('draggable', 'true');

    const template: string = new MakeWeeklyIteminnerHTML(
      String(randomId),
      this._userTitleInput,
      this._userTimeInput,
      this._userImportantInput,
    ).makeInnerHTML();
    weeklyItemEl.innerHTML = template;
    return [randomId, weeklyItemEl, template];
  }

  private appendWeeklyItemToWeeklyContainer(weeklyItemEl: HTMLDivElement): void {
    const weeklyContainerEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll<HTMLDivElement>('.weekly-container');
    weeklyContainerEls.forEach(weeklyContainerEl => {
      if (weeklyContainerEl.dataset.weekly === this._userDayInput) {
        weeklyContainerEl?.lastChild?.previousSibling?.appendChild(weeklyItemEl);
      }
    });

    new SetTodoCount().countTodoList();
  }

  private addLocalStorage(newTodoList: ITodoList): void {
    const todoListWithString: string | null = localStorage.getItem('todo-list');
    let todoList: ITodoList[] | null = null;

    if (todoListWithString) {
      todoList = JSON.parse(todoListWithString);
    }

    todoList ? todoList.push(newTodoList) : (todoList = [newTodoList]);
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }

  public makeWeeklyItem(): void {
    const [randomId, weeklyItemEl, template] = this.setWeeklyItemEl();
    this.appendWeeklyItemToWeeklyContainer(weeklyItemEl);

    const newTodoList: ITodoList = {
      randomId,
      day: this._userDayInput,
      template,
      isActive: false,
    };

    this.addLocalStorage(newTodoList);
  }
}
