import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs';
import { AuthService } from './service';
import { HasAuthState, selectAuthenticated } from './type';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const store = inject<Store<HasAuthState>>(Store<any>);
    const router = inject(Router);
    let source;
    if (!authService.initilized) {
        source = authService.initialize().pipe(
            map((auth) => !!auth.apiToken)
        );
    } else {
        source = store.select(selectAuthenticated).pipe(
            first()
        );
    }
    return source.pipe(
        tap((authenticated) => !authenticated && router.navigate(['login']))
    );
}
