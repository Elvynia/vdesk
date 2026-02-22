
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService, AuthState, isAuthenticated, ObserverCompomix, selectAuth } from '@lv/angular';
import { MenuItem } from '@lv/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { TallyState } from './app.type';

@Component({
	imports: [
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatProgressSpinnerModule
	],
	selector: 'lv-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	host: {
		class: 'flex flex-col h-dvh'
	}
})
export class AppComponent extends ObserverCompomix() implements OnInit {
	@ViewChild('drawer') drawer?: MatDrawer;
	menu: MenuItem[];
	auth!: AuthState;

	get authenticated() {
		return isAuthenticated(this.auth);
	}

	constructor(private authService: AuthService, private matIconReg: MatIconRegistry,
		private store: Store<TallyState>
	) {
		super();
		this.menu = [
			{ "path": "home", "label": "Home", "icon": "dashboard" },
			{ "path": "account", "label": "Accounts", "icon": "contacts" },
			{ "path": "address", "label": "Addresses", "icon": "home" },
			{ "path": "company", "label": "Companies", "icon": "store" },
			{ "path": "company-type", "label": "Company Types", "icon": "contact_mail" },
			{ "path": "role", "label": "Roles", "icon": "license" },
			{ "path": "mission", "label": "Missions", "icon": "badge" },
			{ "path": "invoice", "label": "Invoices", "icon": "point_of_sale" }
		];
	}

	@HostListener('contextmenu', ['$event'])
	cancelSelect(event: Event) {
		event.preventDefault();
		this.drawer?.toggle();
	}

	ngOnInit(): void {
		this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
		this.authService.initialize();
		this.store.select(selectAuth).pipe(
			takeUntil(this.destroy$)
		).subscribe((auth) => this.auth = auth);
	}

	logout() {
		this.authService.logout();
	}
}
