import { OnDestroy } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { Constructor } from '../constructor.type';

export function ObserverCompomix<T extends Constructor>(Base: T = (class { } as any)) {
	return class extends Base implements OnDestroy {
		destroy$: AsyncSubject<void>;

		constructor(...params: any[]) {
			super(...params);
			this.destroy$ = new AsyncSubject();
		}

		ngOnDestroy() {
			this.destroy$.next();
			this.destroy$.complete();
		}
	}
}
