import { EntityEntry } from "../util/entity.type";
import { MissionActive } from "./mission.type";

export type HasMissionPubSub = {
	missionActive: EntityEntry<MissionActive>[]
};
