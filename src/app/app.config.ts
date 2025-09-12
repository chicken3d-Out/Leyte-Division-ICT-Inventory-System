import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; 
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
DatePipe

import { routes } from './app.routes';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MatSidenavModule, BrowserAnimationsModule, RouterModule, HttpClient, provideHttpClient(), provideNativeDateAdapter(), DatePipe
  ]
};
