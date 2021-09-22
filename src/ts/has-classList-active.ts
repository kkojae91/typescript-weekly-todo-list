export default function hasClassListActive(Els: HTMLDivElement[]): [boolean, HTMLDivElement[]] {
  let bool = false;
  let trueEls: HTMLDivElement[] = [];
  Els.forEach(El => {
    if (El.classList.contains('active')) {
      bool = true;
      trueEls.push(El);
    }
  });
  return [bool, trueEls];
}
