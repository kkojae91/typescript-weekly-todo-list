import HasClassListActive from '../has-classList-active';
import { IOnClickMain } from '../types/types';

export default class OnClickDaysEls implements IOnClickMain {
  dayItems: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-day-item');
  constructor(private plusEl: HTMLTableSectionElement) {}

  checkEls(defaultEl: HTMLDivElement, anotherEls: HTMLDivElement[]): void {
    const [checkBoolean, checkEls]: [boolean, HTMLDivElement[]] = new HasClassListActive(anotherEls).checkClassList();
    if (!checkBoolean) {
      defaultEl.classList.add('active');
    } else {
      checkEls[0].classList.remove('active');
      defaultEl.classList.add('active');
    }
  }

  main(): void {
    const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl] = this.dayItems;
    this.plusEl.addEventListener('click', event => {
      if (event.target === mondayItemEl) {
        this.checkEls(mondayItemEl, [tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]);
      } else if (event.target === tuesdayItemEl) {
        this.checkEls(tuesdayItemEl, [mondayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]);
      } else if (event.target === wednesdayItemEl) {
        this.checkEls(wednesdayItemEl, [mondayItemEl, tuesdayItemEl, thursdayItemEl, fridayItemEl]);
      } else if (event.target === thursdayItemEl) {
        this.checkEls(thursdayItemEl, [mondayItemEl, tuesdayItemEl, wednesdayItemEl, fridayItemEl]);
      } else if (event.target === fridayItemEl) {
        this.checkEls(fridayItemEl, [mondayItemEl, tuesdayItemEl, thursdayItemEl, wednesdayItemEl]);
      }
    });
  }
}
