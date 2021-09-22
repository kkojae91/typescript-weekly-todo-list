function applyDarkMode(darkIconEl: Element, lightIconEl: Element, htmlEl: HTMLHtmlElement): void {
  darkIconEl?.classList.remove('active');
  lightIconEl?.classList.add('active');
  htmlEl?.classList.add('dark');
}

function applyLightMode(darkIconEl: Element, lightIconEl: Element, htmlEl: HTMLHtmlElement): void {
  darkIconEl?.classList.add('active');
  lightIconEl?.classList.remove('active');
  htmlEl?.classList.remove('dark');
}

function previousProjectThemeCheck(
  projectTheme: string,
  darkIconEl: Element,
  lightIconEl: Element,
  htmlEl: HTMLHtmlElement,
): void {
  if (projectTheme === 'dark' && darkIconEl && lightIconEl && htmlEl) {
    applyDarkMode(darkIconEl, lightIconEl, htmlEl);
  } else if (darkIconEl && lightIconEl && htmlEl) {
    applyLightMode(darkIconEl, lightIconEl, htmlEl);
  }
}

export default function onClickDarkAndLightModeIcon(toggleEl: Element): void {
  const htmlEl: HTMLHtmlElement | null = document.querySelector('html');
  const darkIconEl: Element | null = document.querySelector('.dark-mode');
  const lightIconEl: Element | null = document.querySelector('.light-mode');
  const darkIcon: Element | null = document.querySelector('.dark-icon');
  const darkToggle: Element | null = document.querySelector('.dark-toggle');
  const lightIcon: Element | null = document.querySelector('.light-icon');
  const lightToggle: Element | null = document.querySelector('.light-toggle');
  const projectTheme: string | null = localStorage.getItem('theme');

  if (projectTheme && darkIconEl && lightIconEl && htmlEl) {
    previousProjectThemeCheck(projectTheme, darkIconEl, lightIconEl, htmlEl);
  }

  toggleEl.addEventListener('click', event => {
    if (
      (event.target === darkIconEl || event.target === darkIcon || event.target === darkToggle) &&
      darkIconEl &&
      lightIconEl &&
      htmlEl
    ) {
      localStorage.setItem('theme', 'dark');
      applyDarkMode(darkIconEl, lightIconEl, htmlEl);
    } else if (
      (event.target === lightIconEl || event.target === lightIcon || event.target === lightToggle) &&
      darkIconEl &&
      lightIconEl &&
      htmlEl
    ) {
      localStorage.setItem('theme', 'light');
      applyLightMode(darkIconEl, lightIconEl, htmlEl);
    }
  });
}
