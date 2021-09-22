import getDayOfEdit from '../get-day-of-edit';

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

export default function onClickEditIcon(weeklyEl: Element) {
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
