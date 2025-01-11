
export class ApiAction<T> {
	value?: T;
	valueId?: string;
	values?: any;
	success?: boolean;
}

export interface ApiActionSave<T> extends ApiAction<T> {
	value: T;
}

export interface ApiActionList<T> extends ApiAction<T> {
	values: T[];
}

export interface ApiActionListSuccess<T> extends ApiAction<T> {
	values: Record<string, T>;
}

export interface ApiActionId<T> extends ApiAction<T> {
	valueId: string;
}

export interface ApiActionError {
	reason: string;
	success: false;
}

export interface ApiActionSuccess {
	success: true;
}
