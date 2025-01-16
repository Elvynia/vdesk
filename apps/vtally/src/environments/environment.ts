import { NAVIGATION_KEYS } from "@lv/common";
import { TallyConfig } from "../config";

export const environment: TallyConfig = {
	production: false,
	apiUrl: 'http://localhost:3000/',
	apiPath: 'api',
	navigationKeys: NAVIGATION_KEYS,
	debounceTime: 200
};
