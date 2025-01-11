import { Route } from '@angular/router';
import { authGuard } from '@lv/angular';
import { AccountViewComponent } from './account/view/view.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [{
	component: LoginComponent,
	path: 'login'
}, {
	component: AccountViewComponent,
	path: 'account',
	canActivate: [authGuard]
}
// , {
// 	path: '',
// 	pathMatch: 'prefix',
// 	redirectTo: 'login'
// }
];
