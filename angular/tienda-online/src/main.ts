import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(),
  ...appConfig.providers, provideIonicAngular({})
  ]
})
  .catch((err) => console.error(err));
