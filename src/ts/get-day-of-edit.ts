export default function getDayOfEdit(targetEl: Element): string {
  const targetDay: string =
    targetEl.parentElement?.previousElementSibling?.firstElementChild?.firstElementChild?.textContent;
  return targetDay;
}
