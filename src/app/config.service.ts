import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';

export interface AppConfiguration {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private appConfiguration: AppConfiguration = { apiUrl: '' };

  get configuration(): AppConfiguration {
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
