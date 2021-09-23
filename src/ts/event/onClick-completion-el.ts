import dragAndDrop from '../drag-and-drop';
import { makeWeeklyItem } from '../template/makeTemplate';
import { initializeClassListActive, initializeImportantStarEls } from '../initialize/initialize';

function targetCheck(
  plusEl: HTMLTableSectionElement,
  plusDayEls: NodeListOf<HTMLHeadingElement>,
  titleInputEl: HTMLInputElement,
  timeInputEl: HTMLInputElement,
  dayItemEl: HTMLHeadingElement,
  importantItemEl: HTMLDivElement,
  plusImportantStarEls: NodeListOf<HTMLDivElement>,
): void {
  const userTitleInput: string = titleInputEl.value;
  const userTimeInput: string = timeInputEl.value;
  const userDayInput: string | null = dayItemEl?.textContent;
  const userImportantInput: string | undefined = importantItemEl.dataset.important;
  if (userTitleInput === '') {
    alert('Enter the title');
  } else if (userTimeInput === '') {
    alert('Enter the time');
  } else {
    if (userDayInput && userImportantInput) {
      makeWeeklyItem(userTitleInput, userTimeInput, userDayInput, userImportantInput);
    }
    plusEl.classList.remove('active');
    initializeClassListActive(plusDayEls);
    initializeImportantStarEls(plusImportantStarEls);
    titleInputEl.value = '';
    timeInputEl.value = '';
  }
}

export default function onClickCompletionEl(plusEl: HTMLTableSectionElement): void {
  const plusDayEls: NodeListOf<HTMLHeadingElement> = document.querySelectorAll<HTMLHeadingElement>('.plus-day-item');
  const completionEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.btn__completion');
  const titleInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.plus-title-input');
  const timeInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#time-input');
  const plusImportantStarEls: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.important-item-star');
  plusEl.addEventListener('click', event => {
    const dayItemEl = document.querySelector<HTMLHeadingElement>('.plus-day-item.active');
    const importantItemEl = document.querySelector<HTMLDivElement>('.important-item-star.active');
    if (event.target === completionEl && titleInputEl && timeInputEl && dayItemEl && importantItemEl) {
      targetCheck(plusEl, plusDayEls, titleInputEl, timeInputEl, dayItemEl, importantItemEl, plusImportantStarEls);
      dragAndDrop();
    }
  });
}
