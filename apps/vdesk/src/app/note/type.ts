import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Note {
	@Field(_ => Int)
	id: number;

	@Field({ nullable: true })
	title: string;

	@Field()
	text: string;

	@Field(_ => [Node], { nullable: 'items' })
	tags: Node[];
}
