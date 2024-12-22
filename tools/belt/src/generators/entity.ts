import {
	formatFiles,
	generateFiles,
	Tree
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

export async function entityGenerator(
	tree: Tree,
	options: EntityGeneratorSchema
) {
	const projectRoot = `libs/entity/src/lib/${options.name}`;
	options.clazz = options.name.charAt(0).toUpperCase() + options.name.slice(1);
	options.fieldList = options.fields
		.split(';')
		.filter((f) => !!f)
		.map((source) => {
			const parts = source.split(':');
			return {
				name: parts[0].trim(),
				type: parts[1].trim(),
				required: source.includes('?')
			}
		});
	generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
	const exportFile = `libs/entity/src/index.ts`;
	const contents = tree.read(exportFile).toString().split('\n');
	tree.write(exportFile, contents.concat([
		`export * from './lib/${options.name}/${options.name}.entity'; `,
		`export * from './lib/${options.name}/${options.name}.module'; `,
		`export * from './lib/${options.name}/${options.name}.resolver'; `,
		`export * from './lib/${options.name}/${options.name}.service'; `,
	]).join('\n'));
	await formatFiles(tree);
}

export default entityGenerator;
