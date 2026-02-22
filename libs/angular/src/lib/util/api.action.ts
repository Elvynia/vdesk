export interface ApiActionSave<T> {
	value: T;
}

export interface ApiActionSuccess {
	success: true;
}

export interface ApiActionError {
	reason: string;
	success: false;
}

export interface ApiActionList<T> {
	values: T[];
}

export interface ApiActionListSuccess<T> {
	values: Record<string, T>;
	success: true;
}

export interface ApiActionId {
	valueId: string;
}

export type ApiActionAny<T> =
	ApiActionSave<T> & ApiActionSuccess
	| ApiActionSave<T> & ApiActionError
	| ApiActionListSuccess<T> & ApiActionSuccess
	| ApiActionSuccess
	| ApiActionError;

export const isApiActionSuccess = <T>(a: ApiActionAny<T>): a is ApiActionSave<T> & ApiActionSuccess
	| ApiActionListSuccess<T> & ApiActionSuccess => !!a.success
