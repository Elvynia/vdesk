import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import { select } from 'inquirer-select-pro';
import * as path from 'path';
import { Node, Project, SyntaxKind } from "ts-morph";
import { makeAstUpdaterModuleImports } from '../manipulation/add-module-imports';
import { dasherize } from '../manipulation/dasherize';
import { FetchField, FormFieldCheckbox, FormFieldSelect, RelationField } from './field';
import { promptForEntity } from './prompt';
import { EntityGeneratorSchema } from './schema';

/**
 * FIXME: Rework with ts morph and organize imports.
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
			appConfig.organizeImports();

			// App route with entity view component.
			const appRoutes = project.getSourceFile(`./apps/${frontapp}/src/app/app.routes.ts`);
			const viewComponent = `${options.clazz}ViewComponent`;
			// Import provider.
			appRoutes.addImportDeclaration({
				namedImports: [{
					name: viewComponent
				}],
				moduleSpecifier: `./${options.nameDash}/view/view.component`
			});
			const appRoutesVar = appRoutes.getVariableStatement('appRoutes');
			const appRoutesArr = appRoutesVar.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
			appRoutesArr.addElement(`{
				component: ${options.clazz}ViewComponent,
				path: '${options.nameDash}',
				canActivate: [authGuard]
			}`);
			appRoutes.organizeImports();

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
				name: `'${options.nameDash}'`,
				initializer: (writer) => writer.write("'" + options.clazzPlural + "'")
			});
			appComponent.organizeImports();
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
	options.nameDash = dasherize(options.name);
	options.clazz = options.name.charAt(0).toUpperCase() + options.name.slice(1);
	options.namePlural = options.namePlural || options.name + 's';
	options.clazzPlural = options.namePlural.charAt(0).toUpperCase() + options.namePlural.slice(1);
	options.fields = await promptForEntity();
	const fetchList = await select({
		message: 'select',
		options: options.fields.map(({ name }) => ({ name, value: name })).concat([{ name: '_id', value: '_id' }]),
		defaultValue: options.fields.map(({ name }) => name).concat(['_id'])
	});
	options.fields.filter((f) => fetchList.includes(f.name)).forEach((f) => f.fetch = true);
	options.fetchFields = options.fields.filter((f): f is FetchField => f.fetch);
	options.relationFields = options.fields.filter((f): f is RelationField => !!f.relation);
	options.relationFieldTyped = options.relationFields.reduce((typed, field) => {
		if (!typed[field.relation.clazz]) {
			typed[field.relation.clazz] = [];
		}
		typed[field.relation.clazz].push(field);
		return typed;
	}, {});

	options.formFields = options.fields.slice(options.fields.length / 2)
		.map((_, i) => options.fields.slice(i *= 2, i + 2));
	options.formFieldSelects = options.fields.filter((f): f is FormFieldSelect => f.component.type === 'select');
	options.formFieldSelectTyped = options.formFieldSelects.reduce((typed, field) => {
		if (!typed[field.relation.clazz]) {
			typed[field.relation.clazz] = [];
		}
		typed[field.relation.clazz].push(field);
		return typed;
	}, {});
	options.formFieldCheckboxes = options.fields.filter((f): f is FormFieldCheckbox => f.component.type === 'checkbox');
	options.createFields = options.fields.filter((f) => f.create);
	options.updateFields = options.fields.filter((f) => f.update);
	// Backend lib
	generateFiles(tree, path.join(__dirname, 'backend'), `libs/${backlib}/src/lib/${options.nameDash}`, options);
	updaterExport('libs/entity/src/index.ts', options.nameDash, options.nameDash, ['entity', 'module', 'resolver', 'service']);

	// Backend app
	updaterEntity.backendApp(backapp, options);

	// Common
	generateFiles(tree, path.join(__dirname, 'common'), `libs/common/src/lib/${options.nameDash}`, options);
	updaterExport('libs/common/src/index.ts', options.nameDash, options.nameDash, ['fields', 'type']);

	// Frontend lib
	generateFiles(tree, path.join(__dirname, 'frontend/lib'), `libs/${frontlib}/src/lib/${options.nameDash}`, options);
	updaterExport('libs/angular/src/index.ts', options.nameDash, options.nameDash, ['actions', 'config', 'effects', 'reducer', 'service']);
	updaterExport('libs/angular/src/index.ts', options.nameDash + '/form', 'form', ['component']);
	updaterExport('libs/angular/src/index.ts', options.nameDash + '/item', 'item', ['component']);
	updaterExport('libs/angular/src/index.ts', options.nameDash + '/list', 'list', ['component']);

	// Frontend app
	generateFiles(tree, path.join(__dirname, 'frontend/app'), `apps/${frontapp}/src/app/${options.nameDash}`, options);
	updaterEntity.frontendApp(frontapp, options);
	if (process.env.NX_DRY_RUN === 'false') {
		await project.save();
		await formatFiles(tree);
	}
}

export default entityGenerator;
