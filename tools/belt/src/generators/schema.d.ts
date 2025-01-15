import { EntityField, FormFieldSelect, RelationField } from "./field";

export interface EntityGeneratorSchema {
	name: string;
	nameDash: string;
	namePlural: string;
	clazz: string;
	clazzPlural: string;
	fields: EntityField[];
	relationFields: RelationField[];
	relationFieldTyped: Record<string, RelationField[]>;
	formFields: EntityField[][];
	formFieldSelects: FormFieldSelect[];
	formFieldSelectTyped: Record<string, FormFieldSelect[]>;
	formFieldCheckboxes: EntityField[];
	fetchFields: FetchField[];
	createFields: Field[];
	updateFields: Field[];
}
