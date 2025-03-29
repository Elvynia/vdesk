import { Route } from '@angular/router';
import { authGuard } from '@lv/angular';
import { RoleViewComponent } from '../app/role/view/view.component';
import { AccountViewComponent } from './account/view/view.component';
import { AddressViewComponent } from "./address/view/view.component";
import { CompanyTypeViewComponent } from "./company-type/view/view.component";
import { CompanyViewComponent } from "./company/view/view.component";
import { ViewComponent } from './home/view/view.component';
import { LoginComponent } from './login/login.component';
import { MissionViewComponent } from "./mission/view/view.component";

export const appRoutes: Route[] = [{
	component: LoginComponent,
	path: 'login'
},
{
	path: '',
	pathMatch: 'full',
	redirectTo: '/home',
},
{
	component: AccountViewComponent,
	path: 'account',
	canActivate: [authGuard]
},
{
	component: RoleViewComponent,
	path: 'role',
	canActivate: [authGuard]
},
{
	component: ViewComponent,
	path: 'home',
	canActivate: [authGuard]
},
{
	component: AddressViewComponent,
	path: 'address',
	canActivate: [authGuard]
},
{
	component: CompanyTypeViewComponent,
	path: 'company-type',
	canActivate: [authGuard]
},
{
	component: CompanyViewComponent,
	path: 'company',
	canActivate: [authGuard]
},
{
	component: RoleViewComponent,
	path: 'role',
	canActivate: [authGuard]
},
    {
    				component: MissionViewComponent,
    				path: 'mission',
    				canActivate: [authGuard]
    			}
];
