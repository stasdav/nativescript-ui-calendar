import { DoCheck, ElementRef, IterableDiffers } from '@angular/core';
import { RadCalendar } from 'nativescript-ui-calendar';
import * as i0 from "@angular/core";
export declare class RadCalendarComponent implements DoCheck {
    private _elementRef;
    private _iterableDiffers;
    private _calendar;
    private _eventSource;
    private _differ;
    private timerId;
    private doCheckDelay;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
    set eventSource(value: any);
    get nativeElement(): RadCalendar;
    get calendar(): RadCalendar;
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RadCalendarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadCalendarComponent, "RadCalendar", never, { "eventSource": "eventSource"; }, {}, never, never, false, never>;
}
export declare const CALENDAR_DIRECTIVES: (typeof RadCalendarComponent)[];
export declare class NativeScriptUICalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeScriptUICalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NativeScriptUICalendarModule, [typeof RadCalendarComponent], never, [typeof RadCalendarComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NativeScriptUICalendarModule>;
}
