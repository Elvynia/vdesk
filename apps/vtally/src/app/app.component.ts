import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lv/angular';

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
export class AppComponent implements OnInit {
	menu: Record<string, string>;

	constructor(private authService: AuthService, private matIconReg: MatIconRegistry) {
		this.menu = {
			account: 'Accounts',
			address: 'Addresses',
			role: 'Roles'
		};
	}

	ngOnInit(): void {
		this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
		this.authService.initialize();
	}

	logout() {
		this.authService.logout();
	}
}
