import dragAndDrop from './drag-and-drop';
import importPreviousRecord from './import-previous-record';
import onClickDarkAndLightModeIcon from './project-theme';
import onClickCheckIcon from './event/onClick-check-icon';
import onClickEditBtn from './event/onClick-edit-btn';
import { initializeClassListActive, initializeImportantStarEls } from './initialize/initialize';
import { makeWeeklyItem } from './template/makeTemplate';
import onClickCancelBtn from './event/onClick-cancel-btn';
import onClickDeleteBtn from './event/onClick-delete-btn';
import onClickEditIcon from './event/onClick-edit-icon';
import onClickImportantEls from './event/onClick-important-els';

function onClickPlusBtn(weeklyEl: Element, plusEl: Element): void {
  const [monPlusIcon, tuePlusIcon, wedPlusIcon, thuPlusIcon, friPlusIcon]: Element[] =
    document.querySelectorAll('.add-icon');

  const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]: Element[] =
    document.querySelectorAll('.plus-day-item');

  const completionBtn: Element = document.querySelector('.btn__completion');
  const editBtn: Element = document.querySelector('.btn__edit');

  weeklyEl.addEventListener('click', event => {
    if (event.target === monPlusIcon) {
      plusEl.classList.add('active');
      mondayItemEl.classList.add('active');
      completionBtn?.classList.add('active');
      editBtn?.classList.remove('active');
    } else if (event.target === tuePlusIcon) {
      plusEl.classList.add('active');
      tuesdayItemEl.classList.add('active');
      completionBtn?.classList.add('active');
      editBtn?.classList.remove('active');
    } else if (event.target === wedPlusIcon) {
      plusEl.classList.add('active');
      wednesdayItemEl.classList.add('active');
      completionBtn?.classList.add('active');
      editBtn?.classList.remove('active');
    } else if (event.target === thuPlusIcon) {
      plusEl.classList.add('active');
      thursdayItemEl.classList.add('active');
      completionBtn?.classList.add('active');
      editBtn?.classList.remove('active');
    } else if (event.target === friPlusIcon) {
      plusEl.classList.add('active');
      fridayItemEl.classList.add('active');
      completionBtn?.classList.add('active');
      editBtn?.classList.remove('active');
    }
  });
}

function hasClassListActive(Els: Element[]): [boolean, Element] {
  let bool = false;
  let trueEls: Element[] = [];
  Els.forEach(El => {
    if (El.classList.contains('active')) {
      bool = true;
      trueEls.push(El);
    }
  });
  return [bool, trueEls];
}

function checkEls(defaultEl: Element, anotherEls: Element[]): void {
  const [checkBoolean, checkEls]: [boolean, Element[]] = hasClassListActive(anotherEls);
  if (!checkBoolean) {
    defaultEl.classList.add('active');
  } else {
    checkEls[0].classList.remove('active');
    defaultEl.classList.add('active');
  }
}

function onClickDaysEls(plusEl: Element): void {
  const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]: Element[] =
    document.querySelectorAll('.plus-day-item');

  plusEl.addEventListener('click', event => {
    if (event.target === mondayItemEl) {
      checkEls(mondayItemEl, [tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]);
    } else if (event.target === tuesdayItemEl) {
      checkEls(tuesdayItemEl, [mondayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]);
    } else if (event.target === wednesdayItemEl) {
      checkEls(wednesdayItemEl, [mondayItemEl, tuesdayItemEl, thursdayItemEl, fridayItemEl]);
    } else if (event.target === thursdayItemEl) {
      checkEls(thursdayItemEl, [mondayItemEl, tuesdayItemEl, wednesdayItemEl, fridayItemEl]);
    } else if (event.target === fridayItemEl) {
      checkEls(fridayItemEl, [mondayItemEl, tuesdayItemEl, thursdayItemEl, wednesdayItemEl]);
    }
  });
}

function targetCheck(
  plusEl: Element,
  plusDayEls: Element[],
  titleInputEl: Element,
  timeInputEl: Element,
  dayItemEl: Element,
  importantItemEl: Element,
  plusImportantStarEls: Element[],
): void {
  const userTitleInput: string = titleInputEl.value;
  const userTimeInput: string = timeInputEl.value;
  const userDayInput: string | null = dayItemEl?.textContent;
  const userImportantInput: string = importantItemEl.dataset.important;
  if (userTitleInput === '') {
    alert('Enter the title');
  } else if (userTimeInput === '') {
    alert('Enter the time');
  } else {
    makeWeeklyItem(userTitleInput, userTimeInput, userDayInput, userImportantInput);
    plusEl.classList.remove('active');
    initializeClassListActive(plusDayEls);
    initializeImportantStarEls(plusImportantStarEls);
    titleInputEl.value = '';
    timeInputEl.value = '';
  }
}

function onClickCompletionEl(plusEl: Element): void {
  const plusDayEls = document.querySelectorAll('.plus-day-item');
  const completionEl: Element | null = document.querySelector('.btn__completion');
  const titleInputEl = <HTMLInputElement>document.querySelector('.plus-title-input');
  const timeInputEl = <HTMLInputElement>document.querySelector('#time-input');
  const plusImportantStarEls: Element[] = document.querySelectorAll('.important-item-star');
  plusEl.addEventListener('click', event => {
    const dayItemEl: Element | null = document.querySelector('.plus-day-item.active');
    const importantItemEl: Element | null = document.querySelector('.important-item-star.active');
    if (event.target === completionEl) {
      targetCheck(plusEl, plusDayEls, titleInputEl, timeInputEl, dayItemEl, importantItemEl, plusImportantStarEls);
      dragAndDrop();
    }
  });
}

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
