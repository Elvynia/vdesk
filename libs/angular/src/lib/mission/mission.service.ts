import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companyTypeFields, HasMissionPubSub, makeMissionFields, Mission, MissionFieldArgs } from '@lv/common';
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
		this.apiUrl = config.apiUrl + config.apiPath + '/mission';
	}

	getFields(args?: MissionFieldArgs): string {
		return makeMissionFields(args).join('\n');
	}

	listenActive() {
		return this.socketService.subscribe('listenActive', `{
			${this.getFields({ chunkActive: true })}
			company {
				_id
				name
				invoiceCount
				trigram
				type {
					${companyTypeFields.join('\n')}
				}
			}
		}`)
	}

}
