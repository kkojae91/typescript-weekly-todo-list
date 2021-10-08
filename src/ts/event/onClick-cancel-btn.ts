import Initialize from '../initialize/initialize';
import { IOnClickMain } from '../types/types';

export default class OnClickCancelBtn implements IOnClickMain {
  private cancelBtnEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.btn__cancel');
  private plusDayItems: NodeListOf<HTMLHeadingElement> =
    document.querySelectorAll<HTMLHeadingElement>('.plus-day-item');
  private plusImportantStarEls: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.important-item-star');
  private titleInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.plus-title-input');
  private timeInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#time-input');
  constructor(private plusEl: HTMLTableSectionElement) {}

  main(): void {
    this.cancelBtnEl?.addEventListener('click', () => {
      this.plusEl.classList.remove('active');

      const initialize = new Initialize();
      initialize.initializeClassListActive(this.plusDayItems);
      initialize.initializeImportantStarEls(this.plusImportantStarEls);

      if (this.titleInputEl && this.timeInputEl) {
        this.titleInputEl.value = '';
        this.timeInputEl.value = '';
      }
    });
  }
}
