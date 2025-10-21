import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ApiConfig, AuthEffects, authHttpInterceptor, authReducer, ChunkEffects, CommonConfig, provideConfigs, provideEntityAccount, provideEntityAddress, provideEntityCompany, provideEntityCompanyType, provideEntityInvoice, provideEntityMission, provideEntityRole } from '@lv/angular';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TallyConfig } from '../config';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([authHttpInterceptor()])
		),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideConfigs(environment, TallyConfig, [TallyConfig, ApiConfig, CommonConfig]),
		provideStore({ auth: authReducer }),
		provideEffects([AuthEffects, ChunkEffects]),
		provideEntityAccount(),
		provideEntityRole(),
		provideEntityAddress(),
		provideEntityCompanyType(),
		provideEntityCompany(),
		provideEntityRole(),
        provideEntityMission(),
        provideEntityInvoice()
    ],
};
