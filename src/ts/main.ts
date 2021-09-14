function setTodoCount(day: string): void {
  const itemLength: number = document.querySelectorAll(`.${day}-container .weekly-items .weekly-item`).length;

  const todoCountEl: Element | null = document.querySelector(
    `.${day}-container .weekly-container-header .weekly-todo-count`,
  );

  if (todoCountEl) {
    todoCountEl.textContent = String(itemLength);
  }
}

function initializeClassListActive(Els: []): void {
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

  weeklyEl.addEventListener('click', event => {
    if (event.target === monPlusIcon) {
      plusEl.classList.add('active');
      mondayItemEl.classList.add('active');
    } else if (event.target === tuePlusIcon) {
      plusEl.classList.add('active');
      tuesdayItemEl.classList.add('active');
    } else if (event.target === wedPlusIcon) {
      plusEl.classList.add('active');
      wednesdayItemEl.classList.add('active');
    } else if (event.target === thuPlusIcon) {
      plusEl.classList.add('active');
      thursdayItemEl.classList.add('active');
    } else if (event.target === friPlusIcon) {
      plusEl.classList.add('active');
      fridayItemEl.classList.add('active');
    }
  });
}

function onClickCancelBtn(plusEl: Element): void {
  const cancelBtnEl: Element | null = document.querySelector('.btn__cancel');
  const plusDayItems: Element[] = document.querySelectorAll('.plus-day-item');
  cancelBtnEl?.addEventListener('click', () => {
    plusEl.classList.remove('active');
    initializeClassListActive(plusDayItems);
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

function makeTamplete(userTitleInput, userTimeInput, userDayInput, userImportantInput) {
  const weeklyItemEl = document.createElement('div');
  weeklyItemEl.setAttribute('class', 'weekly-item');
  weeklyItemEl.innerHTML = `
    <h3>${userTitleInput}</h3>
    <div class="weekly-item-box">
      <p class="weekly-item-time">${userTimeInput}</p>
      <div>
        ${'<div class="material-icons item-star">star_rate</div>'.repeat(userImportantInput)}
      </div>
    </div>
    <div class="weekly-icons">
      <div class="material-icons weekly-icon">drive_file_rename_outline</div>
      <div class="material-icons weekly-icon">check_circle_outline</div>
      <div class="material-icons weekly-icon">delete_outline</div>
    </div>
  `;
  const weeklyContainerEls: Elemnet[] = document.querySelectorAll('.weekly-container');
  weeklyContainerEls.forEach(weeklyContainerEl => {
    if (weeklyContainerEl.dataset.weekly === userDayInput) {
      weeklyContainerEl.lastChild.previousSibling.appendChild(weeklyItemEl);
    }
  });
  const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  dayList.forEach(day => setTodoCount(day));
}

function targetCheck(
  target: Element,
  El: Element,
  plusEl: Element,
  plusDayEls: Element[],
  titleInputEl: Element,
  timeInputEl: Element,
  dayItemEl: Element,
  importantItemEl: Element,
): void {
  if (target === El) {
    let userTitleInput: string = titleInputEl.value;
    let userTimeInput: string = timeInputEl.value;
    const userDayInput: string | null = dayItemEl?.textContent;
    const userImportantInput: string = importantItemEl.dataset.important;
    if (userTitleInput === '') {
      alert('Enter the title');
    } else if (userTimeInput === '') {
      alert('Enter the time');
    } else {
      makeTamplete(userTitleInput, userTimeInput, userDayInput, userImportantInput);
      plusEl.classList.remove('active');
      initializeClassListActive(plusDayEls);
      userTitleInput = '';
      userTimeInput = '';
    }
  }
}

function onClickCompletionEl(plusEl: Element): void {
  const plusDayEls = document.querySelectorAll('.plus-day-item');
  const completionEl: Element | null = document.querySelector('.btn__completion');
  const titleInputEl = <HTMLInputElement>document.querySelector('.plus-title-input');
  const timeInputEl = <HTMLInputElement>document.querySelector('#time-input');
  plusEl.addEventListener('click', event => {
    const dayItemEl: Element | null = document.querySelector('.plus-day-item.active');
    const importantItemEl: Element | null = document.querySelector('.important-item-star.active');
    targetCheck(event.target, completionEl, plusEl, plusDayEls, titleInputEl, timeInputEl, dayItemEl, importantItemEl);
  });
}

function main(): void {
  const weeklyEl: Element | null = document.querySelector('.weekly-section');
  const plusEl: Element | null = document.querySelector('.plus-section');

  if (weeklyEl && plusEl) {
    onClickPlusBtn(weeklyEl, plusEl);
  }

  if (plusEl) {
    onClickCancelBtn(plusEl);
    onClickDaysEls(plusEl);
    onClickImportantEls(plusEl);
    onClickCompletionEl(plusEl);
  }
}

main();
