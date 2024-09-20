import {
  APP_CONFIG,
  AppConfiguration,
  IConfigService,
  provideEnvironmentVars,
} from './config.service';
import {
  Injectable,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator';
import { of } from 'rxjs';

@Injectable()
class Service {
  name: string = '';
}

describe(provideEnvironmentVars.name, () => {
  const expectedConfig: AppConfiguration = { apiUrl: 'sjoldfbjlsdbnfsd' };
  let spectator: SpectatorService<Service>;
  const createService = createServiceFactory({
    service: Service,
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideEnvironmentVars(),
      mockProvider(IConfigService, {
        configuration: expectedConfig,
        fetchConfig: () => of(void 0),
      }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should provideEnvironmentVars', () => {
    const appConfig: AppConfiguration = spectator.inject(APP_CONFIG);

    expect(appConfig).toBe(expectedConfig);
  });
});
