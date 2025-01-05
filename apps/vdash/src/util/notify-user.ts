import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

export const notifyUser = (snackBar: MatSnackBar, message: string, panelClass: string[], duration: number) => snackBar.open(message, 'Ok', {
    duration,
    panelClass,
    verticalPosition: 'top'
} as MatSnackBarConfig);
export const notifyUserSuccess = (snackBar: MatSnackBar, message: string) => notifyUser(snackBar, message, ['perma-success'], 5000);
export const notifyUserWarning = (snackBar: MatSnackBar, message: string) => notifyUser(snackBar, message, ['perma-warning'], 12000);
