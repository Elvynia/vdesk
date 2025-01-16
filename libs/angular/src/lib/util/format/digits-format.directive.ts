import { Directive, ElementRef } from '@angular/core';
import { CommonConfig } from '../../config';
import { BaseFormatConfig } from './base-format.config';
import { BaseFormatDirective } from './base-format.directive';

@Directive({
	selector: '[lvDigitsFormat]',
	providers: [
		{ provide: BaseFormatConfig, useExisting: CommonConfig }
	]
})
export class DigitsFormatDirective extends BaseFormatDirective {

	get regex() {
		return /\D/g;
	}

	constructor(el: ElementRef, config: BaseFormatConfig) {
		super(el, config);
	}

}
