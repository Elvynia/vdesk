import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { TgKeylistenerComponent } from 'trilliangular/inputs/tg-keylistener.component';
import { TrilliangularService } from 'trilliangular/app/trilliangular.service';

@Component({
	selector: 'translation',
	template: `
		<tg-keylistener [keys]="keys[0]" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[1]" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[2]" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[3]" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[4]" (keyUp)="directions[4] = false" (keyDown)="directions[4] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[5]" (keyUp)="directions[5] = false" (keyDown)="directions[5] = true"></tg-keylistener>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationComponent {
	private directions: Array<boolean>;
	@Input() position: any;
	@Input() velocity: number;
	@Input() keys: Array<string>;
	@Output() positionChange: EventEmitter<any>;
	
	constructor(private appService: TrilliangularService) {
		this.directions = [false, false, false, false];
		this.keys = ['up', 'right', 'down', 'left', 'pageup', 'pagedown'];
		this.velocity = 1;
		this.positionChange = new EventEmitter<any>();
	}
	
	ngOnInit() {
		this.appService.updated.subscribe((delta) => {
			let step:number = this.velocity * delta / 1000;
			if (this.directions[0]) {
				this.position.y += step;
			} else if (this.directions[2]) {
				this.position.y -= step;
			}
			if (this.directions[1]) {
				this.position.x += step;
			} else if (this.directions[3]) {
				this.position.x -= step;
			}
			if (this.directions[4]) {
				this.position.z += step;
			} else if (this.directions[5]) {
				this.position.z -= step;
			}
		});
	}
}