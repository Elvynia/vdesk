import { MenuItem } from '@lv/common';
import { EntityField, FormFieldSelect, NumberField, RelationField } from "./field";

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
	formFieldDates: FormField[];
	formFieldCurrencies: NumberField[];
	formFieldFloats: NumberField[];
	formFieldNumbers: NumberField[];
	formFieldSelects: FormFieldSelect[];
	formFieldSelectTyped: Record<string, FormFieldSelect[]>;
	formFieldCheckboxes: EntityField[];
	fetchFields: FetchField[];
	createFields: Field[];
	updateFields: Field[];
	skipFrontApp: boolean;
	skipRoute: boolean;
	route?: MenuItem;
}
