import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {

	@Field()
	city: string;

	@Field({ nullable: true })
	firstname: string;

	@Field()
	lastname: string;

	@Field()
	line1: string;

	@Field({ nullable: true })
	line2: string;

	@Field({ nullable: true })
	siren: string;

	@Field()
	zip: string;
}
