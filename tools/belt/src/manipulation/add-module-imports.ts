import { ImportDeclarationStructure, Node, ObjectLiteralExpression, OptionalKind, Project } from "ts-morph";

export function makeAstUpdaterModuleImports(project: Project) {
	return (path: string, declarations: OptionalKind<ImportDeclarationStructure>[]) => {
		const moduleFile = project.getSourceFile(path);
		moduleFile.addImportDeclarations(declarations);
		const moduleDecorator = moduleFile.getClass('AppModule').getDecorator('Module').getArguments()[0] as ObjectLiteralExpression;
		const moduleDecoratorImports = moduleDecorator.getProperty('imports');
		if (Node.isPropertyAssignment(moduleDecoratorImports)) {
			const moduleValues = moduleDecoratorImports.getInitializer();
			if (Node.isArrayLiteralExpression(moduleValues)) {
				moduleValues.addElements(declarations.map((d) => d.namedImports[0].name));
			}
		}
	}
}
