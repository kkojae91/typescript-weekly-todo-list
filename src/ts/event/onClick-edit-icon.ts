import getDayOfEdit from '../get-day-of-edit';

function getEditEls(): [
  NodeListOf<HTMLDivElement>,
  NodeListOf<HTMLHeadingElement>,
  NodeListOf<HTMLParagraphElement>,
  NodeListOf<HTMLDivElement>,
] {
  const itemEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-item');
  const titleEls: NodeListOf<HTMLHeadingElement> = document.querySelectorAll<HTMLHeadingElement>('.weekly-item-title');
  const timeEls: NodeListOf<HTMLParagraphElement> =
    document.querySelectorAll<HTMLParagraphElement>('.weekly-item-time');
  const importantEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.weekly-item-important');
  return [itemEls, titleEls, timeEls, importantEls];
}

function editPlusSection(targetDay: string, targetTitle: string, targetTime: string, targetImportantCount: string) {
  const plusEl: HTMLTableSectionElement | null = document.querySelector('.plus-section');
  const plusTitleInput: HTMLInputElement | null = document.querySelector('.plus-title-input');
  const plusTimeInput: HTMLInputElement | null = document.querySelector('#time-input');
  const plusDayItemEls: NodeListOf<HTMLHeadingElement> =
    document.querySelectorAll<HTMLHeadingElement>('.plus-day-item');
  const plusImportantStarEls: NodeListOf<HTMLDivElement> =
    document.querySelectorAll<HTMLDivElement>('.important-item-star');
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

function compareTargetAndEditEl(editEl: HTMLDivElement) {
  let targetDay = '';
  let targetTitle = '';
  let targetTime = '';
  let targetImportantCount = 0;
  const [itemEls, titleEls, timeEls, importantEls] = getEditEls();

  itemEls.forEach(itemEl => {
    if (editEl.dataset.editid === itemEl.dataset.itemid) {
      const getDay = getDayOfEdit(itemEl);
      if (getDay) {
        targetDay = getDay;
      }
      const storageId = editEl.dataset.editid;
      storageId && localStorage.setItem('currentId', storageId);
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

export default function onClickEditIcon(weeklyEl: Element) {
  weeklyEl.addEventListener('click', event => {
    const editEls: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.edit-icon');
    const completionBtn: HTMLDivElement | null = document.querySelector('.btn__completion');
    const editBtn: HTMLDivElement | null = document.querySelector('.btn__edit');
    editEls.forEach(editEl => {
      if (event.target === editEl && completionBtn && editBtn) {
        compareTargetAndEditEl(editEl);
        completionBtn.classList.remove('active');
        editBtn.classList.add('active');
      }
    });
  });
}
