import ImportPreviousRecord from './import-previous-record';
import OnClickDarkAndLightModeIcon from './project-theme';
import {
  onClickCancelBtn,
  onClickCheckIcon,
  onClickCompletionEl,
  onClickDaysEls,
  onClickDeleteBtn,
  onClickEditBtn,
  onClickEditIcon,
  onClickImportantEls,
  OnClickPlusBtn,
} from './event/index';

function main(): void {
  const weeklyEl: HTMLTableSectionElement | null = document.querySelector('.weekly-section');
  const plusEl: HTMLTableSectionElement | null = document.querySelector('.plus-section');
  const toggleEl: HTMLDivElement | null = document.querySelector('.toggle-section');

  if (weeklyEl && plusEl) {
    new OnClickPlusBtn(weeklyEl, plusEl).main();
  }

  if (weeklyEl) {
    onClickDeleteBtn(weeklyEl);
    onClickEditIcon(weeklyEl);
    onClickCheckIcon(weeklyEl);
  }

  if (plusEl) {
    onClickCancelBtn(plusEl);
    onClickDaysEls(plusEl);
    onClickImportantEls(plusEl);
    onClickCompletionEl(plusEl);
    onClickEditBtn(plusEl);
  }

  if (toggleEl) {
    const projectTheme = new OnClickDarkAndLightModeIcon(toggleEl);
    projectTheme.previousProjectThemeCheck();
    projectTheme.onClickToggle();
  }

  const importPreviousRecord = new ImportPreviousRecord();
  importPreviousRecord.setPreviousRecordArray();
  importPreviousRecord.setPreviousRecord();
}

main();
