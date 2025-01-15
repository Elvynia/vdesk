import { EntityComponent, EntityComponentCheckbox, EntityComponentSelect } from "./component";
import { EntityRelation } from "./relation";

export interface EntityField {
	name: string;
	type: string;
	required: boolean;
	create: boolean;
	update: boolean;
	component: EntityComponent;
	relation?: EntityRelation;
	fetch?: boolean;
}

export interface RelationField extends EntityField {
	relation: EntityRelation;
}

export interface FetchField extends EntityField {
	fetch: true;
}

export interface FormFieldSelect extends EntityField {
	component: EntityComponentSelect;
}

export interface FormFieldCheckbox extends EntityField {
	component: EntityComponentCheckbox;
}
