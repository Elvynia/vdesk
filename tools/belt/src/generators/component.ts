export const EntityComponentKeys = ['input', 'checkbox', 'select'] as const;
export type EntityComponentKeyType = typeof EntityComponentKeys[number];

export interface EntityComponent {
	type: EntityComponentKeyType;
}

export interface EntityComponentCheckbox extends EntityComponent {
	type: 'checkbox';
	label: string;
}

export interface EntityComponentInput {
	type: 'input';
}

export interface EntityComponentSelect extends EntityComponent {
	type: 'select';
	store: boolean;
	displayExpr: string;
}

export interface EntityComponentSelectStore extends EntityComponentSelect {
	store: true;
	storeSelect?: string;
	// storeSelectImport?: string;
}

export type EntityComponentAny = EntityComponentCheckbox | EntityComponentInput | EntityComponentSelect | EntityComponentSelectStore;
