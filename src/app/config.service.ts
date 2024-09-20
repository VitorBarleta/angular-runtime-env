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
      provide: IConfigService,
      useClass: ConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppConfiguration,
      deps: [IConfigService],
    },
    {
      provide: APP_CONFIG,
      multi: false,
      useFactory: (configService: ConfigService) => configService.configuration,
      deps: [IConfigService],
    },
  ]);
};

export abstract class IConfigService {
  abstract get configuration(): Readonly<AppConfiguration>;

  abstract fetchConfig(): Observable<void>;
}

@Injectable()
class ConfigService implements IConfigService {
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
