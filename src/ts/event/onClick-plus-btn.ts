import { IOnClickMain } from '../types/types';

export default class OnClickPlusBtn implements IOnClickMain {
  private plusIcons: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.add-icon');
  private dayItems: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-day-item');
  private completionBtn: HTMLDivElement | null = document.querySelector('.btn__completion');
  private editBtn: HTMLDivElement | null = document.querySelector('.btn__edit');

  constructor(private weeklyEl: HTMLTableSectionElement, private plusEl: HTMLTableSectionElement) {}

  private addAndRemoveActive(itemEl: HTMLDivElement): void {
    this.plusEl.classList.add('active');
    this.completionBtn?.classList.add('active');
    this.editBtn?.classList.remove('active');
    itemEl.classList.add('active');
  }

  public main(): void {
    const [monPlusIcon, tuePlusIcon, wedPlusIcon, thuPlusIcon, friPlusIcon] = this.plusIcons;
    const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl] = this.dayItems;
    this.weeklyEl.addEventListener('click', event => {
      if (event.target === monPlusIcon && this.completionBtn && this.editBtn) {
        this.addAndRemoveActive(mondayItemEl);
      } else if (event.target === tuePlusIcon && this.completionBtn && this.editBtn) {
        this.addAndRemoveActive(tuesdayItemEl);
      } else if (event.target === wedPlusIcon && this.completionBtn && this.editBtn) {
        this.addAndRemoveActive(wednesdayItemEl);
      } else if (event.target === thuPlusIcon && this.completionBtn && this.editBtn) {
        this.addAndRemoveActive(thursdayItemEl);
      } else if (event.target === friPlusIcon && this.completionBtn && this.editBtn) {
        this.addAndRemoveActive(fridayItemEl);
      }
    });
  }
}
