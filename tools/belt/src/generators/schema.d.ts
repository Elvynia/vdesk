import { Field } from "./field";

export interface EntityGeneratorSchema {
	name: string;
	namePlural: string;
	clazz: string;
	clazzPlural: string;
	fields: Field[];
	fetchFields: string[];
}
