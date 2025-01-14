import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import { select } from 'inquirer-select-pro';
import * as path from 'path';
import { Node, Project, SyntaxKind } from "ts-morph";
import { makeAstUpdaterModuleImports } from '../manipulation/add-module-imports';
import { promptForEntity } from './prompt';
import { EntityGeneratorSchema } from './schema';

/**
 * FIXME: Rework with ts morph.
 */
function makeAstUpdaterExport(tree: Tree) {
	return (target: string, folder: string, name: string, files: string[]) => {
		const contents = tree.read(target).toString().split('\n').filter((l) => !!l);
		tree.write(target, contents.concat(files.map((f) => `export * from './lib/${folder}/${name}.${f}'; `)).join('\n'));
	}
}

function makeAstUpdaterEntity(project: Project) {
	const moduleImporter = makeAstUpdaterModuleImports(project);
	return {
		backendApp: (backapp: string, options: EntityGeneratorSchema) => {
			moduleImporter(`./apps/${backapp}/src/app/app.module.ts`, [{
				namedImports: [{
					name: options.clazz + 'Module'
				}],
				moduleSpecifier: '@lv/entity'
			}]);
		},
		frontendApp: (frontapp: string, options: EntityGeneratorSchema) => {
			// App config providers for the entity.
			const appConfig = project.getSourceFile(`./apps/${frontapp}/src/app/app.config.ts`);
			const provider = `provideEntity${options.clazz}`;
			// Import provider.
			appConfig.addImportDeclaration({
				namedImports: [{
					name: provider
				}],
				moduleSpecifier: '@lv/angular'
			});
			// Add to provider array.
			const appConfigVar = appConfig.getVariableStatement('appConfig');
			const appConfigProviders = appConfigVar.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0].getProperty('providers');
			if (Node.isPropertyAssignment(appConfigProviders)) {
				const moduleValues = appConfigProviders.getInitializer();
				if (Node.isArrayLiteralExpression(moduleValues)) {
					moduleValues.addElement(provider + '()');
				}
			}

			// App route with entity view component.
			const appRoutes = project.getSourceFile(`./apps/${frontapp}/src/app/app.routes.ts`);
			const viewComponent = `${options.clazz}ViewComponent`;
			// Import provider.
			appRoutes.addImportDeclaration({
				namedImports: [{
					name: viewComponent
				}],
				moduleSpecifier: `./${options.name}/view/view.component`
			});
			const appRoutesVar = appRoutes.getVariableStatement('appRoutes');
			const appRoutesArr = appRoutesVar.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
			appRoutesArr.addElement(`{
				component: ${options.clazz}ViewComponent,
				path: '${options.name}',
				canActivate: [authGuard]
			}`);

			// App component menu item.
			const appComponent = project.getSourceFile(`./apps/${frontapp}/src/app/app.component.ts`);
			// const appComponentMenu = appComponent.getClass('AppComponent').getConstructors()[0].getBody().getDescendantStatements().find((node) => node.getText().includes('.menu'));
			const appComponentMenu = appComponent.getClass('AppComponent')
				.getConstructors()[0]
				.getBody()
				.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
				.find((p) => p.getText().includes('.menu'))
				.getParent()
				.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
			appComponentMenu.addPropertyAssignment({
				name: options.name,
				initializer: (writer) => writer.write("'" + options.name + "'")
			});
		}
	}
}

async function entityGenerator(
	tree: Tree,
	options: EntityGeneratorSchema
) {
	const project = new Project({
		tsConfigFilePath: 'tsconfig.base.json'
	});
	const backapp = 'vdesk';
	const backlib = 'entity';
	const frontapp = 'vtally';
	const frontlib = 'angular';
	const updaterExport = makeAstUpdaterExport(tree);
	const updaterEntity = makeAstUpdaterEntity(project);
	options.clazz = options.name.charAt(0).toUpperCase() + options.name.slice(1);
	options.fields = await promptForEntity();
	options.fetchFields = await select({
		message: 'select',
		options: options.fields.map(({ name }) => ({ name, value: name })).concat([{ name: '_id', value: '_id' }]),
		defaultValue: options.fields.map(({ name }) => name).concat(['_id'])
	});
	// Backend lib
	generateFiles(tree, path.join(__dirname, 'backend'), `libs/${backlib}/src/lib/${options.name}`, options);
	updaterExport('libs/entity/src/index.ts', options.name, options.name, ['entity', 'module', 'resolver', 'service']);

	// Backend app
	updaterEntity.backendApp(backapp, options);

	// Common
	generateFiles(tree, path.join(__dirname, 'common'), `libs/common/src/lib/${options.name}`, options);
	updaterExport('libs/common/src/index.ts', options.name, options.name, ['type']);

	// Frontend lib
	generateFiles(tree, path.join(__dirname, 'frontend/lib'), `libs/${frontlib}/src/lib/${options.name}`, options);
	updaterExport('libs/angular/src/index.ts', options.name, options.name, ['actions', 'config', 'effects', 'reducer', 'service']);
	updaterExport('libs/angular/src/index.ts', options.name + '/form', 'form', ['component']);
	updaterExport('libs/angular/src/index.ts', options.name + '/item', 'item', ['component']);
	updaterExport('libs/angular/src/index.ts', options.name + '/list', 'list', ['component']);

	// Frontend app
	generateFiles(tree, path.join(__dirname, 'frontend/app'), `apps/${frontapp}/src/app/${options.name}`, options);
	updaterEntity.frontendApp(frontapp, options);
	await formatFiles(tree);
	if (process.env.NX_DRY_RUN === 'false') {
		await project.save();
	}
}

export default entityGenerator;
