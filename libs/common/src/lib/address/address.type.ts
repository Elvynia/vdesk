import { IEntity } from "../entity/entity.type";

export interface Address extends IEntity {
	city: string;
	firstname: string;
	lastname: string;
	line1: string;
	line2: string;
	siren: string;
	zip: string;
}
