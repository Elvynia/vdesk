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
		this.httpClient.post('http://localhost:3000/graphql', { "query": "{\n  address {\n    _id\n    line1\n    firstname\n    line2\n    siren\n  }\n}" }).subscribe(({ data }: any) => {
			console.log(data);
			this.addresses = data.address;
		});
	}
}
