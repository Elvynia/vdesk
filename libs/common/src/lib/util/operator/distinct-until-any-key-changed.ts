import { distinctUntilChanged, Observable } from 'rxjs';

export function distinctUntilAnyKeyChanged<T>(keys: Array<keyof T>) {
	return (source: Observable<T>) => source.pipe(
		distinctUntilChanged((a, b) => !keys.some((k) => a[k] !== b[k]))
	)
}
