import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { TgKeylistenerComponent } from 'trilliangular/inputs/tg-keylistener.component';
import { TgMouselistenerService } from 'trilliangular/inputs/tg-mouselistener.service';
import { TgMouselistener } from 'trilliangular/inputs/tg-mouselistener.class';
import { MOUSE } from 'trilliangular/inputs/tg-mouse.enum';
import { TrilliangularService } from 'trilliangular/app/trilliangular.service';

@Component({
	selector: 'camera-controls',
	template: `
		<tg-keylistener [keys]="'z'" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keylistener>
		<tg-keylistener [keys]="'d'" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keylistener>
		<tg-keylistener [keys]="'s'" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keylistener>
		<tg-keylistener [keys]="'q'" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keylistener>
		<tg-keylistener [keys]="'a'" (keyUp)="directions[4] = false" (keyDown)="directions[4] = true"></tg-keylistener>
		<tg-keylistener [keys]="'e'" (keyUp)="directions[5] = false" (keyDown)="directions[5] = true"></tg-keylistener>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraControlsComponent {
	private directions: Array<boolean>;
	@Input() camera: THREE.PerspectiveCamera;
	@Input() velocity: number;
	@Output() cameraChange: EventEmitter<any>;
	private theta: number;
	private phi: number;
	
	constructor(private appService: TrilliangularService, private mouseService: TgMouselistenerService) {
		this.directions = [false, false, false, false, false, false];
		this.velocity = 1;
		this.cameraChange = new EventEmitter<any>();
		this.theta = 45;
		this.phi = 60;
	}
	
	ngOnInit() {
		this.appService.updated.subscribe((delta) => {
			let step:number = this.velocity * delta / 1000;
			if (this.directions[0]) {
				this.camera.translateZ(-step);
			} else if (this.directions[2]) {
				this.camera.translateZ(step);
			}
			if (this.directions[1]) {
				this.camera.translateX(step);
			} else if (this.directions[3]) {
				this.camera.translateX(-step);
			}
			if (this.directions[4]) {
				this.camera.translateY(step);
			} else if (this.directions[5]) {
				this.camera.translateY(-step);
			}
		});
		this.mouseService.eventsByType(MOUSE.MOUSE_DOWN).subscribe((event:TgMouselistener) => {
			let onMouseDownPosition: THREE.Vector2 = new THREE.Vector2(event.nativeEvent.clientX, event.nativeEvent.clientY);
			let onMouseDownTheta: number = this.theta;
			let onMouseDownPhi: number = this.phi;
			let radius: number = this.camera.position.distanceTo(new THREE.Vector3());
			this.mouseService
				.eventsByType(MOUSE.MOVED)
				.takeUntil(this.mouseService.eventsByType(MOUSE.MOUSE_UP))
				.subscribe((event:TgMouselistener) => {
					this.theta = - ( ( event.nativeEvent.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
					this.phi = ( ( event.nativeEvent.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;

					this.phi = Math.min( 180, Math.max( 0, this.phi ) );

					this.camera.position.x = radius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
					this.camera.position.y = radius * Math.sin( this.phi * Math.PI / 360 );
					this.camera.position.z = radius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
					this.camera.updateMatrix();
					this.camera.lookAt(new THREE.Vector3());
				});
		});
	}
}