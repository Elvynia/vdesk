import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {TrilliangularModule}  from '@trilliangular/core';
import {TgInputsModule}  from '@trilliangular/inputs';
import {RuntimeThreeModule}  from '@trilliangular/runtime-three';

import {RammComponent} from './ramm.component';
import {CameraControlsComponent} from '../camera-controls.component';
import {MemoryComponent} from '../memory/memory.component';
import {BubbleComponent} from '../bubble/bubble.component';
import {Config} from '../config.class';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		TrilliangularModule,
		TgInputsModule,
		RuntimeThreeModule
	],
	declarations: [
		RammComponent,
		CameraControlsComponent,
		MemoryComponent,
		BubbleComponent
	],
	providers: [Config],
	bootstrap: [RammComponent]
})
export class RammModule {

	constructor(private config: Config) {
	}

	public initialize(backendUrl: string) {
		this.config.backendUrl = backendUrl;
	}
}