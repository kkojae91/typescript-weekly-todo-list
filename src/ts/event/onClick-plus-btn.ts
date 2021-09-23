function addAndRemoveAtive(plusEl: Element, itemEl: Element, completionBtn: Element, editBtn: Element): void {
  plusEl.classList.add('active');
  itemEl.classList.add('active');
  completionBtn?.classList.add('active');
  editBtn?.classList.remove('active');
}

export default function onClickPlusBtn(weeklyEl: Element, plusEl: Element): void {
  const [monPlusIcon, tuePlusIcon, wedPlusIcon, thuPlusIcon, friPlusIcon]: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.add-icon');

  const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.plus-day-item');

  const completionBtn: HTMLDivElement | null = document.querySelector('.btn__completion');
  const editBtn: HTMLDivElement | null = document.querySelector('.btn__edit');

  weeklyEl.addEventListener('click', event => {
    if (event.target === monPlusIcon && completionBtn && editBtn) {
      addAndRemoveAtive(plusEl, mondayItemEl, completionBtn, editBtn);
    } else if (event.target === tuePlusIcon && completionBtn && editBtn) {
      addAndRemoveAtive(plusEl, tuesdayItemEl, completionBtn, editBtn);
    } else if (event.target === wedPlusIcon && completionBtn && editBtn) {
      addAndRemoveAtive(plusEl, wednesdayItemEl, completionBtn, editBtn);
    } else if (event.target === thuPlusIcon && completionBtn && editBtn) {
      addAndRemoveAtive(plusEl, thursdayItemEl, completionBtn, editBtn);
    } else if (event.target === friPlusIcon && completionBtn && editBtn) {
      addAndRemoveAtive(plusEl, fridayItemEl, completionBtn, editBtn);
    }
  });
}
