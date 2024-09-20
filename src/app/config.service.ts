import { HttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { Observable, map, take } from 'rxjs';

export interface AppConfiguration {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfiguration>(
  'App configuration'
);

const initializeAppConfiguration = (
  configService: ConfigService
): (() => Observable<void>) => {
  return () => {
    return configService.fetchConfig();
  };
};

export const provideEnvironmentVars = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppConfiguration,
      deps: [ConfigService],
    },
    {
      provide: APP_CONFIG,
      multi: false,
      useFactory: (configService: ConfigService) => configService.configuration,
      deps: [ConfigService],
    },
  ]);
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private appConfiguration: Readonly<AppConfiguration> = { apiUrl: '' };

  get configuration(): Readonly<AppConfiguration> {
    return this.appConfiguration;
  }

  constructor(private readonly httpClient: HttpClient) {}

  fetchConfig(): Observable<void> {
    return this.httpClient
      .get<AppConfiguration>(`/environments/environment.json`)
      .pipe(
        map((configuration) => {
          this.appConfiguration = configuration;
        }),
        take(1)
      );
  }
}
