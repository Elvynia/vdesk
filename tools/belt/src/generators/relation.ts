export interface EntityRelation {
	clazz: string;
	clazzPlural: string;
	name: string;
	namePlural: string;
	importPath?: string;
	// relativePath: boolean;
	resolver: boolean;
}
