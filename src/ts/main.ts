import setTodoCount from './set-todo-count';
import dragAndDrop from './drag-and-drop';
import getDayOfEdit from './get-day-of-edit';
import importPreviousRecord from './import-previous-record';
import onClickDarkAndLightModeIcon from './project-theme';
import onClickCheckIcon from './event/onClick-check-icon';
import onClickEditBtn from './event/onClick-edit-btn';
import { initializeClassListActive, initializeImportantStarEls } from './initialize/initialize';
import { makeWeeklyItem, makeWeeklyIteminnerHTML } from './template/makeTemplate';

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

function onClickCancelBtn(plusEl: Element): void {
  const cancelBtnEl: Element | null = document.querySelector('.btn__cancel');
  const plusDayItems: Element[] = document.querySelectorAll('.plus-day-item');
  const plusImportantStarEls: Element[] = document.querySelectorAll('.important-item-star');
  const titleInputEl = <HTMLInputElement>document.querySelector('.plus-title-input');
  const timeInputEl = <HTMLInputElement>document.querySelector('#time-input');
  cancelBtnEl?.addEventListener('click', () => {
    plusEl.classList.remove('active');
    initializeClassListActive(plusDayItems);
    initializeImportantStarEls(plusImportantStarEls);
    titleInputEl.value = '';
    timeInputEl.value = '';
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

function checkOnClick(Els: Element[], target: Element) {
  let bool = false;
  Els.forEach(El => {
    if (target === El) {
      bool = true;
    }
  });
  return bool;
}

function addClassListActive(targetEls: Element[], anotherEls: Element[]): void {
  const [checkBoolean, checkEls]: [boolean, Element[]] = hasClassListActive(anotherEls);
  targetEls.forEach(targetEl => {
    if (!checkBoolean) {
      targetEl.classList.add('active');
    } else {
      checkEls.forEach(checkEl => {
        checkEl.classList.remove('active');
      });
      targetEl.classList.add('active');
    }
  });
}

function onClickImportantEls(plusEl: Element): void {
  const importantEls1 = document.querySelectorAll('.plus-important-1');
  const importantEls2 = document.querySelectorAll('.plus-important-2');
  const importantEls3 = document.querySelectorAll('.plus-important-3');
  plusEl.addEventListener('click', event => {
    if (checkOnClick(importantEls1, event.target)) {
      addClassListActive(importantEls1, [...importantEls2, ...importantEls3]);
    } else if (checkOnClick(importantEls2, event.target)) {
      addClassListActive(importantEls2, [...importantEls1, ...importantEls3]);
    } else if (checkOnClick(importantEls3, event.target)) {
      addClassListActive(importantEls3, [...importantEls1, ...importantEls2]);
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

function compareDeleteIdAndItemId(deleteEl: Element, itemEl: Element) {
  if (deleteEl.dataset.deleteid === itemEl.dataset.itemid) {
    itemEl.remove();

    let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));

    todoList = todoList?.filter(todo => String(todo.randomId) !== itemEl.dataset.itemid);
    localStorage.setItem('todo-list', JSON.stringify(todoList));

    const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
    dayList.forEach(day => setTodoCount(day));
  }
}

function compareTargetAndDeleteEl(deleteEl: Element) {
  const itemEls = document.querySelectorAll('.weekly-item');
  itemEls.forEach(itemEl => {
    compareDeleteIdAndItemId(deleteEl, itemEl);
  });
}

function onClickDeleteBtn(weeklyEl: Element) {
  weeklyEl.addEventListener('click', event => {
    const deleteEls: Element[] = document.querySelectorAll('.delete-icon');
    deleteEls.forEach(deleteEl => {
      if (event.target === deleteEl) {
        compareTargetAndDeleteEl(deleteEl);
        dragAndDrop();
      }
    });
  });
}

function getEditEls() {
  const itemEls = document.querySelectorAll('.weekly-item');
  const titleEls = document.querySelectorAll('.weekly-item-title');
  const timeEls = document.querySelectorAll('.weekly-item-time');
  const importantEls = document.querySelectorAll('.weekly-item-important');
  return [itemEls, titleEls, timeEls, importantEls];
}

function editPlusSection(targetDay: string, targetTitle: string, targetTime: string, targetImportantCount: string) {
  const plusEl: Element | null = document.querySelector('.plus-section');
  const plusTitleInput: Element | null = document.querySelector('.plus-title-input');
  const plusTimeInput: Element | null = document.querySelector('#time-input');
  const plusDayItemEls: Element[] = document.querySelectorAll('.plus-day-item');
  const plusImportantStarEls: Element[] = document.querySelectorAll('.important-item-star');
  plusEl?.classList.add('active');
  if (plusTitleInput) {
    plusTitleInput.value = targetTitle;
  }

  if (plusTimeInput) {
    plusTimeInput.value = targetTime;
  }

  plusDayItemEls.forEach(plusDayItemEl => {
    if (plusDayItemEl.textContent === targetDay) {
      plusDayItemEl.classList.add('active');
    } else {
      plusDayItemEl.classList.remove('active');
    }
  });

  plusImportantStarEls.forEach(plusImportantStarEl => {
    if (plusImportantStarEl.dataset.important === targetImportantCount) {
      plusImportantStarEl.classList.add('active');
    } else {
      plusImportantStarEl.classList.remove('active');
    }
  });
}

function compareTargetAndEditEl(editEl: Element) {
  let targetDay = '';
  let targetTitle = '';
  let targetTime = '';
  let targetImportantCount = 0;
  const [itemEls, titleEls, timeEls, importantEls] = getEditEls();

  itemEls.forEach(itemEl => {
    if (editEl.dataset.editid === itemEl.dataset.itemid) {
      targetDay = getDayOfEdit(itemEl);
      const storageId = editEl.dataset.editid;
      localStorage.setItem('currentId', storageId);
      localStorage.setItem('currentDay', targetDay);
    }
  });

  titleEls.forEach(titleEl => {
    if (editEl.dataset.editid === titleEl.dataset.titleid) {
      if (titleEl.textContent) {
        targetTitle = titleEl.textContent;
      }
    }
  });

  timeEls.forEach(timeEl => {
    if (editEl.dataset.editid === timeEl.dataset.timeid) {
      if (timeEl.textContent) {
        targetTime = timeEl.textContent;
      }
    }
  });

  importantEls.forEach(importantEl => {
    if (editEl.dataset.editid === importantEl.dataset.importantid) {
      targetImportantCount++;
    }
  });

  editPlusSection(targetDay, targetTitle, targetTime, String(targetImportantCount));
}

function onClickEditIcon(weeklyEl: Element) {
  weeklyEl.addEventListener('click', event => {
    const editEls: Element[] = document.querySelectorAll('.edit-icon');
    const completionBtn: Element = document.querySelector('.btn__completion');
    const editBtn: Element = document.querySelector('.btn__edit');
    editEls.forEach(editEl => {
      if (event.target === editEl) {
        compareTargetAndEditEl(editEl);
        completionBtn.classList.remove('active');
        editBtn.classList.add('active');
      }
    });
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
