import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
    selector: '[lvTrimFormat]'
})
export class TrimFormatDirective {

    get regex() {
        return /(^\s*)|(\s*$)/g;
    }

    constructor(protected el: ElementRef) { }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedInput: string = event.clipboardData!
            .getData('text/plain')
            .replaceAll(this.regex, '');
        document.execCommand('insertText', false, pastedInput);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        const textData = event.dataTransfer!
            .getData('text').replaceAll(this.regex, '');
        this.el.nativeElement.focus();
        document.execCommand('insertText', false, textData);
    }
}
