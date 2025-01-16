import { Directive, ElementRef } from '@angular/core';
import { BaseFormatDirective } from './base-format.directive';
import { BaseFormatConfig } from './base-format.config';

@Directive({
    selector: '[lvDecimalFormat]'
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
