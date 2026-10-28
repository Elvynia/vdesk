import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IEntity } from "@lv/common";
import { map } from "rxjs";
import { ApiConfig } from "../config";
import { throwGraphQlError } from "./operator/throw-graphql-error";

@Injectable({
	providedIn: "root"
})
export abstract class ApiService<Entity extends IEntity, EntityCreate = Entity, EntityPatch = EntityCreate> {
	graphUrl: string;

	get clazz(): string {
		return `${this.entity.charAt(0).toUpperCase()}${this.entity.slice(1)}`;
	}

	abstract get entity(): string;

	constructor(protected httpClient: HttpClient, config: ApiConfig) {
		this.graphUrl = config.apiUrl + config.apiPath;
	}

	abstract getFields(args?: any): string;

	sendCreate<T extends Entity = Entity>(data: EntityCreate, fields: string = this.getFields()) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				mutation($input: ${this.clazz}CreateEntity!) {
					create${this.clazz}(create${this.clazz}Input: $input) {
						${fields}
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

	sendDelete(id: string, fields: string = '_id') {
		return this.httpClient.post(this.graphUrl, {
			query: `
                mutation($input: String!) {
					remove${this.clazz}(id: $input) {
						${fields}
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

	sendGet<T extends Entity = Entity>(id: string, fields: string = this.getFields()) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				query Get${this.clazz}($id: String!) {
					${this.entity}Id(id: $id) {
						${fields}
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

	sendList<T extends Entity = Entity>(fields: string = this.getFields()) {
		return this.httpClient.post(this.graphUrl, {
			"query": `{
				${this.entity} {
					${fields}
				}
			}`
		}).pipe(
			throwGraphQlError(),
			map((results: any) => results.data[this.entity] as T[])
		);
	}

	// TODO: Remove and rename sendPatch to sendUpdate.
	sendUpdate(data: EntityPatch) {
		return this.sendPatch(data as any);
	}

	sendPatch<T extends Entity = Entity>(data: EntityPatch, fields: string = this.getFields()) {
		return this.httpClient.post(this.graphUrl, {
			query: `
				mutation($input: ${this.clazz}PatchEntity!) {
					patch${this.clazz}(patch${this.clazz}Input: $input) {
						${fields}
					}
				}
			`,
			variables: {
				input: data
			}
		}).pipe(
			throwGraphQlError(),
			map((results: any) => results.data[`patch${this.clazz}`] as T)
		);
	}
}
