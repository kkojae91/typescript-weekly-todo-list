export default function getDayOfEdit(targetEl: HTMLDivElement): string | void {
  const targetDay: string | null | undefined =
    targetEl.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;
  if (targetDay) {
    return targetDay;
  }
}
