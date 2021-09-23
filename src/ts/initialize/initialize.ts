export function initializeClassListActive(Els: NodeListOf<HTMLDivElement>): void {
  Els.forEach(El => {
    if (El.classList.contains('active')) {
      El.classList.remove('active');
    }
  });
}

export function initializeImportantStarEls(plusImportantStarEls: NodeListOf<HTMLDivElement>): void {
  plusImportantStarEls.forEach(plusImportantStarEl => {
    if (plusImportantStarEl.dataset.important === '1') {
      plusImportantStarEl.classList.add('active');
    } else {
      plusImportantStarEl.classList.remove('active');
    }
  });
}
