import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import { provideStore } from '@ngxs/store';
import routeConfig from './app/routes';
import { HelloWorldState } from './app/hello-world/state/hello-world-state';
import { NumOfCardsState } from './app/home/state/home-state';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideStore([HelloWorldState]), provideStore([NumOfCardsState])]
})
  .catch((err) => console.error(err));
