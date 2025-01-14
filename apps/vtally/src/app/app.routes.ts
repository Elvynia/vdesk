import { Route } from '@angular/router';
import { authGuard } from '@lv/angular';
import { RoleViewComponent } from '../app/role/view/view.component';
import { AccountViewComponent } from './account/view/view.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './home/view/view.component';

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
}, {
	component: ViewComponent,
	path: 'home',
	canActivate: [authGuard]
}, {
	path: '',
	pathMatch: 'full',
	redirectTo: '/home',
}];
