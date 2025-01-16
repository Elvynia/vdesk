import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonConfig } from '../../config';
import { BaseFormatConfig } from './base-format.config';
import { BaseFormatDirective } from './base-format.directive';


@Directive({
	selector: '[lvCurrencyFormat]',
	providers: [
		{ provide: BaseFormatConfig, useExisting: CommonConfig }
	]
})
export class CurrencyFormatDirective extends BaseFormatDirective implements OnInit, OnDestroy {
	subscription?: Subscription;

	get regex() {
		return /[^\d.]/g;
	}

	constructor(private ngControl: NgControl, private decPipe: CurrencyPipe,
		el: ElementRef, config: BaseFormatConfig) {
		super(el, config);
		this.authorizedKeys.push('.');
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.setValue(this.ngControl.control!.value);
			this.subscription = this.ngControl.control!.valueChanges.pipe(
				debounceTime(this.config.debounceTime!),
				distinctUntilChanged()
			).subscribe(value => this.setValue(value));
		})
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}

	private setValue(value: any) {
		if (value != null) {
			if (typeof value !== 'string') {
				value = value.toString();
			}
			value = value.replace(this.regex, '');
			let formatted;
			try {
				formatted = this.decPipe.transform(value, 'USD', '$', '1.0-2');
				if (value.endsWith('.')) {
					formatted += '.';
				}
			} catch (e) {
				// console.log('Cannot parse currency input:', e);
			}
			this.ngControl.control!.setValue(formatted || value, { emitEvent: false });
		}
	}
}
