import setTodoCount from '../set-todo-count';

export function makeWeeklyIteminnerHTML(id: string, title: string, time: string, count: string): string {
  const importantDiv = `<div class="material-icons item-star weekly-item-important" data-importantid=${id}>star_rate</div>`;
  const template = `
  <h3 class="weekly-item-title" data-titleid=${id}>${title}</h3>
  <div class="weekly-item-box">
    <p class="weekly-item-time" data-timeid=${id}>${time}</p>
    <div class="weekly-item-stars" data-starsid=${id}>
      ${importantDiv.repeat(Number(count))}
    </div>
  </div>
  <div class="weekly-icons">
    <div class="material-icons weekly-icon edit-icon" data-editid=${id}>drive_file_rename_outline</div>
    <div class="material-icons weekly-icon check-icon" data-checkid=${id}>check_circle_outline</div>
    <div class="material-icons weekly-icon delete-icon" data-deleteid=${id}>delete_outline</div>
  </div>
`;
  return template;
}

export function makeWeeklyItem(
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

  const template: string = makeWeeklyIteminnerHTML(String(randomId), userTitleInput, userTimeInput, userImportantInput);
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