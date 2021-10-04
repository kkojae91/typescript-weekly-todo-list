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
