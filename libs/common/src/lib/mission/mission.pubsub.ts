import { EntityEntry } from "../util/entity.type";
import { Mission } from "./mission.type";

export type HasMissionPubSub = {
	missionActive: EntityEntry<Mission>[]
};
