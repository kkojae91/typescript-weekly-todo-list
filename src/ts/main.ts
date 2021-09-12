// todo-count
function setTodoCount(day: string): void {
  const itemLength: number = document.querySelectorAll(
    `.${day}-container .weekly-items .weekly-item`,
  ).length;

  const todoCountEl: Element | null = document.querySelector(
    `.${day}-container .weekly-container-header .weekly-todo-count`,
  );

  if (todoCountEl) {
    todoCountEl.textContent = String(itemLength);
  }
}

function makeAddModal(weeklyEl: Element) {
  // const [monIcon, tueIcon, wedIcon, thuIcon, friIcon]: Element[] =
  //   document.querySelectorAll('.add-icon');
  // weeklyEl.addEventListener('click', event => {
  //   if (event.target === monIcon) {
  //     console.log('mon');
  //   } else if (event.target === tueIcon) {
  //     console.log('tue');
  //   } else if (event.target === wedIcon) {
  //     console.log('wed');
  //   } else if (event.target === thuIcon) {
  //     console.log('thu');
  //   } else if (event.target === friIcon) {
  //     console.log('fri');
  //   }
  // });
}

function onClickCancelBtn(plusEl: Element): void {
  const cancelBtnEl: Element | null = document.querySelector('.btn__cancel');
  cancelBtnEl?.addEventListener('click', () => {
    plusEl.classList.remove('active');
  });
}

function main(): void {
  const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  dayList.forEach(day => setTodoCount(day));
  const weeklyEl: Element | null = document.querySelector('.weekly-section');
  // if (weeklyEl) {
  //   makeAddModal(weeklyEl);
  // }

  const plusEl: Element | null = document.querySelector('.plus-section');
  if (plusEl) {
    onClickCancelBtn(plusEl);
  }
}

main();
