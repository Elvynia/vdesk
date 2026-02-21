import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IEntity } from "@lv/common";
import { map } from "rxjs";
import { ApiConfig } from "../config";
import { throwGraphQlError } from "./operator/throw-graphql-error";

@Injectable({
	providedIn: "root"
})
export abstract class ApiService<T extends IEntity, TCreate = T, TUpdate = TCreate> {
	graphUrl: string;

	get clazz(): string {
		return `${this.entity.charAt(0).toUpperCase()}${this.entity.slice(1)}`;
	}

	abstract get entity(): string;

	constructor(protected httpClient: HttpClient, config: ApiConfig) {
		this.graphUrl = config.apiUrl + config.apiPath;
	}

	abstract getFields(args?: any): string;

	sendCreate(data: TCreate) {
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
			throwGraphQlError(),
			map((results: any) => results.data[`create${this.clazz}`] as T)
		);
	}

	sendUpdate(data: TUpdate) {
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
			throwGraphQlError(),
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
		}).pipe(
			throwGraphQlError()
		);
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
			throwGraphQlError(),
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
			throwGraphQlError(),
			map((results: any) => results.data[this.entity] as T[])
		);
	}
}
