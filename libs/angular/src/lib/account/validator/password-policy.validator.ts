import { AbstractControl, ValidationErrors } from "@angular/forms";

export const SpecialChars = '@$.,;:!?+=-_*';

export function passwordPolicyValidatorFn() {
	return (control: AbstractControl<string>): ValidationErrors | null => {
		const value = control.value;
		if (value) {
			const errors = {} as ValidationErrors;
			if (!value.match(/\d+/g)) {
				errors['passwordPolicyNumber'] = true;
			}
			if (!value.match(/[A-Z]+/g)) {
				errors['passwordPolicyUppercase'] = true;
			}
			if (!SpecialChars.split('').some((char) => value.includes(char))) {
				errors['passwordPolicySpecial'] = true;
			}
			if (value.length < 8) {
				errors['passwordPolicyLength'] = true;
			}
			return Object.keys(errors).length > 0 ? errors : null;
		}
		return null;
	}
}
