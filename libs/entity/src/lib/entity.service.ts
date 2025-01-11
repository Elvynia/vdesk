import { Model, UpdateQuery } from "mongoose";
import { from, Observable } from "rxjs";

export abstract class EntityService<Entity, CreateEntity = Entity, UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>> {

	protected abstract model: Model<Entity>;

	create(editEntity: CreateEntity): Observable<Entity> {
		return from(this.model.create(editEntity));
	}

	findAll(): Observable<Entity[]> {
		return from(this.model.find().exec());
	}

	findOne(_id: string) {
		return from(this.model.findOne({ _id }).exec());
	}

	update(_id: string, editEntity: UpdateEntity) {
		return from(this.model
			.findByIdAndUpdate({ _id }, editEntity, { new: true })
			.exec());
	}

	remove(_id: string) {
		return from(this.model
			.findByIdAndDelete({ _id })
			.exec());
	}
}
