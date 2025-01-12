import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';
import { promptForEntity } from './prompt';

function makeExportUpdater(tree: Tree) {
	return (target: string, name: string, files: string[]) => {
		const contents = tree.read(target).toString().split('\n').filter((l) => !!l);
		tree.write(target, contents.concat(files.map((f) => `export * from './lib/${name}/${name}.${f}'; `)).join('\n'));
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

	// Backend
	generateFiles(tree, path.join(__dirname, 'backend'), `libs/${backlib}/src/lib/${options.name}`, options);
	exportUpdater('libs/entity/src/index.ts', options.name, ['entity', 'module', 'resolver', 'service']);

	// Common
	generateFiles(tree, path.join(__dirname, 'common'), `libs/common/src/lib/${options.name}`, options);
	exportUpdater('libs/common/src/index.ts', options.name, ['type']);

	// Frontend lib
	generateFiles(tree, path.join(__dirname, 'frontend/lib'), `libs/${frontlib}/src/lib/${options.name}`, options);
	exportUpdater('libs/angular/src/index.ts', options.name, ['actions', 'config', 'effects', 'reducer', 'service']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/form', ['component']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/item', ['component']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/list', ['component']);

	// Frontend app
	generateFiles(tree, path.join(__dirname, 'frontend/app'), `apps/${frontapp}/src/lib/${options.name}`, options);

	await formatFiles(tree);
}

export default entityGenerator;
