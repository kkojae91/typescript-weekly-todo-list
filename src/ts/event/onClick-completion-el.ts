import dragAndDrop from '../drag-and-drop';
import { MakeWeeklyItem } from '../template/makeTemplate';
import Initialize from '../initialize/initialize';
import { IOnClickMain } from '../types/types';

export default class OnClickCompletionEl implements IOnClickMain {
  private plusDayEls: NodeListOf<HTMLHeadingElement> = document.querySelectorAll<HTMLHeadingElement>('.plus-day-item');
  private completionEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.btn__completion');
  private titleInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.plus-title-input');
  private timeInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#time-input');
  private plusImportantStarEls: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.important-item-star');

  constructor(private plusEl: HTMLTableSectionElement) {}

  private notBlankInputValue(
    userTitleInput: string,
    userTimeInput: string,
    userDayInput: string,
    userImportantInput: string,
  ) {
    new MakeWeeklyItem(userTitleInput, userTimeInput, userDayInput, userImportantInput).makeWeeklyItem();
    this.plusEl.classList.remove('active');
    const initialize = new Initialize();
    initialize.initializeClassListActive(this.plusDayEls);
    initialize.initializeImportantStarEls(this.plusImportantStarEls);
    if (this.titleInputEl && this.timeInputEl) {
      this.titleInputEl.value = '';
      this.timeInputEl.value = '';
    }
  }

  private targetCheck(dayItemEl: HTMLHeadingElement, importantItemEl: HTMLDivElement): void {
    const userTitleInput: string | undefined = this.titleInputEl?.value;
    const userTimeInput: string | undefined = this.timeInputEl?.value;
    const userDayInput: string | null = dayItemEl?.textContent;
    const userImportantInput: string | undefined = importantItemEl.dataset.important;
    if (userTitleInput === '') {
      alert('Enter the title');
    } else if (userTimeInput === '') {
      alert('Enter the time');
    } else {
      if (userTitleInput && userTimeInput && userDayInput && userImportantInput) {
        this.notBlankInputValue(userTitleInput, userTimeInput, userDayInput, userImportantInput);
      }
    }
  }

  public main(): void {
    this.plusEl.addEventListener('click', event => {
      const dayItemEl = document.querySelector<HTMLHeadingElement>('.plus-day-item.active');
      const importantItemEl = document.querySelector<HTMLDivElement>('.important-item-star.active');
      if (event.target === this.completionEl && dayItemEl && importantItemEl) {
        this.targetCheck(dayItemEl, importantItemEl);
        dragAndDrop();
      }
    });
  }
}
