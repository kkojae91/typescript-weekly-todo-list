import { IOnClickDarkAndLightModeIcon } from './types/types';

export default class OnClickDarkAndLightModeIcon implements IOnClickDarkAndLightModeIcon {
  private _htmlEl: HTMLHtmlElement | null = document.querySelector('html');
  private _darkIconEl: HTMLDivElement | null = document.querySelector('.dark-mode');
  private _lightIconEl: HTMLDivElement | null = document.querySelector('.light-mode');
  private _darkIcon: HTMLDivElement | null = document.querySelector('.dark-icon');
  private _darkToggle: HTMLDivElement | null = document.querySelector('.dark-toggle');
  private _lightIcon: HTMLDivElement | null = document.querySelector('.light-icon');
  private _lightToggle: HTMLDivElement | null = document.querySelector('.light-toggle');
  private _projectTheme: string | null = localStorage.getItem('theme');

  constructor(private _toggleEl: HTMLDivElement) {}

  private applyDarkMode(): void {
    this._darkIconEl?.classList.remove('active');
    this._lightIconEl?.classList.add('active');
    this._htmlEl?.classList.add('dark');
  }

  private applyLightMode(): void {
    this._darkIconEl?.classList.add('active');
    this._lightIconEl?.classList.remove('active');
    this._htmlEl?.classList.remove('dark');
  }

  public previousProjectThemeCheck(): void {
    if (this._projectTheme === 'dark' && this._darkIconEl && this._lightIconEl && this._htmlEl) {
      this.applyDarkMode();
    } else if (this._darkIconEl && this._lightIconEl && this._htmlEl) {
      this.applyLightMode();
    }
  }

  public onClickToggle(): void {
    this._toggleEl.addEventListener('click', event => {
      if (event.target === this._darkIconEl || event.target === this._darkIcon || event.target === this._darkToggle) {
        localStorage.setItem('theme', 'dark');
        this.applyDarkMode();
      } else if (
        event.target === this._lightIconEl ||
        event.target === this._lightIcon ||
        event.target === this._lightToggle
      ) {
        localStorage.setItem('theme', 'light');
        this.applyLightMode();
      }
    });
  }
}
