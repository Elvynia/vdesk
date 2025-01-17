export interface EntityRelation {
	clazz: string;
	clazzPlural: string;
	name: string;
	nameDash: string;
	namePlural: string;
	importPath?: string;
	resolver: boolean;
}
