import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IEntity } from "@lv/common";
import { map } from "rxjs";
import { ApiConfig } from "../config";

@Injectable({
	providedIn: "root"
})
export abstract class ApiService<T extends IEntity> {
	apiUrl!: string;
	graphUrl: string;

	get clazz(): string {
		return `${this.entity.charAt(0).toUpperCase()}${this.entity.slice(1)}`;
	}

	abstract get entity(): string;

	constructor(protected httpClient: HttpClient, config: ApiConfig) {
		this.graphUrl = config.apiUrl + config.apiPath;
	}

	abstract getFields(args?: any): string;

	sendCreate(data: T) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				mutation($input: ${this.clazz}Create!) {
					create${this.clazz}(create${this.clazz}Input: $input) {
						${this.getFields()}
					}
				}
			`,
			variables: {
				input: data
			}
		}).pipe(
			map((results: any) => results.data[`create${this.clazz}`] as T)
		);
	}

	sendUpdate(data: T) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				mutation($input: ${this.clazz}Update!) {
					update${this.clazz}(update${this.clazz}Input: $input) {
						${this.getFields()}
					}
				}
			`,
			variables: {
				input: data
			}
		}).pipe(
			map((results: any) => results.data[`update${this.clazz}`] as T)
		);
	}

	sendDelete(id: string) {
		return this.httpClient.post(this.graphUrl, {
			query: `
                mutation($input: String!) {
					remove${this.clazz}(id: $input) {
						${this.getFields()}
					}
				}
            `,
			variables: {
				input: id
			}
		})
	}

	sendGet(id: string) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				query Get${this.clazz}($id: String!) {
					${this.entity}Id(id: $id) {
						${this.getFields()}
					}
				}
			`,
			variables: {
				id
			}
		}).pipe(
			map((results: any) => results.data[`${this.entity}Id`] as T)
		);
	}

	sendList() {
		return this.httpClient.post(this.graphUrl, {
			"query": `{
				${this.entity} {
					${this.getFields()}
				}
			}`
		}).pipe(
			map((results: any) => results.data[this.entity] as T[])
		);
	}
}
