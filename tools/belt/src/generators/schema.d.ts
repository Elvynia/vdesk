import { Field } from "./field";

export interface EntityGeneratorSchema {
	name: string;
	clazz: string;
	fields: string;
	fieldList: Field[];
}
