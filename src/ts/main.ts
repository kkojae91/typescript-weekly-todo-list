import importPreviousRecord from './import-previous-record';
import onClickDarkAndLightModeIcon from './project-theme';
import onClickCheckIcon from './event/onClick-check-icon';
import onClickEditBtn from './event/onClick-edit-btn';
import onClickCancelBtn from './event/onClick-cancel-btn';
import onClickDeleteBtn from './event/onClick-delete-btn';
import onClickEditIcon from './event/onClick-edit-icon';
import onClickImportantEls from './event/onClick-important-els';
import onClickDaysEls from './event/onClick-days-els';
import onClickPlusBtn from './event/onClick-plus-btn';
import onClickCompletionEl from './event/onClick-completion-el';

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

  importPreviousRecord();
}

main();
