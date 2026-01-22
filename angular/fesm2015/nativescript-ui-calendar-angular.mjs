import * as i0 from '@angular/core';
import { ElementRef, IterableDiffers, Component, Inject, Input, NgModule } from '@angular/core';
import { RadCalendar } from 'nativescript-ui-calendar';
import { ObservableArray } from '@nativescript/core';
import { registerElement } from '@nativescript/angular';

class RadCalendarComponent {
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
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef, decorators: [{
                        type: Inject,
                        args: [ElementRef]
                    }] }, { type: i0.IterableDiffers, decorators: [{
                        type: Inject,
                        args: [IterableDiffers]
                    }] }];
    }, propDecorators: { eventSource: [{
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
const CALENDAR_DIRECTIVES = [RadCalendarComponent];
registerElement('RadCalendar', () => RadCalendar);
class NativeScriptUICalendarModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { CALENDAR_DIRECTIVES, NativeScriptUICalendarModule, RadCalendarComponent };
//# sourceMappingURL=nativescript-ui-calendar-angular.mjs.map
