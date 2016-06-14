import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {HTTP_PROVIDERS, Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'ralm-app',
	template: `
		<h1>Welcome to {{ name }}!</h1>
		<div style="float: left;width:50%;" *ngIf="memories != null">
			<div *ngFor="let memory of memories; let memoryIndex = index" title="{{memory._id}}">
				TITLE : {{memory.title}}
				CONTENT : {{memory.content}}
				<img src="http://vignette3.wikia.nocookie.net/criminal-case-grimsborough/images/b/b1/Delete_Icon.png/revision/latest?cb=20141216101607"
					style="width: 30px; height: auto;" (click)="deleteMemory(memory._id, memoryIndex)">
			</div>
		</div>
		<div style="float: right;width:50%;">
			<form [ngFormModel]="memoryForm" (submit)="addMemory($event)">
				<input ngControl="title" placeholder="Title..." />
				<textarea ngControl="content" placeholder="Content..."></textarea>
				<button>Add memory</button>
			</form>
		</div>
	`,
	providers: [HTTP_PROVIDERS]
})
class AppComponent {
	private name: string;
	private memoryForm: any;
	private memories: Array<any>;
	private headers: Headers;
	
	constructor(private http: Http, formBuilder: FormBuilder) {
		this.name = 'RALM DEMO';
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
		this.http.get('/ws/ralm/memory')
			.map(response => response.json())
			.subscribe((memories) => this.memories = memories,
				(error) => console.error('Get memories error : ', error),
				() => console.debug('Get memories complete'));
		this.memoryForm = formBuilder.group({
			title: ['', Validators.required],
			content: ['', Validators.required],
		});
	}
	
	private addMemory(event) {
		console.log('Form data : ', this.memoryForm.value);
		this.http.post('/ws/ralm/memory', JSON.stringify(this.memoryForm.value), {headers: this.headers})
			.map(response => response.json())
			.subscribe((result) => this.memories.push(result),
				(error) => console.error('Post memory error : ', error),
				() => console.debug('Post memory complete'));
	}
	
	private deleteMemory(memoryId, memoryIndex) {
		console.log('Delete memory at index:'+memoryIndex);
		this.http.delete('ws/ralm/memory/' + memoryId, {headers: this.headers})
			.subscribe((memory) => {
				this.memories.splice(memoryIndex, 1);
			});
	}
}

bootstrap(AppComponent);