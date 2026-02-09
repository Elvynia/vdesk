import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companyTypeFields, makeMissionFields, Mission, MissionFieldArgs } from '@lv/common';
import { map } from 'rxjs';
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
		private socketService: SocketService
	) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/mission';
	}

	getFields(args?: MissionFieldArgs): string {
		return makeMissionFields(args).join('\n');
	}

	listenActive() {
		return this.socketService.subscribe<Mission[]>('listenActive', `{
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

	sendListActive() {
		return this.httpClient.post(this.graphUrl, {
			"query": `{
					missionActive {
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
					}
				}`
		}).pipe(
			map((results: any) => results.data[`${this.entity}Active`] as Mission[])
		);
	}
}
