import { Directive, HostListener } from "@angular/core";
import { Constructor } from "../constructor.type";

export function HoverableCompomix<T extends Constructor>(Base: T = (class { } as any)) {
	@Directive()
	class HoverableCompomix extends Base {
		hovering: boolean;

		constructor(...params: any[]) {
			super(params);
			this.hovering = false;
		}

		@HostListener('mouseenter')
		mouseEnter() {
			this.hovering = true;
		}

		@HostListener('mouseleave')
		mouseLeave() {
			this.hovering = false;
		}
	}
	return HoverableCompomix;
}
