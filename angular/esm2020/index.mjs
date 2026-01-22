import { Component, Input, ElementRef, Inject, IterableDiffers, NgModule } from '@angular/core';
import { RadCalendar } from 'nativescript-ui-calendar';
import { ObservableArray } from '@nativescript/core';
import { registerElement } from '@nativescript/angular';
import * as i0 from "@angular/core";
export class RadCalendarComponent {
    constructor(_elementRef, _iterableDiffers) {
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this.doCheckDelay = 5;
        this._calendar = _elementRef.nativeElement;
    }
    set eventSource(value) {
        this._eventSource = value;
        let needDiffer = true;
        if (value instanceof ObservableArray) {
            needDiffer = false;
        }
        if (needDiffer && !this._differ && CollectionUtils.isListLikeIterable(value)) {
            this._differ = this._iterableDiffers.find(this._eventSource).create((index, item) => item);
        }
        this._calendar.eventSource = this._eventSource;
    }
    get nativeElement() {
        return this._calendar;
    }
    get calendar() {
        return this._calendar;
    }
    ngDoCheck() {
        if (this._differ) {
            let changes = this._differ.diff(this._eventSource);
            if (changes) {
                this._calendar.reload();
            }
        }
    }
}
RadCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: RadCalendarComponent, deps: [{ token: ElementRef }, { token: IterableDiffers }], target: i0.ɵɵFactoryTarget.Component });
RadCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.2", type: RadCalendarComponent, selector: "RadCalendar", inputs: { eventSource: "eventSource" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: RadCalendarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'RadCalendar',
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.IterableDiffers, decorators: [{
                    type: Inject,
                    args: [IterableDiffers]
                }] }]; }, propDecorators: { eventSource: [{
                type: Input
            }] } });
