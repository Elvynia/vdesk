import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Role } from '@lv/common';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

@Component({
	selector: 'lv-role-form',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],

	templateUrl: './form.component.html',
	styleUrl: './form.component.css',
})
export class RoleFormComponent extends ObserverCompomix() {
	@Input() group!: FormGroup;
	@Input() value?: Role;

	constructor() {
		super();
	}
}
