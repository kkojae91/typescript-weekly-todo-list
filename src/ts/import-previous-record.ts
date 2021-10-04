import setTodoCount from './set-todo-count';
import dragAndDrop from './drag-and-drop';
import { IpreviousRecord, IImportPreviousRecord } from './types/types';

export default class ImportPreviousRecord implements IImportPreviousRecord {
  private _todoListWithString: string | null = localStorage.getItem('todo-list');
  private _previousRecord: IpreviousRecord[] = [];

  constructor() {}

  private createPreviousInfo(i: number): [string, HTMLDivElement] {
    const id: number = this._previousRecord[i].randomId;
    const day: string = this._previousRecord[i].day;
    const template: string = this._previousRecord[i].template;
    const isActive: boolean = this._previousRecord[i].isActive;
    const weeklyItemEl: HTMLDivElement = document.createElement('div');
    weeklyItemEl.setAttribute('class', 'weekly-item');
    weeklyItemEl.setAttribute('data-itemid', String(id));
    weeklyItemEl.setAttribute('draggable', 'true');

    if (isActive) {
      weeklyItemEl.setAttribute('class', 'weekly-item active');
    }
    weeklyItemEl.innerHTML = template;
    return [day, weeklyItemEl];
  }

  private appendWeeklyItemElToWeeklyContainerEls(day: string, weeklyItemEl: HTMLDivElement): void {
    const weeklyContainerEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll<HTMLDivElement>('.weekly-container');

    weeklyContainerEls.forEach(weeklyContainerEl => {
      if (weeklyContainerEl.dataset.weekly === day) {
        weeklyContainerEl?.lastChild?.previousSibling?.appendChild(weeklyItemEl);
      }
    });
  }

  public setPreviousRecordArray(): void {
    if (this._todoListWithString) {
      this._previousRecord = JSON.parse(this._todoListWithString);
    }
  }

  public setPreviousRecord(): void {
    if (this._previousRecord) {
      for (let i = 0; i < this._previousRecord.length; i++) {
        const [day, weeklyItemEl] = this.createPreviousInfo(i);
        this.appendWeeklyItemElToWeeklyContainerEls(day, weeklyItemEl);

        const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        dayList.forEach(day => setTodoCount(day));
      }
    }
    dragAndDrop();
  }
}
