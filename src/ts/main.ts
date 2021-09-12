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

function main() {
  const dayList: string[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  dayList.forEach(day => setTodoCount(day));
}

main();
