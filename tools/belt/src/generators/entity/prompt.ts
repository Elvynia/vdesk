import { confirm, input, select } from '@inquirer/prompts';
import { dasherize } from '../../manipulation/dasherize';
import { EntityComponent, EntityComponentAny, EntityComponentCheckbox, EntityComponentKeys, EntityComponentKeyType, EntityComponentSelect, EntityComponentSelectStore } from './component';
import { EntityField } from './field';
import { EntityRelation } from './relation';

export async function promptForComponent(field: Omit<EntityField, 'component'>): Promise<EntityComponent> {
	const type: EntityComponentKeyType = await confirm({
		message: 'Custom component ?',
		default: false
	}) ? await select({
		message: 'Choose component:',
		default: field.relation ? 'select' : 'checkbox',
		choices: EntityComponentKeys
	}) : 'input';
	let component = {
		type
	} as EntityComponentAny;
	if (type === 'checkbox') {
		component = {
			label: await input({ message: 'Checkbox label:' })
		} as EntityComponentCheckbox;
	} else if (type === 'select') {
		component = {
			type,
			displayExpr: await input({ message: `Populate select from store (loop var ${field.name})`, default: `${field.name}.` }),
			store: await confirm({ message: 'Populate select from store ?', default: true })
		} as EntityComponentSelect
		if (component.store) {
			component = {
				...component,
				storeSelect: await input({ message: 'Store selector:', default: 'select' + field.relation.clazzPlural })
			} as EntityComponentSelectStore
		}
	}
	return component;
}

export async function promptForRelation(type: string): Promise<EntityRelation> {
	let relationPath = undefined;
	let relationName = undefined;
	const regexEntity = type.match(/^([A-Z]+.+)Entity$/);
	if (regexEntity) {
		relationName = `${regexEntity[1].charAt(0).toLowerCase()}${regexEntity[1].slice(1)}`;
		const relationNameDash = dasherize(relationName);
		relationPath = `../${relationNameDash}/${relationNameDash}`;
	}
	const namePlural = await input({ message: 'Name plural:', default: relationName + 's' });
	return {
		clazz: `${relationName.charAt(0).toUpperCase()}${relationName.slice(1)}`,
		clazzPlural: `${namePlural.charAt(0).toUpperCase()}${namePlural.slice(1)}`,
		name: relationName,
		nameDash: dasherize(relationName),
		namePlural,
		importPath: await input({ message: 'Import path for type:', default: relationPath }),
		resolver: await confirm({ message: 'Add resolver ?', default: true })
	};
}

export async function promptForField(): Promise<EntityField> {
	const name = await input({ message: 'Name:' });
	const type = await input({ message: 'Type:', default: 'string' });
	const relation = !!type.match(/^[A-Z]+.+Entity$/);
	const float = type === 'number' ? await confirm({ message: 'Use decimal formatting ?', default: false }) : false;
	const field = {
		name,
		type,
		float,
		currency: float ? await confirm({ message: 'Use currency formatting ?', default: false }) : false,
		relation: relation ? await promptForRelation(type) : undefined,
		required: await confirm({ message: 'Required ?', default: true }),
		create: await confirm({ message: 'Use at creation ?', default: true }),
		update: await confirm({ message: 'Use at update ?', default: true }),
	} as Omit<EntityField, 'component'>;
	return {
		...field,
		component: await promptForComponent(field)
	};
}

export async function promptForEntity(): Promise<EntityField[]> {
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
