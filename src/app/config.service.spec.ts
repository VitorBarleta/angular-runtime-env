import { HttpMethod, SpectatorHttp, createHttpFactory } from '@ngneat/spectator';
import { AppConfiguration, ConfigService } from './config.service';
import { take } from 'rxjs';

describe(ConfigService.name, () => {
  let spectator: SpectatorHttp<ConfigService>;
  const createService = createHttpFactory({
    service: ConfigService,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => expect(spectator.service).toBeTruthy());

  it('should fetch the config and save it in the class state', () => {
    const expectedResponse: AppConfiguration = { apiUrl: 'my-fake-url' };

    spectator.service.fetchConfig().pipe(take(1)).subscribe();
    spectator.expectOne('/environments/environment.json', HttpMethod.GET).flush(expectedResponse);
    expect(spectator.service.configuration).toBe(expectedResponse);
  });
});
