import { Mission } from "./mission.type";

export type HasMissionPubSub = {
	listenActive: Mission[] | Mission
};
