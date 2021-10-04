// previous-record 관련 type
export interface IpreviousRecord {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export interface IImportPreviousRecord {
  setPreviousRecordArray(): void;
  setPreviousRecord(): void;
}

// todo count 관련 type
export interface ISetTodoCount {
  countTodoList(): void;
}

// project theme 관련 type
export interface IOnClickDarkAndLightModeIcon {
  previousProjectThemeCheck(): void;
  onClickToggle(): void;
}

// class list active check 관련 type
export interface IHasClassListActive {
  checkClassList(): [boolean, HTMLDivElement[]];
}

// get day of edit 관련 type
export interface IGetDayOfEdit {
  getDay(): string;
}
