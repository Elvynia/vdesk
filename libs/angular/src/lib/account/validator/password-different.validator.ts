import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function passwordDifferentValidatorFn(controlName: string, matchingControlName: string) {
    return (param: AbstractControl): ValidationErrors | null => {
        const formGroup = param as FormGroup;
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName]
        if (matchingControl?.errors && !matchingControl?.errors['passwordPolicyDifferent']) {
            return null;
        }
        if (control.value === matchingControl.value
            || matchingControl.value.includes(control.value)) {
            matchingControl.setErrors({ passwordPolicyDifferent: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}
