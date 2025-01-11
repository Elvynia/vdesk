import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

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
	const projectRoot = `libs/entity/src/lib/${options.name}`;
	const exportUpdater = makeExportUpdater(tree);
	options.clazz = options.name.charAt(0).toUpperCase() + options.name.slice(1);
	options.fieldList = options.fields
		.split(';')
		.filter((f) => !!f)
		.map((source) => {
			const parts = source.split(':');
			let create = false;
			if (parts[0].includes('!')) {
				create = true;
				parts[0] = parts[0].replace('!', '');
			}
			return {
				name: parts[0].trim(),
				type: parts[1].trim(),
				required: parts[0].includes('?'),
				create
			}
		});
	generateFiles(tree, path.join(__dirname, 'backend'), projectRoot, options);
	exportUpdater('libs/angular/src/index.ts', options.name + '/form', ['component']);
	exportUpdater('libs/angular/src/index.ts', options.name + '/list', ['component']);
	exportUpdater('libs/common/src/index.ts', options.name, ['type']);
	exportUpdater('libs/entity/src/index.ts', options.name, ['entity', 'module', 'resolver', 'service']);
	await formatFiles(tree);
}

export default entityGenerator;
