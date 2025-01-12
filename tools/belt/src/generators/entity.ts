import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import { select } from 'inquirer-select-pro';
import * as path from 'path';
import { promptForEntity } from './prompt';
import { EntityGeneratorSchema } from './schema';

function makeExportUpdater(tree: Tree) {
	return (target: string, folder: string, name: string, files: string[]) => {
		const contents = tree.read(target).toString().split('\n').filter((l) => !!l);
		tree.write(target, contents.concat(files.map((f) => `export * from './lib/${folder}/${name}.${f}'; `)).join('\n'));
	}
}

export async function entityGenerator(
	tree: Tree,
	options: EntityGeneratorSchema
) {
	// const backapp = 'vdesk';
	const backlib = 'entity';
	const frontapp = 'vtally';
	const frontlib = 'angular';
	const exportUpdater = makeExportUpdater(tree);
	options.clazz = options.name.charAt(0).toUpperCase() + options.name.slice(1);
	options.fields = await promptForEntity();
	options.fetchFields = await select({
		message: 'select',
		options: options.fields.map(({ name }) => ({ name, value: name })).concat([{ name: '_id', value: '_id' }]),
		defaultValue: options.fields.map(({ name }) => name).concat(['_id'])
	});
	// Backend
	generateFiles(tree, path.join(__dirname, 'backend'), `libs/${backlib}/src/lib/${options.name}`, options);
	exportUpdater('libs/entity/src/index.ts', options.name, options.name, ['entity', 'module', 'resolver', 'service']);

	// Common
	generateFiles(tree, path.join(__dirname, 'common'), `libs/common/src/lib/${options.name}`, options);
	exportUpdater('libs/common/src/index.ts', options.name, options.name, ['type']);

	// Frontend lib
	generateFiles(tree, path.join(__dirname, 'frontend/lib'), `libs/${frontlib}/src/lib/${options.name}`, options);
	exportUpdater('libs/angular/src/index.ts', options.name, options.name, ['actions', 'config', 'effects', 'reducer', 'service']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/form', 'form', ['component']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/item', 'item', ['component']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/list', 'list', ['component']);

	// Frontend app
	generateFiles(tree, path.join(__dirname, 'frontend/app'), `apps/${frontapp}/src/app/${options.name}`, options);

	await formatFiles(tree);
}

export default entityGenerator;
