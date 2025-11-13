import { Model, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class EntityRepository<Entity, CreateEntity = Entity, UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>> {

	protected abstract model: Model<Entity>;

	create(editEntity: CreateEntity) {
		return this.model.create(editEntity);
	}

	findAll(filter?: RootFilterQuery<Entity>) {
		if (filter) {
			return this.model.find(filter).exec();
		}
		return this.model.find().exec();
	}

	findAllByIds(ids: string[]) {
		return this.model.find({
			_id: { $in: ids }
		}).exec();
	}

	findOne(_id: string) {
		return this.model.findOne({ _id }).exec();
	}

	update(_id: string, editEntity: UpdateEntity) {
		return this.model
			.findByIdAndUpdate({ _id }, editEntity, { new: true })
			.exec();
	}

	remove(_id: string) {
		return this.model
			.findByIdAndDelete({ _id })
			.exec();
	}
}
