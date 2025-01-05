import { Provider, Type } from "@angular/core";

export class CommonConfig {
	production!: boolean;
}

export class ApiConfig extends CommonConfig {
	apiPath!: string;
	apiUrl!: string;
}

export function provideConfigs<C extends CommonConfig>(value: C, main: Type<C>, classes: Type<C>[]): Provider[] {
	return classes.map((cl) => ({ provide: cl, useExisting: main } as Provider)).concat([{
		provide: main,
		useValue: value
	}]);
}
