import ImportPreviousRecord from './import-previous-record';
import OnClickDarkAndLightModeIcon from './project-theme';
import {
  OnClickCancelBtn,
  OnClickCheckIcon,
  OnClickCompletionEl,
  OnClickDaysEls,
  onClickDeleteBtn,
  onClickEditBtn,
  onClickEditIcon,
  OnClickImportantEls,
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
    new OnClickCheckIcon(weeklyEl).main();
  }

  if (plusEl) {
    new OnClickCancelBtn(plusEl).main();
    new OnClickDaysEls(plusEl).main();
    // onClickDaysEls(plusEl);
    new OnClickImportantEls(plusEl).main();
    new OnClickCompletionEl(plusEl).main();
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
