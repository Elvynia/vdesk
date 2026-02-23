import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companyTypeFields, HasMissionPubSub, makeMissionFields, Mission } from '@lv/common';
import { ApiConfig } from '../config';
import { SocketService } from '../socket.service';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class MissionService extends ApiService<Mission> {
	get entity(): string {
		return 'mission';
	}

	constructor(
		httpClient: HttpClient,
		config: ApiConfig,
		private socketService: SocketService<HasMissionPubSub>
	) {
		super(httpClient, config);
	}

	getFields(): string {
		return makeMissionFields().join('\n');
	}

	listenActive() {
		return this.socketService.subscribe('missionActive', `{
			key
			value {
				${this.getFields()}
				company {
					_id
					name
					invoiceCount
					trigram
					type {
						${companyTypeFields.join('\n')}
					}
				}
			}
		}`)
	}

}
