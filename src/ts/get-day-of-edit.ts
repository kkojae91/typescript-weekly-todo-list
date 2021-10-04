import { IGetDayOfEdit } from './types/types';

export default class GetDayOfEdit implements IGetDayOfEdit {
  constructor(private _targetEl: HTMLDivElement) {}

  public getDay(): string {
    const targetDay: string | null | undefined =
      this._targetEl.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;
    return targetDay ? targetDay : '';
  }
}
