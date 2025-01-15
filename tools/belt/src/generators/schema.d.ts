import { EntityField, FormFieldSelect, RelationField } from "./field";

export interface EntityGeneratorSchema {
	name: string;
	namePlural: string;
	clazz: string;
	clazzPlural: string;
	fields: EntityField[];
	relationFields: RelationField[];
	relationFieldTyped: Record<string, RelationField[]>;
	formFields: EntityField[][];
	formFieldSelects: FormFieldSelect[];
	formFieldCheckboxes: EntityField[];
	fetchFields: FetchField[];
	createFields: Field[];
	updateFields: Field[];
}
