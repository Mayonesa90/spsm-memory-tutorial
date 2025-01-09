import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { ngxsConfig } from './ngxs.config';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HelloWorldState } from './hello-world/state/hello-world-state';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NumOfCardsState } from './home/state/home-state';

export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      importProvidersFrom(
        NgxsModule.forRoot(
          [HelloWorldState, NumOfCardsState], // <-- Add the state here
          {
            developmentMode: !environment.production,
          },
        ),
      ),
      importProvidersFrom(
        NgxsReduxDevtoolsPluginModule.forRoot({
          disabled: true,  // <-- Add the devtools plugin here
        }),
      ),
      importProvidersFrom(
        NgxsLoggerPluginModule.forRoot({
          disabled: false, // <-- Om du slår på detta så kommer det att synas i console.log, ett alternativ om plugin inte fungerar
        }),
      ),
    ],
  };