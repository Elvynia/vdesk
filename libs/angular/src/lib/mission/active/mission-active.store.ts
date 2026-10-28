import { MissionActive } from "@lv/common";

export interface HasMissionActiveState {
	missionsActive: Record<string, MissionActive>;
}

export const selectMissionActive = (state: HasMissionActiveState) => state.missionsActive;
