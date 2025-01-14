import { confirm, input } from '@inquirer/prompts';
import { Field } from './field';

export async function promptForField(): Promise<Field> {
	return {
		name: await input({ message: 'Name ?' }),
		type: await input({ message: 'Type ?', default: 'string' }),
		required: await confirm({ message: 'Required ?', default: true }),
		create: await confirm({ message: 'Use at creation ?', default: true }),
		update: await confirm({ message: 'Use at update ?', default: true }),
		component: await confirm({ message: 'Custom component ?', default: false }) ?
			// TODO
			'input'
			: 'input',
	};
}

export async function promptForEntity(): Promise<Field[]> {
	console.info('Creating main field:');
	const fields = [await promptForField()];
	let i = 1;
	while (await confirm({ message: 'Next field ?' })) {
		++i;
		console.info(`Creating field ${i}:`);
		fields.push(await promptForField());
	}
	return fields;
}
