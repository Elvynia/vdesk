import { Mission, MissionRead } from "./mission.type";

export const missionIsActive = (mission: Mission, date: Date = new Date()) =>
	mission.start
	&& mission.start.getTime() < date.getTime()
	&& (
		!mission.end
		|| mission.end.getTime() > date.getTime()
	)

export const missionGroupByCompany = (missions: MissionRead[], useShortName: boolean = false) => missions
	.sort((a, b) => a.company.name.localeCompare(b.company.name))
	.reduce((g, m) => {
		const key = useShortName && m.company.shortName || m.company.name;
		if (!g[key]) {
			g[key] = [];
		}
		g[key].push(m);
		return g;
	}, {} as Record<string, MissionRead[]>) || {};
