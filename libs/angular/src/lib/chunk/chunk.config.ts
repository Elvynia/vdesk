import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ChunkEffects } from './chunk.effects';
import { chunkReducer } from './chunk.reducer';

export function provideEntityChunk(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('chunks', chunkReducer),
		provideEffects([ChunkEffects]),
	];
}
