import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { TrilliangularService, STATE, Trilliangular } from '@trilliangular/core';
import { TgKeysComponent, MOUSE, TgMouse, TgMouseService } from '@trilliangular/inputs';

@Component({
	selector: 'camera-controls',
	template: `
		<tg-keys [keys]="'z'" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keys>
		<tg-keys [keys]="'d'" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keys>
		<tg-keys [keys]="'s'" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keys>
		<tg-keys [keys]="'q'" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keys>
		<tg-keys [keys]="'a'" (keyUp)="directions[4] = false" (keyDown)="directions[4] = true"></tg-keys>
		<tg-keys [keys]="'e'" (keyUp)="directions[5] = false" (keyDown)="directions[5] = true"></tg-keys>
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
	
	constructor(private appService: TrilliangularService, private mouseService: TgMouseService) {
		this.directions = [false, false, false, false, false, false];
		this.velocity = 1;
		this.cameraChange = new EventEmitter<any>();
		this.theta = 0;
		this.phi = 60;
	}
	
	ngOnInit() {
		this.appService.filterByState(STATE.STARTED).subscribe((state:Trilliangular) => {
			let initCamera = (<any>state.renderer).camera;
			initCamera.position.z = 300;
		});
		this.appService.updated.subscribe((delta) => {
			let step:number = this.velocity * delta / 1000;
			let theta = this.theta;
			let phi = this.phi;
			if (this.directions[0]) {
				this.camera.translateZ(-step);
			} else if (this.directions[2]) {
				this.camera.translateZ(step);
			}
			if (this.directions[1]) {
				theta += step * 0.5;
			} else if (this.directions[3]) {
				theta -= step * 0.5;
			}
			if (this.directions[4]) {
				phi += step * 0.5;
			} else if (this.directions[5]) {
				phi -= step * 0.5;
			}
			phi = Math.min(180, Math.max(0, phi));
			if (phi !== this.phi || theta !== this.theta) {
				this.theta = theta;
				this.phi = phi;
				let radius: number = this.camera.position.distanceTo(new THREE.Vector3());
				this.camera.position.x = radius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
				this.camera.position.y = radius * Math.sin( this.phi * Math.PI / 360 );
				this.camera.position.z = radius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
				this.camera.lookAt(new THREE.Vector3());
			}
		});
		this.mouseService.eventsByType(MOUSE.MOUSE_DOWN).subscribe((event:TgMouse) => {
			let onMouseDownPosition: THREE.Vector2 = new THREE.Vector2(event.nativeEvent.clientX, event.nativeEvent.clientY);
			let onMouseDownTheta: number = this.theta;
			let onMouseDownPhi: number = this.phi;
			this.mouseService
				.eventsByType(MOUSE.MOVED)
				.takeUntil(this.mouseService.eventsByType(MOUSE.MOUSE_UP))
				.subscribe((event:TgMouse) => {
					this.theta = - ( ( event.nativeEvent.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
					this.phi = ( ( event.nativeEvent.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;

					this.phi = Math.min( 180, Math.max( 0, this.phi ) );
					let radius: number = this.camera.position.distanceTo(new THREE.Vector3());
					this.camera.position.x = radius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
					this.camera.position.y = radius * Math.sin( this.phi * Math.PI / 360 );
					this.camera.position.z = radius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
					this.camera.lookAt(new THREE.Vector3());
				});
		});
	}
}