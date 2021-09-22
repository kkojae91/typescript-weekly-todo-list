export default function setTodoCount(day: string): void {
  day = day.toLowerCase().slice(0, 3);
  const itemLength: number = document.querySelectorAll(`.${day}-container .weekly-items .weekly-item`).length;

  const doneItemLength: number = document.querySelectorAll(
    `.${day}-container .weekly-items .weekly-item.active`,
  ).length;

  const todoCountEl: Element | null = document.querySelector(
    `.${day}-container .weekly-container-header .weekly-todo-count`,
  );

  if (todoCountEl) {
    todoCountEl.textContent = String(itemLength - doneItemLength);
  }
}
