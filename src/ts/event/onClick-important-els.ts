import HasClassListActive from '../has-classList-active';
import { IOnClickMain } from '../types/types';

export default class OnClickImportantEls implements IOnClickMain {
  private importantEls1: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-1');
  private importantEls2: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-2');
  private importantEls3: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-3');
  constructor(private plusEl: HTMLTableSectionElement) {}

  private checkOnClick(Els: NodeListOf<HTMLDivElement>, target: EventTarget): boolean {
    let bool = false;
    Els.forEach(El => {
      if (target === El) {
        bool = true;
      }
    });
    return bool;
  }

  private addClassListActive(targetEls: NodeListOf<HTMLDivElement>, anotherEls: HTMLDivElement[]): void {
    const [checkBoolean, checkEls]: [boolean, Element[]] = new HasClassListActive(anotherEls).checkClassList();
    targetEls.forEach(targetEl => {
      if (!checkBoolean) {
        targetEl.classList.add('active');
      } else {
        checkEls.forEach(checkEl => {
          checkEl.classList.remove('active');
        });
        targetEl.classList.add('active');
      }
    });
  }

  public main(): void {
    this.plusEl.addEventListener('click', event => {
      if (event.target && this.checkOnClick(this.importantEls1, event.target)) {
        this.addClassListActive(this.importantEls1, [...this.importantEls2, ...this.importantEls3]);
      } else if (event.target && this.checkOnClick(this.importantEls2, event.target)) {
        this.addClassListActive(this.importantEls2, [...this.importantEls1, ...this.importantEls3]);
      } else if (event.target && this.checkOnClick(this.importantEls3, event.target)) {
        this.addClassListActive(this.importantEls3, [...this.importantEls1, ...this.importantEls2]);
      }
    });
  }
}
