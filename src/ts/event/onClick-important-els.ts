import hasClassListActive from '../has-classList-active';

function checkOnClick(Els: NodeListOf<HTMLDivElement>, target: EventTarget): boolean {
  let bool = false;
  Els.forEach(El => {
    if (target === El) {
      bool = true;
    }
  });
  return bool;
}

function addClassListActive(targetEls: NodeListOf<HTMLDivElement>, anotherEls: HTMLDivElement[]): void {
  const [checkBoolean, checkEls]: [boolean, Element[]] = hasClassListActive(anotherEls);
  targetEls.forEach(targetEl => {
    if (!checkBoolean) {
      targetEl.classList.add('active');
    } else {
      checkEls.forEach(checkEl => {
        checkEl.classList.remove('active');
      });
      targetEl.classList.add('active');
    }
  });
}

export default function onClickImportantEls(plusEl: Element): void {
  const importantEls1: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-1');
  const importantEls2: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-2');
  const importantEls3: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.plus-important-3');
  plusEl.addEventListener('click', event => {
    if (event.target && checkOnClick(importantEls1, event.target)) {
      addClassListActive(importantEls1, [...importantEls2, ...importantEls3]);
    } else if (event.target && checkOnClick(importantEls2, event.target)) {
      addClassListActive(importantEls2, [...importantEls1, ...importantEls3]);
    } else if (event.target && checkOnClick(importantEls3, event.target)) {
      addClassListActive(importantEls3, [...importantEls1, ...importantEls2]);
    }
  });
}
