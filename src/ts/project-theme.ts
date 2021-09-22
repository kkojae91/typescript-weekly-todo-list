// porject theme
function applyDarkMode(darkIconEl: Element, lightIconEl: Element, htmlEl: HTMLHtmlElement) {
  darkIconEl?.classList.remove('active');
  lightIconEl?.classList.add('active');
  htmlEl?.classList.add('dark');
}

function applyLightMode(darkIconEl: Element, lightIconEl: Element, htmlEl: HTMLHtmlElement) {
  darkIconEl?.classList.add('active');
  lightIconEl?.classList.remove('active');
  htmlEl?.classList.remove('dark');
}

export default function onClickDarkAndLightModeIcon(toggleEl: Element) {
  const htmlEl: HTMLHtmlElement | null = document.querySelector('html');
  const darkIconEl: Element | null = document.querySelector('.dark-mode');
  const lightIconEl: Element | null = document.querySelector('.light-mode');
  const darkIcon: Element | null = document.querySelector('.dark-icon');
  const darkToggle: Element | null = document.querySelector('.dark-toggle');
  const lightIcon: Element | null = document.querySelector('.light-icon');
  const lightToggle: Element | null = document.querySelector('.light-toggle');

  const projectTheme: string | null = localStorage.getItem('theme');

  if (projectTheme === 'dark') {
    applyDarkMode(darkIconEl, lightIconEl, htmlEl);
  } else {
    applyLightMode(darkIconEl, lightIconEl, htmlEl);
  }

  toggleEl.addEventListener('click', event => {
    if (event.target === darkIconEl || event.target === darkIcon || event.target === darkToggle) {
      localStorage.setItem('theme', 'dark');
      applyDarkMode(darkIconEl, lightIconEl, htmlEl);
    } else if (event.target === lightIconEl || event.target === lightIcon || event.target === lightToggle) {
      localStorage.setItem('theme', 'light');
      applyLightMode(darkIconEl, lightIconEl, htmlEl);
    }
  });
}
