import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {TrilliangularModule}  from 'trilliangular/app/trilliangular.module';
import {TgThreeModule}  from 'trilliangular/runtime/three/tg-three.module';

import {RammComponent} from './ramm.component';
import {MemoryComponent} from '../memory/memory.component';
import {TagComponent} from '../tag/tag.component';
import {CameraControlsComponent} from '../camera-controls.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		TrilliangularModule,
		TgThreeModule
	],
	declarations: [
		RammComponent,
		MemoryComponent,
		TagComponent,
		CameraControlsComponent
	],
	bootstrap: [RammComponent]
})
export class RammModule {
	
}