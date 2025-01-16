import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthEntity, AuthService, isAuthenticated, ObserverCompomix, selectAuth } from '@lv/angular';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { TallyState } from './app.type';

@Component({
	imports: [
		CommonModule,
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
})
export class AppComponent extends ObserverCompomix() implements OnInit {
	menu: Record<string, string>;
	auth!: AuthEntity;

	get authenticated() {
		return isAuthenticated(this.auth);
	}

	constructor(private authService: AuthService, private matIconReg: MatIconRegistry,
		private store: Store<TallyState>
	) {
		super();
		this.menu = {
			account: 'Accounts',
			role: 'Roles',
            address: 'Addresses',
            'company-type': 'CompanyTypes',
            'company': 'Companies'
        };
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
