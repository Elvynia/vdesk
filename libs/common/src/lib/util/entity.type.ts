export interface IEntity {
	readonly _id: string;
	pending?: boolean;
}

export interface EntityEntry<T> {
	key: string;
	value: T | null;
}

export function isEntity<T>(value: T | any): value is T {
	return !!value._id;
}
