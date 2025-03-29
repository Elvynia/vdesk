import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MissionEffects } from './mission.effects';
import { missionReducer } from './mission.reducer';

export function provideEntityMission(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('missions', missionReducer),
		provideEffects([MissionEffects]),
	];
}
