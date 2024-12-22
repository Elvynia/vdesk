import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Node {
	@Field(_ => Int)
	id: number;

	@Field()
	name: string;
}
