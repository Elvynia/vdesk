import { EntityRepository } from "../entity.repository";

export type EntityOf<R> = R extends EntityRepository<infer E, any, any> ? E : never;
