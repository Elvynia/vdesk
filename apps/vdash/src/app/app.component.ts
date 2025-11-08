
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthFormComponent } from '@lv/angular';

@Component({
	imports: [
    AuthFormComponent,
    MatButtonModule
],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'vdash';
	addresses: any[];

	constructor(private httpClient: HttpClient) {
		this.addresses = [];
	}

	query() {
		const accounts = ``;
		this.httpClient.post('http://localhost:3000/api', {
			"query": `{
  address {
    _id
    line1
    firstname
    line2
    siren
  }
  account {
    _id
	username
  }
}` }).subscribe(({ data, errors }: any) => {
				console.log(data, errors?.map((e: any) => e.message));
				this.addresses = data?.address;
			});
	}
}
