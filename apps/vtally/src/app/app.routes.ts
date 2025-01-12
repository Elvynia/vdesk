import { Route } from '@angular/router';
import { authGuard } from '@lv/angular';
import { AccountViewComponent } from './account/view/view.component';
import { LoginComponent } from './login/login.component';
import { RoleViewComponent } from '../app/role/view/view.component';

export const appRoutes: Route[] = [{
	component: LoginComponent,
	path: 'login'
}, {
	component: AccountViewComponent,
	path: 'account',
	canActivate: [authGuard]
}, {
	component: RoleViewComponent,
	path: 'role',
	canActivate: [authGuard]
}
// , {
// 	path: '',
// 	pathMatch: 'prefix',
// 	redirectTo: 'login'
// }
];
