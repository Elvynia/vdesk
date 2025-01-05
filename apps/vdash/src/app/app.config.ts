import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AuthEffects } from '../auth/effects';
import { authReducer } from '../auth/reducer';
import { authHttpInterceptor } from '../auth/token-interceptor';
import { DashConfig } from '../config';
import { environment } from '../environments/environments';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([authHttpInterceptor()])
		),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		{
			provide: DashConfig,
			useValue: environment
		},
		provideStore({ auth: authReducer }),
		provideEffects([AuthEffects])
	],
};
