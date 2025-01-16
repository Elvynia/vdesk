import { Injectable } from "@angular/core";

export interface BaseFormatParams {
	navigationKeys: string[];
	debounceTime: number;
}

@Injectable()
export class BaseFormatConfig implements BaseFormatParams {
	navigationKeys!: string[];
	debounceTime!: number;
}
