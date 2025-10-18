import { Model, UpdateQuery } from "mongoose";

export abstract class EntityService<Entity, CreateEntity = Entity, UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>> {

	protected abstract model: Model<Entity>;

	create(editEntity: CreateEntity) {
		return this.model.create(editEntity);
	}

	findAll() {
		return this.model.find<Entity>().exec();
	}

	findAllByIds(ids: string[]) {
		return this.model.find<Entity>({
			_id: { $in: ids }
		}).exec();
	}

	findOne(_id: string) {
		return this.model.findOne<Entity>({ _id }).exec();
	}

	update(_id: string, editEntity: UpdateEntity) {
		return this.model
			.findByIdAndUpdate<Entity>({ _id }, editEntity, { new: true })
			.exec();
	}

	remove(_id: string) {
		return this.model
			.findByIdAndDelete<Entity>({ _id })
			.exec();
	}
}
