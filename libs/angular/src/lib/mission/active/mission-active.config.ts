import { EnvironmentProviders, Provider } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { missionEffectListenActive } from "./mission-active.effect";
import { missionActiveReducer } from "./mission-active.reducer";

export function provideEntityMissionActive(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('missionsActive', missionActiveReducer),
		provideEffects({
			missionEffectListenActive
		}),
	];
}
