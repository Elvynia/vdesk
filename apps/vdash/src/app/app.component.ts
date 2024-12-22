import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	imports: [CommonModule, RouterModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	title = 'vdash';
	addresses: any[];

	constructor(private httpClient: HttpClient) {
		this.addresses = [];
	}

	ngOnInit(): void {
		this.httpClient.post('http://localhost:3000/graphql', {
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
}` }).subscribe(({ data }: any) => {
			console.log(data);
			this.addresses = data.address;
		});
	}
}
