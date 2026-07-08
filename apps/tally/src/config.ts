import { ApiConfig, BaseFormatParams } from "@lv/angular";

export class TallyConfig extends ApiConfig implements BaseFormatParams {
	navigationKeys!: string[];
	debounceTime!: number;
}
