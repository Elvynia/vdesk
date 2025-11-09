import { Component } from '@angular/core';
import { AuthFormComponent } from '@lv/angular';

@Component({
	selector: 'lv-login',
	imports: [
		AuthFormComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {

}
