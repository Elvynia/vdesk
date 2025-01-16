import { Directive, ElementRef, HostListener } from '@angular/core';
import { BaseFormatConfig } from './base-format.config';


@Directive()
export abstract class BaseFormatDirective {
	protected authorizedKeys: string[];
	protected abstract get regex(): RegExp;

	constructor(protected el: ElementRef, protected config: BaseFormatConfig) {
		this.authorizedKeys = config.navigationKeys;
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if (!event.ctrlKey && this.authorizedKeys.indexOf(event.key) < 0
			&& isNaN(Number(event.key))) {
			event.preventDefault();
		}
	}

	@HostListener('paste', ['$event'])
	onPaste(event: ClipboardEvent) {
		event.preventDefault();
		const pastedInput: string = event.clipboardData!
			.getData('text/plain')
			.replace(this.regex, '');
		document.execCommand('insertText', false, pastedInput);
	}

	@HostListener('drop', ['$event'])
	onDrop(event: DragEvent) {
		event.preventDefault();
		const textData = event.dataTransfer!
			.getData('text').replace(this.regex, '');
		this.el.nativeElement.focus();
		document.execCommand('insertText', false, textData);
	}
}