////////////////////
// Copied from angular 2 @angular/common/src/facade/collection
var CollectionUtils;
(function (CollectionUtils) {
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    let _symbolIterator = null;
    let globalScope;
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                const keys = Object.getOwnPropertyNames(Map.prototype);
                for (let i = 0; i < keys.length; ++i) {
                    const key = keys[i];
                    if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return (isArray(obj) ||
            (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
                getSymbolIterator() in obj)); // JS Iterable have a Symbol.iterator prop
    }
    CollectionUtils.isListLikeIterable = isListLikeIterable;
})(CollectionUtils || (CollectionUtils = {}));
////////////////////
export const CALENDAR_DIRECTIVES = [RadCalendarComponent];
registerElement('RadCalendar', () => RadCalendar);
export class NativeScriptUICalendarModule {
}
NativeScriptUICalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NativeScriptUICalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NativeScriptUICalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.2", ngImport: i0, type: NativeScriptUICalendarModule, declarations: [RadCalendarComponent], exports: [RadCalendarComponent] });
NativeScriptUICalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NativeScriptUICalendarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NativeScriptUICalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CALENDAR_DIRECTIVES],
                    exports: [CALENDAR_DIRECTIVES]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91aS1jYWxlbmRhci9hbmd1bGFyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFrQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTXhELE1BQU0sT0FBTyxvQkFBb0I7SUFPaEMsWUFBd0MsV0FBdUIsRUFBbUMsZ0JBQWlDO1FBQTNGLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQW1DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFGM0gsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFHeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFhLFdBQVcsQ0FBQyxLQUFVO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7WUFDckMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUNuQjtRQUVELElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUs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QUFFLE9BQU8sS0FBSyxDQUFDO1FBQ25DLE9BQU8sQ0FDTixPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLEdBQUcsQ0FBQyxJQUFJLG9EQUFvRDtnQkFDN0UsaUJBQWlCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FDNUIsQ0FBQyxDQUFDLDBDQUEwQztJQUM5QyxDQUFDO0lBUGUsa0NBQWtCLHFCQU9qQyxDQUFBO0FBQ0YsQ0FBQyxFQXJFUyxlQUFlLEtBQWYsZUFBZSxRQXFFeEI7QUFDRCxvQkFBb0I7QUFFcEIsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFELGVBQWUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFNbEQsTUFBTSxPQUFPLDRCQUE0Qjs7eUhBQTVCLDRCQUE0QjswSEFBNUIsNEJBQTRCLGlCQTVINUIsb0JBQW9CLGFBQXBCLG9CQUFvQjswSEE0SHBCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUp4QyxRQUFRO21CQUFDO29CQUNULFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERvQ2hlY2ssIElucHV0LCBFbGVtZW50UmVmLCBJbmplY3QsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFJhZENhbGVuZGFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWNhbGVuZGFyJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UsIE9ic2VydmFibGVBcnJheSB9IGZyb20gJ0BuYXRpdmVzY3JpcHQvY29yZSc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICdAbmF0aXZlc2NyaXB0L2FuZ3VsYXInO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdSYWRDYWxlbmRhcicsXG5cdHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBSYWRDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXHRwcml2YXRlIF9jYWxlbmRhcjogUmFkQ2FsZW5kYXI7XG5cdHByaXZhdGUgX2V2ZW50U291cmNlOiBhbnk7XG5cdHByaXZhdGUgX2RpZmZlcjogSXRlcmFibGVEaWZmZXI8YW55Pjtcblx0cHJpdmF0ZSB0aW1lcklkOiBudW1iZXI7XG5cdHByaXZhdGUgZG9DaGVja0RlbGF5ID0gNTtcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIEBJbmplY3QoSXRlcmFibGVEaWZmZXJzKSBwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuXHRcdHRoaXMuX2NhbGVuZGFyID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdEBJbnB1dCgpIHNldCBldmVudFNvdXJjZSh2YWx1ZTogYW55KSB7XG5cdFx0dGhpcy5fZXZlbnRTb3VyY2UgPSB2YWx1ZTtcblx0XHRsZXQgbmVlZERpZmZlciA9IHRydWU7XG5cdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZUFycmF5KSB7XG5cdFx0XHRuZWVkRGlmZmVyID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG5lZWREaWZmZXIgJiYgIXRoaXMuX2RpZmZlciAmJiBDb2xsZWN0aW9uVXRpbHMuaXNMaXN0TGlrZUl0ZXJhYmxlKHZhbHVlKSkge1xuXHRcdFx0dGhpcy5fZGlmZmVyID0gdGhpcy5faXRlcmFibGVEaWZmZXJzLmZpbmQodGhpcy5fZXZlbnRTb3VyY2UpLmNyZWF0ZSgoaW5kZXgsIGl0ZW0pID0+IGl0ZW0pO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NhbGVuZGFyLmV2ZW50U291cmNlID0gdGhpcy5fZXZlbnRTb3VyY2U7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogUmFkQ2FsZW5kYXIge1xuXHRcdHJldHVybiB0aGlzLl9jYWxlbmRhcjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgY2FsZW5kYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NhbGVuZGFyO1xuXHR9XG5cblx0bmdEb0NoZWNrKCkge1xuXHRcdGlmICh0aGlzLl9kaWZmZXIpIHtcblx0XHRcdGxldCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fZXZlbnRTb3VyY2UpO1xuXHRcdFx0aWYgKGNoYW5nZXMpIHtcblx0XHRcdFx0dGhpcy5fY2FsZW5kYXIucmVsb2FkKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb3BpZWQgZnJvbSBhbmd1bGFyIDIgQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvY29sbGVjdGlvblxubmFtZXNwYWNlIENvbGxlY3Rpb25VdGlscyB7XG5cdGludGVyZmFjZSBCcm93c2VyTm9kZUdsb2JhbCB7XG5cdFx0T2JqZWN0OiB0eXBlb2YgT2JqZWN0O1xuXHRcdEFycmF5OiB0eXBlb2YgQXJyYXk7XG5cdFx0TWFwOiB0eXBlb2YgTWFwO1xuXHRcdFNldDogdHlwZW9mIFNldDtcblx0XHREYXRlOiBEYXRlQ29uc3RydWN0b3I7XG5cdFx0UmVnRXhwOiBSZWdFeHBDb25zdHJ1Y3Rvcjtcblx0XHRKU09OOiB0eXBlb2YgSlNPTjtcblx0XHRNYXRoOiBhbnk7IC8vIHR5cGVvZiBNYXRoO1xuXHRcdGFzc2VydChjb25kaXRpb246IGFueSk6IHZvaWQ7XG5cdFx0UmVmbGVjdDogYW55O1xuXHRcdGdldEFuZ3VsYXJUZXN0YWJpbGl0eTogRnVuY3Rpb247XG5cdFx0Z2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXM6IEZ1bmN0aW9uO1xuXHRcdGdldEFsbEFuZ3VsYXJSb290RWxlbWVudHM6IEZ1bmN0aW9uO1xuXHRcdGZyYW1ld29ya1N0YWJpbGl6ZXJzOiBBcnJheTxGdW5jdGlvbj47XG5cdFx0c2V0VGltZW91dDogRnVuY3Rpb247XG5cdFx0Y2xlYXJUaW1lb3V0OiBGdW5jdGlvbjtcblx0XHRzZXRJbnRlcnZhbDogRnVuY3Rpb247XG5cdFx0Y2xlYXJJbnRlcnZhbDogRnVuY3Rpb247XG5cdFx0ZW5jb2RlVVJJOiBGdW5jdGlvbjtcblx0fVxuXG5cdGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG5cdH1cblxuXHRmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcblx0fVxuXG5cdGRlY2xhcmUgdmFyIFN5bWJvbDogYW55O1xuXHRsZXQgX3N5bWJvbEl0ZXJhdG9yOiBhbnkgPSBudWxsO1xuXHRsZXQgZ2xvYmFsU2NvcGU6IEJyb3dzZXJOb2RlR2xvYmFsO1xuXG5cdGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCk6IHN0cmluZyB8IHN5bWJvbCB7XG5cdFx0aWYgKGlzQmxhbmsoX3N5bWJvbEl0ZXJhdG9yKSkge1xuXHRcdFx0aWYgKGlzUHJlc2VudCgoPGFueT5nbG9iYWxTY29wZSkuU3ltYm9sKSAmJiBpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuXHRcdFx0XHRfc3ltYm9sSXRlcmF0b3IgPSBTeW1ib2wuaXRlcmF0b3I7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuXHRcdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0aWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmIChNYXAgYXMgYW55KS5wcm90b3R5cGVba2V5XSA9PT0gTWFwLnByb3RvdHlwZVsnZW50cmllcyddKSB7XG5cdFx0XHRcdFx0XHRfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBfc3ltYm9sSXRlcmF0b3I7XG5cdH1cblxuXHRmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBvICE9PSBudWxsICYmICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbyA9PT0gJ29iamVjdCcpO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNBcnJheShvYmo6IGFueSk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG5cdFx0aWYgKCFpc0pzT2JqZWN0KG9iaikpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0aXNBcnJheShvYmopIHx8XG5cdFx0XHQoIShvYmogaW5zdGFuY2VvZiBNYXApICYmIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cblx0XHRcdFx0Z2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopXG5cdFx0KTsgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG5cdH1cbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9ESVJFQ1RJVkVTID0gW1JhZENhbGVuZGFyQ29tcG9uZW50XTtcbnJlZ2lzdGVyRWxlbWVudCgnUmFkQ2FsZW5kYXInLCAoKSA9PiBSYWRDYWxlbmRhcik7XG5cbkBOZ01vZHVsZSh7XG5cdGRlY2xhcmF0aW9uczogW0NBTEVOREFSX0RJUkVDVElWRVNdLFxuXHRleHBvcnRzOiBbQ0FMRU5EQVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSB7fVxuIl19