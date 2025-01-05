import { ComponentRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingPlaceholderComponent } from './placeholder/loading-placeholder.component';

@Directive({
    selector: '[lvLoading]'
})
export class LoadingDirective {
    private _diameter: number;
    private _color: string;
    private _classes: string[];
    private compRef?: ComponentRef<LoadingPlaceholderComponent>;

    @Input() set lvLoading(condition: boolean | undefined) {
        if (!condition) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (condition) {
            this.viewContainer.clear();
            this.compRef = this.viewContainer.createComponent(LoadingPlaceholderComponent);
            this.compRef.instance.diameter = this._diameter;
            this.compRef.instance.classes = this._classes;
            this.compRef.instance.color = this._color;
        }
    }

    @Input('lvLoadingDiameter') set diameter(diameter: number) {
        this._diameter = diameter;
        if (this.compRef) {
            this.compRef.instance.diameter = diameter;
        }
    };

    @Input('lvLoadingClasses') set classes(classes: string[]) {
        this._classes = classes;
        if (this.compRef) {
            this.compRef.instance.classes = classes;
        }
    };

    @Input('lvLoadingColor') set color(color: string) {
        this._color = color;
        if (this.compRef) {
            this.compRef.instance.color = color;
        }
    };


    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
        this._classes = [];
        this._diameter = 48;
        this._color = 'accent';
    }

}
