function addAndRemoveAtive(plusEl: Element, itemEl: Element, completionBtn: Element, editBtn: Element): void {
  plusEl.classList.add('active');
  itemEl.classList.add('active');
  completionBtn?.classList.add('active');
  editBtn?.classList.remove('active');
}

export default function onClickPlusBtn(weeklyEl: Element, plusEl: Element): void {
  const [monPlusIcon, tuePlusIcon, wedPlusIcon, thuPlusIcon, friPlusIcon]: Element[] =
    document.querySelectorAll('.add-icon');

  const [mondayItemEl, tuesdayItemEl, wednesdayItemEl, thursdayItemEl, fridayItemEl]: Element[] =
    document.querySelectorAll('.plus-day-item');

  const completionBtn: Element = document.querySelector('.btn__completion');
  const editBtn: Element = document.querySelector('.btn__edit');

  weeklyEl.addEventListener('click', event => {
    if (event.target === monPlusIcon) {
      addAndRemoveAtive(plusEl, mondayItemEl, completionBtn, editBtn);
    } else if (event.target === tuePlusIcon) {
      addAndRemoveAtive(plusEl, tuesdayItemEl, completionBtn, editBtn);
    } else if (event.target === wedPlusIcon) {
      addAndRemoveAtive(plusEl, wednesdayItemEl, completionBtn, editBtn);
    } else if (event.target === thuPlusIcon) {
      addAndRemoveAtive(plusEl, thursdayItemEl, completionBtn, editBtn);
    } else if (event.target === friPlusIcon) {
      addAndRemoveAtive(plusEl, fridayItemEl, completionBtn, editBtn);
    }
  });
}
