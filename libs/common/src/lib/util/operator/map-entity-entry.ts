import { IEntity } from "../entity.type";

export const mapEntityEntry = <T extends IEntity>(entity: T) => ({ key: entity._id, value: entity });
