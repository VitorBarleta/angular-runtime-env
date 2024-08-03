import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import {
  provideHttpClient,
  withFetch,
  withJsonpSupport,
} from '@angular/common/http';

const initializeAppConfiguration = (
  configService: ConfigService
): (() => Observable<void>) => {
  return () => {
    return configService.fetchConfig();
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withJsonpSupport(), withFetch()),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppConfiguration,
      deps: [ConfigService],
    },
  ],
};
