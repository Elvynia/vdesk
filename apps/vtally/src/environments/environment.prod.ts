import { NAVIGATION_KEYS } from "@lv/common";
import { TallyConfig } from "../config";

export const environment: TallyConfig = {
	production: true,
	apiUrl: 'https://desk.lv.dap',
	apiPath: '/api',
	authPath: '/auth',
	wsUrl: 'ws://desk.lv.dap',
	navigationKeys: NAVIGATION_KEYS,
	debounceTime: 200
};
