// previous-record 관련 type, make template 관련 type
export interface ITodoList {
  randomId: number;
  day: string;
  template: string;
  isActive: boolean;
}

export interface IImportPreviousRecord {
  setPreviousRecordArray(): void;
  setPreviousRecord(): void;
}

// make template 관련 type
export interface IMakeWeeklyIteminnerHTML {
  makeInnerHTML(): string;
}

export interface IMakeWeeklyItem {
  makeWeeklyItem(): void;
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

// initialize 관련 type
export interface IInitialize {
  initializeClassListActive(Els: NodeListOf<HTMLDivElement>): void;
  initializeImportantStarEls(plusImportantStarEls: NodeListOf<HTMLDivElement>): void;
}

// onClick-plus-btn, onCLick-important-els 관련 type
export interface IOnClickMain {
  main(): void;
}
