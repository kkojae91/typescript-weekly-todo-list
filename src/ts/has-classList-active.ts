import { IHasClassListActive } from './types/types';

export default class HasClassListActive implements IHasClassListActive {
  private _bool: boolean = false;
  private _trueEls: HTMLDivElement[] = [];

  constructor(private _Els: HTMLDivElement[]) {}

  public checkClassList(): [boolean, HTMLDivElement[]] {
    this._Els.forEach(El => {
      if (El.classList.contains('active')) {
        this._bool = true;
        this._trueEls.push(El);
      }
    });
    return [this._bool, this._trueEls];
  }
}
