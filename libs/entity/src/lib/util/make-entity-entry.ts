import { EntityEntry } from "@lv/common";
import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";

export function makeEntityEntry<T>(EntityType: Type<T>) {

	@ObjectType(`${EntityType.name}Entry`)
	class DynamicEntry implements EntityEntry<T> {
		@Field(() => String)
		key: string;

		@Field(() => EntityType, { nullable: true })
		value: T | null;
	}

	Object.defineProperty(DynamicEntry, 'name', {
		value: `${EntityType.name}Entry`
	});

	return DynamicEntry;
}
