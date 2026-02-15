import { Mission } from "./mission.type";

export const missionIsActive = (mission: Mission, date: Date = new Date()) =>
	mission.start
	&& mission.start.getTime() < date.getTime()
	&& (
		!mission.end
		|| mission.end.getTime() > date.getTime()
	)
