import { Directive, ElementRef } from '@angular/core';
import { CommonConfig } from '../../config';
import { BaseFormatConfig } from './base-format.config';
import { BaseFormatDirective } from './base-format.directive';

@Directive({
	selector: '[lvDecimalFormat]',
	providers: [
		{ provide: BaseFormatConfig, useExisting: CommonConfig }
	]
})
export class DecimalFormatDirective extends BaseFormatDirective {

	get regex() {
		return /[^\d.]/g;
	}

	constructor(el: ElementRef, config: BaseFormatConfig) {
		super(el, config);
		this.authorizedKeys.push('.');
	}
}
