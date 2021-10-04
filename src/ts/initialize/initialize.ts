import { IInitialize } from '../types/types';

export default class Initialize implements IInitialize {
  constructor() {}

  public initializeClassListActive(Els: NodeListOf<HTMLDivElement>): void {
    Els.forEach(El => {
      if (El.classList.contains('active')) {
        El.classList.remove('active');
      }
    });
  }

  public initializeImportantStarEls(plusImportantStarEls: NodeListOf<HTMLDivElement>): void {
    plusImportantStarEls.forEach(plusImportantStarEl => {
      if (plusImportantStarEl.dataset.important === '1') {
        plusImportantStarEl.classList.add('active');
      } else {
        plusImportantStarEl.classList.remove('active');
      }
    });
  }
}
