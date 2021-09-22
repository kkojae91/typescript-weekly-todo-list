export function initializeClassListActive(Els: Element[]): void {
  Els.forEach(El => {
    if (El.classList.contains('active')) {
      El.classList.remove('active');
    }
  });
}

export function initializeImportantStarEls(plusImportantStarEls: Element[]): void {
  plusImportantStarEls.forEach(plusImportantStarEl => {
    if (plusImportantStarEl.dataset.important === '1') {
      plusImportantStarEl.classList.add('active');
    } else {
      plusImportantStarEl.classList.remove('active');
    }
  });
}
