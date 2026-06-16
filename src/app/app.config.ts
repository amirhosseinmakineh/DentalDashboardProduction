import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(),

    provideAnimations(),

    provideToastr({
      timeOut: 3000,
      extendedTimeOut: 1000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-left',
      newestOnTop: true,
      enableHtml: false
    })
  ]
};
