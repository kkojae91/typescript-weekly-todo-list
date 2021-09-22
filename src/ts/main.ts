import setTodoCount from './set-todo-count';
import dragAndDrop from './drag-and-drop';
import getDayOfEdit from './get-day-of-edit';
import importPreviousRecord from './import-previous-record';
import onClickDarkAndLightModeIcon from './project-theme';
import onClickCheckIcon from './event/onClick-check-icon';

function initializeClassListActive(Els: Element[]): void {
  Els.forEach(El => {
    if (El.classList.contains('active')) {
      El.classList.remove('active');
    }
  });
}

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

function initializeImportantStarEls(plusImportantStarEls: Element[]) {
  plusImportantStarEls.forEach(plusImportantStarEl => {
    if (plusImportantStarEl.dataset.important === '1') {
      plusImportantStarEl.classList.add('active');
    } else {
      plusImportantStarEl.classList.remove('active');
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

function makeTemplate(
  userTitleInput: string,
  userTimeInput: string,
  userDayInput: string,
  userImportantInput: string,
  currentId: number = 0,
) {
  let randomId = 0;
  currentId === 0 ? (randomId = Math.floor(Math.random() * 1000000000)) : (randomId = currentId);
  const weeklyItemEl: Element = document.createElement('div');
  weeklyItemEl.setAttribute('class', 'weekly-item');
  weeklyItemEl.setAttribute('data-itemid', String(randomId));
  weeklyItemEl.setAttribute('draggable', 'true');
  const importantDiv = `<div class="material-icons item-star weekly-item-important" data-importantid=${randomId}>star_rate</div>`;
  const template = `
  <h3 class="weekly-item-title" data-titleid=${randomId}>${userTitleInput}</h3>
  <div class="weekly-item-box">
    <p class="weekly-item-time" data-timeid=${randomId}>${userTimeInput}</p>
    <div class="weekly-item-stars" data-starsid=${randomId}>
      ${importantDiv.repeat(userImportantInput)}
    </div>
  </div>
  <div class="weekly-icons">
    <div class="material-icons weekly-icon edit-icon" data-editid=${randomId}>drive_file_rename_outline</div>
    <div class="material-icons weekly-icon check-icon" data-checkid=${randomId}>check_circle_outline</div>
    <div class="material-icons weekly-icon delete-icon" data-deleteid=${randomId}>delete_outline</div>
  </div>
`;
  weeklyItemEl.innerHTML = template;
  const weeklyContainerEls: Elemnet[] = document.querySelectorAll('.weekly-container');
  weeklyContainerEls.forEach(weeklyContainerEl => {
    if (weeklyContainerEl.dataset.weekly === userDayInput) {
      weeklyContainerEl.lastChild.previousSibling.appendChild(weeklyItemEl);
    }
  });
  const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  dayList.forEach(day => setTodoCount(day));
  const newTodoList = {
    randomId,
    day: userDayInput,
    template,
    isActive: false,
  };

  let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));
  todoList ? todoList.push(newTodoList) : (todoList = [newTodoList]);
  localStorage.setItem('todo-list', JSON.stringify(todoList));
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
    makeTemplate(userTitleInput, userTimeInput, userDayInput, userImportantInput);
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

function onClickEditBtn(plusEl: Element): void {
  const editBtn: Element | null = document.querySelector('.btn__edit');
  const completionBtn: Element = document.querySelector('.btn__completion');
  plusEl.addEventListener('click', event => {
    if (event.target === editBtn) {
      const currentId: string | null = localStorage.getItem('currentId');
      const currentDay: string | null = localStorage.getItem('currentDay');

      const currentPlusTitleInput: string = document.querySelector('.plus-title-input')?.value;
      const currentPlusTimeInput: string = document.querySelector('#time-input')?.value;
      const currentPlusDayItemText: string | null | undefined =
        document.querySelector('.plus-day-item.active')?.textContent;
      const currentPlusImportantStarCount: string =
        document.querySelector('.important-item-star.active')?.dataset.important;
      const editWeeklyItemEl: Element = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);

      if (currentDay === currentPlusDayItemText) {
        const importantDiv = `<div class="material-icons item-star weekly-item-important" data-importantid=${currentId}>star_rate</div>`;
        const template = `
        <h3 class="weekly-item-title" data-titleid=${currentId}>${currentPlusTitleInput}</h3>
        <div class="weekly-item-box">
          <p class="weekly-item-time" data-timeid=${currentId}>${currentPlusTimeInput}</p>
          <div class="weekly-item-stars" data-starsid=${currentId}>
            ${importantDiv.repeat(Number(currentPlusImportantStarCount))}
          </div>
        </div>
        <div class="weekly-icons">
          <div class="material-icons weekly-icon edit-icon" data-editid=${currentId}>drive_file_rename_outline</div>
          <div class="material-icons weekly-icon check-icon" data-checkid=${currentId}>check_circle_outline</div>
          <div class="material-icons weekly-icon delete-icon" data-deleteid=${currentId}>delete_outline</div>
        </div>
      `;
        editWeeklyItemEl.innerHTML = template;

        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));
        todoList?.forEach(todo => {
          if (String(todo.randomId) === currentId) {
            todo.template = template;
          }
        });
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      } else {
        const weeklyItemEl: Element = document.querySelector(`.weekly-item[data-itemid="${currentId}"]`);
        makeTemplate(
          currentPlusTitleInput,
          currentPlusTimeInput,
          currentPlusDayItemText,
          currentPlusImportantStarCount,
        );
        weeklyItemEl.remove();

        let todoList: [] | null = JSON.parse(localStorage.getItem('todo-list'));

        todoList = todoList?.filter(todo => String(todo.randomId) !== currentId);
        localStorage.setItem('todo-list', JSON.stringify(todoList));
      }

      completionBtn.classList.remove('active');
      editBtn.classList.add('active');
      plusEl.classList.remove('active');
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
