import { isEnvDev } from "@lv/common";
import { Observable, tap } from "rxjs";

export function throwGraphQlError() {
	return (source: Observable<any>) => source.pipe(
		tap((result: any) => {
			if (result['errors']) {
				if (isEnvDev()) {
					console.error('GraphQL issues :', result['errors']);
				}
				throw new Error('GraphQL issues');
			}
		})
	)
}
