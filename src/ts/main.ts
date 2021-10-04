import ImportPreviousRecord from './import-previous-record';
import onClickDarkAndLightModeIcon from './project-theme';
import {
  onClickCancelBtn,
  onClickCheckIcon,
  onClickCompletionEl,
  onClickDaysEls,
  onClickDeleteBtn,
  onClickEditBtn,
  onClickEditIcon,
  onClickImportantEls,
  onClickPlusBtn,
} from './event/index';

function main(): void {
  const weeklyEl: Element | null = document.querySelector('.weekly-section');
  const plusEl: Element | null = document.querySelector('.plus-section');
  const toggleEl: Element | null = document.querySelector('.toggle-section');

  if (weeklyEl && plusEl) {
    onClickPlusBtn(weeklyEl, plusEl);
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
    onClickDarkAndLightModeIcon(toggleEl);
  }

  const importPreviousRecord = new ImportPreviousRecord();
  importPreviousRecord.setPreviousRecordArray();
  importPreviousRecord.setPreviousRecord();
}

main();
