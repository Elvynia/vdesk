import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function passwordConfirmValidatorFn(controlName: string, matchingControlName: string) {
    return (param: AbstractControl): ValidationErrors | null => {
        const formGroup = param as FormGroup;
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName]
        if (matchingControl?.errors && !matchingControl?.errors['passwordPolicyConfirm']) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordPolicyConfirm: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}
