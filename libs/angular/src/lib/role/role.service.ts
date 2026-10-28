import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, RoleCreate, roleFields } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class RoleService extends ApiService<Role, RoleCreate> {
	get entity(): string {
		return 'role';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
	}

	getFields(): string {
		return roleFields.join('\n');
	}
}
