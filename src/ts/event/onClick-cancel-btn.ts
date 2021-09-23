import { initializeClassListActive, initializeImportantStarEls } from '../initialize/initialize';

export default function onClickCancelBtn(plusEl: HTMLTableSectionElement): void {
  const cancelBtnEl: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.btn__cancel');
  const plusDayItems: NodeListOf<HTMLHeadingElement> = document.querySelectorAll<HTMLHeadingElement>('.plus-day-item');
  const plusImportantStarEls: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.important-item-star');
  const titleInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.plus-title-input');
  const timeInputEl: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#time-input');
  cancelBtnEl?.addEventListener('click', () => {
    plusEl.classList.remove('active');
    initializeClassListActive(plusDayItems);
    initializeImportantStarEls(plusImportantStarEls);
    if (titleInputEl && timeInputEl) {
      titleInputEl.value = '';
      timeInputEl.value = '';
    }
  });
}
