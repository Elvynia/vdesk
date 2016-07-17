import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {HTTP_PROVIDERS, Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'ralm-app',
	templateUrl: 'views/app.template.html',
	styleUrls: ['css/app.css'],
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
			content: ['', Validators.required],
		});
	}
	
	private addMemory(event) {
		console.debug('Form data : ', this.memoryForm.value);
		this.http.post('/ws/ralm/memory', JSON.stringify(this.memoryForm.value), {headers: this.headers})
			.map(response => response.json())
			.subscribe((result) => this.memories.push(result),
				(error) => console.error('Post memory error : ', error),
				() => {
					this.memoryForm.value.content = null;
					this.memoryForm.controls.content.updateValue('', {onlySelf:true, emitEvent:true, emitModelToViewChange:true})
				});
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