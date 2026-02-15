import { Mission } from "@lv/common";

export interface HasMissionActiveState {
	missionsActive: Record<string, Mission>;
}

export const selectMissionActive = (state: HasMissionActiveState) => state.missionsActive;
