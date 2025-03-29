import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission, missionFields } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class MissionService extends ApiService<Mission> {
	get entity(): string {
		return 'mission';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/mission';
	}

	getFields(): string {
		return missionFields.join('\n');
	}
}
