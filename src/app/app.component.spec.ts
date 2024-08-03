import {
  Spectator,
  SpyObject,
  byValue,
  createComponentFactory,
} from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { Button, ButtonModule } from 'primeng/button';
import { ThemeService } from './theme.service';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let themeService: SpyObject<ThemeService>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [ButtonModule, CommonModule],
    mocks: [ThemeService],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    themeService = spectator.inject(ThemeService);
  });

  it('should create the app', () => expect(spectator.component).toBeTruthy());

  it('should toggleDarkMode', () => {
    const toggleButton = getToggleDarkModeButtonElement();

    spectator.detectChanges();
    expect(spectator.component.isDarkMode()).toBeTrue();
    expect(toggleButton.icon).toBe(PrimeIcons.SUN);

    clickButton(toggleButton);

    expect(themeService.switchTheme).toHaveBeenCalledOnceWith(false);
    expect(spectator.component.isDarkMode()).toBeFalse();
    expect(toggleButton.icon).toBe(PrimeIcons.MOON);

    themeService.switchTheme.calls.reset();

    clickButton(toggleButton);

    expect(themeService.switchTheme).toHaveBeenCalledOnceWith(true);
    expect(spectator.component.isDarkMode()).toBeTrue();
    expect(toggleButton.icon).toBe(PrimeIcons.SUN);
  });

  const getToggleDarkModeButtonElement = (): Button => {
    const buttons = spectator.queryAll<Button>(Button);

    const toggleButtonAriaLabel = 'toggle dark mode';
    const toggleButton = buttons.find(
      (b) => b.ariaLabel === toggleButtonAriaLabel
    )!;

    if (!toggleButton) {
      fail(
        `Button with ariaLabel '${toggleButtonAriaLabel}' could not be found.`
      );
    }

    return toggleButton;
  };

  const clickButton = (button: Button): void => {
    spectator.click(button.el.nativeElement.querySelector('button'));
    spectator.detectChanges();
  };
});
