import {Component, ViewChild, OnInit, DoCheck} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {TrilliangularService} from '@trilliangular/core';
import {MOUSE, TgMouse, TgMouseService} from '@trilliangular/inputs';
import {ThreeInstanceComponent, ThreeRenderer, ThreeRendererComponent, ThreeMouseService} from '@trilliangular/runtime-three';

import {RammService} from './ramm.service';
import {Ramm} from './ramm.class';
import {MemoryService} from '../memory/memory.service';

@Component({
	selector: 'ramm',
	templateUrl: '/views/ramm.template.html',
	styleUrls: ['../css/ramm.css'],
	providers: [TrilliangularService, {provide: TgMouseService, useClass: ThreeMouseService}, RammService, MemoryService]
})
export class RammComponent implements OnInit, DoCheck {
	private debug: boolean;
	private cameraControls: boolean;
	private displaySize = {
		x: window.innerWidth,
		y: window.innerHeight
	};
	@ViewChild('renderer') renderer: ThreeRendererComponent;

	public get ramm(): Ramm {
		return this.rammService.ramm;
	}
	
	constructor(private mouseService: TgMouseService, private rammService: RammService) {
		this.debug = true;
		this.cameraControls = false;
	}

	ngOnInit() {
		this.mouseService.initialize(document.body);
		window.addEventListener("resize", () => {
			this.displaySize = {
				x: window.innerWidth,
				y: window.innerHeight
			}
		});
		setTimeout(() => this.rammService.initialize(), 0);
	}

	ngDoCheck() {
		if (this.renderer.cameraInstance) {
			this.cameraControls = true;
		} else {
			this.cameraControls = false;
		}
	}

	private reload() {
		this.rammService.initialize();
	}
}