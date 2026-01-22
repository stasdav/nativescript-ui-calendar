import { View, ViewBase, Property, booleanConverter, Color, ObservableArray, Observable, addWeakEventListener, removeWeakEventListener } from '@nativescript/core';
export var CalendarViewMode;
(function (CalendarViewMode) {
    CalendarViewMode["Week"] = "Week";
    CalendarViewMode["Month"] = "Month";
    CalendarViewMode["MonthNames"] = "MonthNames";
    CalendarViewMode["Year"] = "Year";
    CalendarViewMode["Day"] = "Day";
})(CalendarViewMode || (CalendarViewMode = {}));
export var CalendarSelectionShape;
(function (CalendarSelectionShape) {
    CalendarSelectionShape["Round"] = "Round";
    CalendarSelectionShape["Square"] = "Square";
    CalendarSelectionShape["None"] = "None";
})(CalendarSelectionShape || (CalendarSelectionShape = {}));
export var CalendarEventsViewMode;
(function (CalendarEventsViewMode) {
    CalendarEventsViewMode["None"] = "None";
    CalendarEventsViewMode["Inline"] = "Inline";
    CalendarEventsViewMode["Popover"] = "Popover";
})(CalendarEventsViewMode || (CalendarEventsViewMode = {}));
export var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    CalendarSelectionMode["None"] = "None";
    CalendarSelectionMode["Single"] = "Single";
    CalendarSelectionMode["Multiple"] = "Multiple";
    CalendarSelectionMode["Range"] = "Range";
})(CalendarSelectionMode || (CalendarSelectionMode = {}));
export var CalendarTransitionMode;
(function (CalendarTransitionMode) {
    CalendarTransitionMode["None"] = "None";
    CalendarTransitionMode["Slide"] = "Slide";
    CalendarTransitionMode["Stack"] = "Stack";
    CalendarTransitionMode["Flip"] = "Flip";
    CalendarTransitionMode["Fold"] = "Fold";
    CalendarTransitionMode["Float"] = "Float";
    CalendarTransitionMode["Rotate"] = "Rotate";
    CalendarTransitionMode["Plain"] = "Plain";
    CalendarTransitionMode["Free"] = "Free";
    CalendarTransitionMode["Combo"] = "Combo";
    CalendarTransitionMode["Overlap"] = "Overlap";
})(CalendarTransitionMode || (CalendarTransitionMode = {}));
/**
 * Font styles
 */
export var CalendarFontStyle;
(function (CalendarFontStyle) {
    /**
     * Regular font style
     */
    CalendarFontStyle["Normal"] = "Normal";
    /**
     * Bold font style
     */
    CalendarFontStyle["Bold"] = "Bold";
    /**
     * Italic font style
     */
    CalendarFontStyle["Italic"] = "Italic";
    /**
     * Combine Bold and Italic styles
     */
    CalendarFontStyle["BoldItalic"] = "BoldItalic";
})(CalendarFontStyle || (CalendarFontStyle = {}));
/**
 * Defines the alignment options for cells in Calendar component.
 */
export var CalendarCellAlignment;
(function (CalendarCellAlignment) {
    /**
     The cell content is aligned to left.
     */
    CalendarCellAlignment["Left"] = "Left";
    /**
     The cell content is aligned to right.
     */
    CalendarCellAlignment["Right"] = "Right";
    /**
     The cell content is aligned to top.
     */
    CalendarCellAlignment["Top"] = "Top";
    /**
     The cell content is aligned to bottom.
     */
    CalendarCellAlignment["Bottom"] = "Bottom";
    /**
     The cell content is aligned horizontally.
     */
    CalendarCellAlignment["HorizontalCenter"] = "HorizontalCenter";
    /**
     The cell content is aligned vertically.
     */
    CalendarCellAlignment["VerticalCenter"] = "VerticalCenter";
    /**
     The cell content is center aligned both horizontally and vertically.
     */
    CalendarCellAlignment["Center"] = "Center";
})(CalendarCellAlignment || (CalendarCellAlignment = {}));
export class DateRange {
    constructor(startDate, endDate) {
        this._startDate = startDate;
        this._endDate = endDate;
        this.normalize();
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        this._startDate = value;
    }
    get endDate() {
        return this._endDate;
    }
    set endDate(value) {
        this._endDate = value;
    }
    toString() {
        return this.startDate + ' - ' + this.endDate;
    }
    normalize() {
        if (this._endDate < this._startDate) {
            let temp = this._endDate;
            this._endDate = this._startDate;
            this._startDate = temp;
        }
    }
}
export class CalendarEvent {
    constructor(title, startDate, endDate, isAllDay, eventColor) {
        this.title = title;
        this.endDate = endDate;
        this.startDate = startDate;
        if (isAllDay) {
            this.isAllDay = isAllDay;
        }
        if (eventColor) {
            this.eventColor = eventColor;
        }
    }
    get android() {
        return undefined;
    }
    get ios() {
        return undefined;
    }
    get title() {
        return this._getTitle();
    }
    set title(value) {
        this._setTitle(value);
    }
    get startDate() {
        return this._getStartDate();
    }
    set startDate(value) {
        this._setStartDate(value);
    }
    get endDate() {
        return this._getEndDate();
    }
    set endDate(value) {
        this._setEndDate(value);
    }
    set isAllDay(value) {
        this._setIsAllDay(value);
    }
    get isAllDay() {
        return this._getIsAllDay();
    }
    set eventColor(value) {
        this._setEventColor(value);
    }
    get eventColor() {
        return this._getEventColor();
    }
    _setIsAllDay(value) { }
    _getIsAllDay() {
        return false;
    }
    _setEndDate(date) { }
    _getEndDate() {
        return undefined;
    }
    _setStartDate(date) { }
    _getStartDate() {
        return undefined;
    }
    _setTitle(value) { }
    _getTitle() {
        return undefined;
    }
    _setEventColor(value) { }
    _getEventColor() {
        return undefined;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
// <EventDataDefinitions>
export class CalendarViewModeChangedEventData {
}
export class CalendarCellTapEventData {
}
export class CalendarSelectionEventData {
}
export class CalendarInlineEventSelectedData {
}
export class CalendarDayViewEventSelectedData {
}
export class CalendarNavigationEventData {
}
export class CalendarMonthViewStyle extends ViewBase {
    updateViewStyles(forceUpdate) { }
    onSelectionShapePropertyChanged(oldValue, newValue) {
        this.onSelectionShapeChanged(oldValue, newValue);
    }
    onSelectionShapeChanged(oldValue, newValue) { }
    onSelectionShapeSizePropertyChanged(oldValue, newValue) {
        this.onSelectionShapeSizeChanged(oldValue, newValue);
    }
    onSelectionShapeSizeChanged(oldValue, newValue) { }
    onSelectionShapeColorPropertyChanged(oldValue, newValue) {
        this.onSelectionShapeColorChanged(oldValue, newValue);
    }
    onSelectionShapeColorChanged(oldValue, newValue) { }
    onShowWeekNumbersPropertyChanged(oldValue, newValue) {
        this.onShowWeekNumbersChanged(oldValue, newValue);
    }
    onShowWeekNumbersChanged(oldValue, newValue) { }
    onShowTitlePropertyChanged(oldValue, newValue) {
        this.onShowTitleChanged(oldValue, newValue);
    }
    onShowTitleChanged(oldValue, newValue) { }
    onShowDayNamesPropertyChanged(oldValue, newValue) {
        this.onShowDayNamesChanged(oldValue, newValue);
    }
    onShowDayNamesChanged(oldValue, newValue) { }
    onCellBackgroundColorPropertyChanged(oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    }
    onBackgroundColorChanged(oldValue, newValue) { }
    onDayCellStylePropertyChanged(oldValue, newValue) {
        this.onDayCellStyleChanged(oldValue, newValue);
    }
    onDayCellStyleChanged(oldValue, newValue) { }
    onSelectedDayCellStylePropertyChanged(oldValue, newValue) {
        this.onSelectedDayCellStyleChanged(oldValue, newValue);
    }
    onSelectedDayCellStyleChanged(oldValue, newValue) { }
    onTodayCellStylePropertyChanged(oldValue, newValue) {
        this.onTodayCellStyleChanged(oldValue, newValue);
    }
    onTodayCellStyleChanged(oldValue, newValue) { }
    onDisabledCellStylePropertyChanged(oldValue, newValue) {
        this.onDisabledCellStyleChanged(oldValue, newValue);
    }
    onDisabledCellStyleChanged(oldValue, newValue) { }
    onAnotherMonthCellStylePropertyChanged(oldValue, newValue) {
        this.onAnotherMonthCellStyleChanged(oldValue, newValue);
    }
    onAnotherMonthCellStyleChanged(oldValue, newValue) { }
    onDayNameCellStylePropertyChanged(oldValue, newValue) {
        this.onDayNameCellStyleChanged(oldValue, newValue);
    }
    onDayNameCellStyleChanged(oldValue, newValue) { }
    onWeekNumberCellStylePropertyChanged(oldValue, newValue) {
        this.onWeekNumberCellStyleChanged(oldValue, newValue);
    }
    onWeekNumberCellStyleChanged(oldValue, newValue) { }
    onWeekendCellStylePropertyChanged(oldValue, newValue) {
        this.onWeekendCellStyleChanged(oldValue, newValue);
    }
    onWeekendCellStyleChanged(oldValue, newValue) { }
    onTitleCellStylePropertyChanged(oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    }
    onTitleCellStyleChanged(oldValue, newValue) { }
    onInlineEventCellStylePropertyChanged(oldValue, newValue) {
        this.onInlineEventCellStyleChanged(oldValue, newValue);
    }
    onInlineEventCellStyleChanged(oldValue, newValue) { }
}
CalendarMonthViewStyle.showWeekNumbersProperty = new Property({
    name: 'showWeekNumbers',
    defaultValue: undefined,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onShowWeekNumbersPropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.selectionShapeProperty = new Property({
    name: 'selectionShape',
    defaultValue: undefined,
    valueConverter: value => CalendarSelectionShape[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectionShapePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.selectionShapeSizeProperty = new Property({
    name: 'selectionShapeSize',
    defaultValue: 15,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectionShapeSizePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.selectionShapeColorProperty = new Property({
    name: 'selectionShapeColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectionShapeColorPropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.showTitleProperty = new Property({
    name: 'showTitle',
    defaultValue: undefined,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onShowTitlePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.showDayNamesProperty = new Property({
    name: 'showDayNames',
    defaultValue: undefined,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onShowDayNamesPropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.backgroundColorProperty = new Property({
    name: 'backgroundColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.dayCellStyleProperty = new Property({
    name: 'dayCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.selectedDayCellStyleProperty = new Property({
    name: 'selectedDayCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectedDayCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.todayCellStyleProperty = new Property({
    name: 'todayCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTodayCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.disabledCellStyleProperty = new Property({
    name: 'disabledCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDisabledCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.anotherMonthCellStyleProperty = new Property({
    name: 'anotherMonthCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onAnotherMonthCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.dayNameCellStyleProperty = new Property({
    name: 'dayNameCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayNameCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.weekNumberCellStyleProperty = new Property({
    name: 'weekNumberCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onWeekNumberCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.weekendCellStyleProperty = new Property({
    name: 'weekendCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onWeekendCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.titleCellStyleProperty = new Property({
    name: 'titleCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTitleCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.inlineEventCellStyleProperty = new Property({
    name: 'inlineEventCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onInlineEventCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthViewStyle.showWeekNumbersProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeSizeProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeColorProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.showTitleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.showDayNamesProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.backgroundColorProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.dayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectedDayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.todayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.dayNameCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.weekNumberCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.weekendCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.titleCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.inlineEventCellStyleProperty.register(CalendarMonthViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Week view mode
 */
export class CalendarWeekViewStyle extends CalendarMonthViewStyle {
}
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Day view mode
 */
export class CalendarDayViewStyle extends CalendarWeekViewStyle {
    onShowWeekPropertyChanged(oldValue, newValue) {
        this.onShowWeekChanged(oldValue, newValue);
    }
    onShowWeekChanged(oldValue, newValue) { }
    onDayEventsViewStylePropertyChanged(oldValue, newValue) {
        this.onDayEventsViewStyleChanged(oldValue, newValue);
    }
    onDayEventsViewStyleChanged(oldValue, newValue) { }
    onAllDayEventsViewStylePropertyChanged(oldValue, newValue) {
        this.onAllDayEventsViewStyleChanged(oldValue, newValue);
    }
    onAllDayEventsViewStyleChanged(oldValue, newValue) { }
}
CalendarDayViewStyle.showWeekProperty = new Property({
    name: 'showWeek',
    defaultValue: true,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onShowWeekPropertyChanged(oldValue, newValue);
    }
});
CalendarDayViewStyle.dayEventsViewStyleProperty = new Property({
    name: 'dayEventsViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayEventsViewStylePropertyChanged(oldValue, newValue);
    }
});
CalendarDayViewStyle.allDayEventsViewStyleProperty = new Property({
    name: 'allDayEventsViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onAllDayEventsViewStylePropertyChanged(oldValue, newValue);
    }
});
CalendarDayViewStyle.showWeekProperty.register(CalendarDayViewStyle);
CalendarDayViewStyle.dayEventsViewStyleProperty.register(CalendarDayViewStyle);
CalendarDayViewStyle.allDayEventsViewStyleProperty.register(CalendarDayViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Year view mode
 */
export class CalendarYearViewStyle extends ViewBase {
    onTitleCellStylePropertyChanged(oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    }
    onTitleCellStyleChanged(oldValue, newValue) { }
    onMonthCellStylePropertyChanged(oldValue, newValue) {
        this.onMonthCellStyleChanged(oldValue, newValue);
    }
    onMonthCellStyleChanged(oldValue, newValue) { }
}
CalendarYearViewStyle.titleCellStyleProperty = new Property({
    name: 'titleCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTitleCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarYearViewStyle.monthCellStyleProperty = new Property({
    name: 'monthCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarYearViewStyle.titleCellStyleProperty.register(CalendarYearViewStyle);
CalendarYearViewStyle.monthCellStyleProperty.register(CalendarYearViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for year view with month names only view mode
 */
export class CalendarMonthNamesViewStyle extends ViewBase {
    onTitleCellStylePropertyChanged(oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    }
    onTitleCellStyleChanged(oldValue, newValue) { }
    onMonthNameCellStylePropertyChanged(oldValue, newValue) {
        this.onMonthNameCellStyleChanged(oldValue, newValue);
    }
    onMonthNameCellStyleChanged(oldValue, newValue) { }
}
CalendarMonthNamesViewStyle.titleCellStyleProperty = new Property({
    name: 'titleCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTitleCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthNamesViewStyle.monthNameCellStyleProperty = new Property({
    name: 'monthNameCellStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNameCellStylePropertyChanged(oldValue, newValue);
    }
});
CalendarMonthNamesViewStyle.titleCellStyleProperty.register(CalendarMonthNamesViewStyle);
CalendarMonthNamesViewStyle.monthNameCellStyleProperty.register(CalendarMonthNamesViewStyle);
/**
 * The style class with customization properties for months in year view
 * Note: this class is not inherited from CellStyle
 */
export class MonthCellStyle extends ViewBase {
    onWeekendТextColorPropertyChanged(oldValue, newValue) {
        this.onWeekendTextColorChanged(oldValue, newValue);
    }
    onWeekendTextColorChanged(oldValue, newValue) { }
    onTodayТextColorPropertyChanged(oldValue, newValue) {
        this.onTodayTextColorChanged(oldValue, newValue);
    }
    onTodayTextColorChanged(oldValue, newValue) { }
    onDayТextColorPropertyChanged(oldValue, newValue) {
        this.onDayTextColorChanged(oldValue, newValue);
    }
    onDayTextColorChanged(oldValue, newValue) { }
    onDayFontNamePropertyChanged(oldValue, newValue) {
        this.onDayFontNameChanged(oldValue, newValue);
    }
    onDayFontNameChanged(oldValue, newValue) { }
    onDayFontStylePropertyChanged(oldValue, newValue) {
        this.onDayFontStyleChanged(oldValue, newValue);
    }
    onDayFontStyleChanged(oldValue, newValue) { }
    onDayTextSizePropertyChanged(oldValue, newValue) {
        this.onDayTextSizeChanged(oldValue, newValue);
    }
    onDayTextSizeChanged(oldValue, newValue) { }
    onDayNameТextColorPropertyChanged(oldValue, newValue) {
        this.onDayNameTextColorChanged(oldValue, newValue);
    }
    onDayNameTextColorChanged(oldValue, newValue) { }
    onDayNameFontNamePropertyChanged(oldValue, newValue) {
        this.onDayNameFontNameChanged(oldValue, newValue);
    }
    onDayNameFontNameChanged(oldValue, newValue) { }
    onDayNameFontStylePropertyChanged(oldValue, newValue) {
        this.onDayNameFontStyleChanged(oldValue, newValue);
    }
    onDayNameFontStyleChanged(oldValue, newValue) { }
    onDayNameTextSizePropertyChanged(oldValue, newValue) {
        this.onDayNameTextSizeChanged(oldValue, newValue);
    }
    onDayNameTextSizeChanged(oldValue, newValue) { }
    onMonthNameТextColorPropertyChanged(oldValue, newValue) {
        this.onMonthNameTextColorChanged(oldValue, newValue);
    }
    onMonthNameTextColorChanged(oldValue, newValue) { }
    onMonthNameFontNamePropertyChanged(oldValue, newValue) {
        this.onMonthNameFontNameChanged(oldValue, newValue);
    }
    onMonthNameFontNameChanged(oldValue, newValue) { }
    onMonthNameFontStylePropertyChanged(oldValue, newValue) {
        this.onMonthNameFontStyleChanged(oldValue, newValue);
    }
    onMonthNameFontStyleChanged(oldValue, newValue) { }
    onMonthNameTextSizePropertyChanged(oldValue, newValue) {
        this.onMonthNameTextSizeChanged(oldValue, newValue);
    }
    onMonthNameTextSizeChanged(oldValue, newValue) { }
}
MonthCellStyle.weekendTextColorProperty = new Property({
    name: 'weekendTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onWeekendТextColorPropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.todayTextColorProperty = new Property({
    name: 'todayTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onTodayТextColorPropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayTextColorProperty = new Property({
    name: 'dayTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onDayТextColorPropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayFontNameProperty = new Property({
    name: 'dayFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayFontNamePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayFontStyleProperty = new Property({
    name: 'dayFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onDayFontStylePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayTextSizeProperty = new Property({
    name: 'dayTextSize',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayTextSizePropertyChanged(oldValue, newValue);
    }
});
// Day name properties
MonthCellStyle.dayNameTextColorProperty = new Property({
    name: 'dayNameTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onDayNameТextColorPropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayNameFontNameProperty = new Property({
    name: 'dayNameFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayNameFontNamePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayNameFontStyleProperty = new Property({
    name: 'dayNameFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onDayNameFontStylePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.dayNameTextSizeProperty = new Property({
    name: 'dayNameTextSize',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayNameTextSizePropertyChanged(oldValue, newValue);
    }
});
/// Month name properties
MonthCellStyle.monthNameTextColorProperty = new Property({
    name: 'monthNameTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNameТextColorPropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.monthNameFontNameProperty = new Property({
    name: 'monthNameFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNameFontNamePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.monthNameFontStyleProperty = new Property({
    name: 'monthNameFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNameFontStylePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.monthNameTextSizeProperty = new Property({
    name: 'monthNameTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNameTextSizePropertyChanged(oldValue, newValue);
    }
});
MonthCellStyle.weekendTextColorProperty.register(MonthCellStyle);
MonthCellStyle.todayTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayFontNameProperty.register(MonthCellStyle);
MonthCellStyle.dayFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.dayTextSizeProperty.register(MonthCellStyle);
MonthCellStyle.dayNameTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayNameFontNameProperty.register(MonthCellStyle);
MonthCellStyle.dayNameFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.dayNameTextSizeProperty.register(MonthCellStyle);
MonthCellStyle.monthNameTextColorProperty.register(MonthCellStyle);
MonthCellStyle.monthNameFontNameProperty.register(MonthCellStyle);
MonthCellStyle.monthNameFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.monthNameTextSizeProperty.register(MonthCellStyle);
////////////////////////////////////////////////
/// Cell styles
// properties left to implement but available only in iOS :  shapeStroke , shapeFill, shape
export class CellStyle extends ViewBase {
    // @ts-ignore
    get ios() {
        return undefined;
    }
    // @ts-ignore
    get android() {
        return undefined;
    }
    onCellBorderWidthPropertyChanged(oldValue, newValue) {
        this.onCellBorderWidthChanged(oldValue, newValue);
    }
    onCellBorderWidthChanged(oldValue, newValue) { }
    onCellBorderColorPropertyChanged(oldValue, newValue) {
        this.onCellBorderColorChanged(oldValue, newValue);
    }
    onCellBorderColorChanged(oldValue, newValue) { }
    onCellBackgroundColorPropertyChanged(oldValue, newValue) {
        this.onCellBackgroundColorChanged(oldValue, newValue);
    }
    onCellBackgroundColorChanged(oldValue, newValue) { }
    onCellAlignmentPropertyChanged(oldValue, newValue) {
        this.onCellAlignmentChanged(oldValue, newValue);
    }
    onCellAlignmentChanged(oldValue, newValue) { }
    onCellТextColorPropertyChanged(oldValue, newValue) {
        this.onCellTextColorChanged(oldValue, newValue);
    }
    onCellTextColorChanged(oldValue, newValue) { }
    onCellTextFontNamePropertyChanged(oldValue, newValue) {
        this.onCellTextFontNameChanged(oldValue, newValue);
    }
    onCellTextFontNameChanged(oldValue, newValue) { }
    onCellTextFontStylePropertyChanged(oldValue, newValue) {
        this.onCellTextFontStyleChanged(oldValue, newValue);
    }
    onCellTextFontStyleChanged(oldValue, newValue) { }
    onCellTextSizePropertyChanged(oldValue, newValue) {
        this.onCellTextSizeChanged(oldValue, newValue);
    }
    onCellTextSizeChanged(oldValue, newValue) { }
    onCellPaddingHorizontalPropertyChanged(oldValue, newValue) {
        this.onCellPaddingHorizontalChanged(oldValue, newValue);
    }
    onCellPaddingHorizontalChanged(oldValue, newValue) { }
    onCellPaddingVerticalPropertyChanged(oldValue, newValue) {
        this.onCellPaddingVerticalChanged(oldValue, newValue);
    }
    onCellPaddingVerticalChanged(oldValue, newValue) { }
}
CellStyle.cellBorderWidthProperty = new Property({
    name: 'cellBorderWidth',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellBorderWidthPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellBorderColorProperty = new Property({
    name: 'cellBorderColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onCellBorderColorPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellBackgroundColorProperty = new Property({
    name: 'cellBackgroundColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellAlignmentProperty = new Property({
    name: 'cellAlignment',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellAlignmentPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellTextColorProperty = new Property({
    name: 'cellTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onCellТextColorPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellTextFontNameProperty = new Property({
    name: 'cellTextFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellTextFontNamePropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellTextFontStyleProperty = new Property({
    name: 'cellTextFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onCellTextFontStylePropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellTextSizeProperty = new Property({
    name: 'cellTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellTextSizePropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellPaddingHorizontalProperty = new Property({
    name: 'cellPaddingHorizontal',
    defaultValue: undefined,
    valueConverter: parseInt,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellPaddingHorizontalPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellPaddingVerticalProperty = new Property({
    name: 'cellPaddingVertical',
    defaultValue: undefined,
    valueConverter: parseInt,
    valueChanged: (target, oldValue, newValue) => {
        target.onCellPaddingVerticalPropertyChanged(oldValue, newValue);
    }
});
CellStyle.cellBorderWidthProperty.register(CellStyle);
CellStyle.cellBorderColorProperty.register(CellStyle);
CellStyle.cellBackgroundColorProperty.register(CellStyle);
CellStyle.cellAlignmentProperty.register(CellStyle);
CellStyle.cellTextColorProperty.register(CellStyle);
CellStyle.cellTextFontNameProperty.register(CellStyle);
CellStyle.cellTextFontStyleProperty.register(CellStyle);
CellStyle.cellTextSizeProperty.register(CellStyle);
CellStyle.cellPaddingHorizontalProperty.register(CellStyle);
CellStyle.cellPaddingVerticalProperty.register(CellStyle);
////////////////////////////////////////////////
/// Day Events View style
export class DayEventsViewStyle extends ViewBase {
    // @ts-ignore
    get ios() {
        return undefined;
    }
    // @ts-ignore
    get android() {
        return undefined;
    }
    onBackgroundColorPropertyChanged(oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    }
    onBackgroundColorChanged(oldValue, newValue) { }
    onTimeLabelFormatPropertyChanged(oldValue, newValue) {
        this.onTimeLabelFormatChanged(oldValue, newValue);
    }
    onTimeLabelFormatChanged(oldValue, newValue) { }
    onTimeLabelTextColorPropertyChanged(oldValue, newValue) {
        this.onTimeLabelTextColorChanged(oldValue, newValue);
    }
    onTimeLabelTextColorChanged(oldValue, newValue) { }
    onTimeLabelFontNamePropertyChanged(oldValue, newValue) {
        this.onTimeLabelFontNameChanged(oldValue, newValue);
    }
    onTimeLabelFontNameChanged(oldValue, newValue) { }
    onTimeLabelFontStylePropertyChanged(oldValue, newValue) {
        this.onTimeLabelFontStyleChanged(oldValue, newValue);
    }
    onTimeLabelFontStyleChanged(oldValue, newValue) { }
    onTimeLabelTextSizePropertyChanged(oldValue, newValue) {
        this.onTimeLabelTextSizeChanged(oldValue, newValue);
    }
    onTimeLabelTextSizeChanged(oldValue, newValue) { }
    onTimeLinesWidthPropertyChanged(oldValue, newValue) {
        this.onTimeLinesWidthChanged(oldValue, newValue);
    }
    onTimeLinesWidthChanged(oldValue, newValue) { }
    onTimeLinesColorPropertyChanged(oldValue, newValue) {
        this.onTimeLinesColorChanged(oldValue, newValue);
    }
    onTimeLinesColorChanged(oldValue, newValue) { }
}
DayEventsViewStyle.backgroundColorProperty = new Property({
    name: 'backgroundColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onBackgroundColorPropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLabelFormatProperty = new Property({
    name: 'timeLabelFormat',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLabelFormatPropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLabelTextColorProperty = new Property({
    name: 'timeLabelTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLabelTextColorPropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLabelFontNameProperty = new Property({
    name: 'timeLabelFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLabelFontNamePropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLabelFontStyleProperty = new Property({
    name: 'timeLabelFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLabelFontStylePropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLabelTextSizeProperty = new Property({
    name: 'timeLabelTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLabelTextSizePropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLinesWidthProperty = new Property({
    name: 'timeLinesWidth',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLinesWidthPropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.timeLinesColorProperty = new Property({
    name: 'timeLinesColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeLinesColorPropertyChanged(oldValue, newValue);
    }
});
DayEventsViewStyle.backgroundColorProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFormatProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelTextColorProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFontNameProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFontStyleProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelTextSizeProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLinesWidthProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLinesColorProperty.register(DayEventsViewStyle);
////////////////////////////////////////////////
/// All Day View style
export class AllDayEventsViewStyle extends ViewBase {
    // @ts-ignore
    get ios() {
        return undefined;
    }
    // @ts-ignore
    get android() {
        return undefined;
    }
    onBackgroundColorPropertyChanged(oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    }
    onBackgroundColorChanged(oldValue, newValue) { }
    onAllDayTextPropertyChanged(oldValue, newValue) {
        this.onAllDayTextChanged(oldValue, newValue);
    }
    onAllDayTextChanged(oldValue, newValue) { }
    onAllDayTextIsVisiblePropertyChanged(oldValue, newValue) {
        this.onAlDayTextIsVisibleChanged(oldValue, newValue);
    }
    onAlDayTextIsVisibleChanged(oldValue, newValue) { }
}
AllDayEventsViewStyle.ALL_DAY_TEXT = 'ALL-DAY';
AllDayEventsViewStyle.backgroundColorProperty = new Property({
    name: 'backgroundColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onBackgroundColorPropertyChanged(oldValue, newValue);
    }
});
AllDayEventsViewStyle.allDayTextProperty = new Property({
    name: 'allDayText',
    defaultValue: AllDayEventsViewStyle.ALL_DAY_TEXT,
    valueChanged: (target, oldValue, newValue) => {
        target.onAllDayTextPropertyChanged(oldValue, newValue);
    }
});
AllDayEventsViewStyle.allDayTextIsVisibleProperty = new Property({
    name: 'allDayTextIsVisible',
    defaultValue: undefined,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onAllDayTextIsVisiblePropertyChanged(oldValue, newValue);
    }
});
AllDayEventsViewStyle.backgroundColorProperty.register(AllDayEventsViewStyle);
AllDayEventsViewStyle.allDayTextProperty.register(AllDayEventsViewStyle);
AllDayEventsViewStyle.allDayTextIsVisibleProperty.register(AllDayEventsViewStyle);
////////////////////////////////////////////////////////////////////////////////////////////////////
//  DayCellStyle
////////////////////////////////////////////////////////////////////////////////////////////////////
// properties available in ios only: allDayEventTextColor, eventAlignment, eventSpacing, eventShape, eventOrientation, stretchEvents, maxEventsCount, wrapEventText
export class DayCellStyle extends CellStyle {
    onShowEventsTextPropertyChanged(oldValue, newValue) {
        this.onShowEventsTextChanged(oldValue, newValue);
    }
    onShowEventsTextChanged(oldValue, newValue) { }
    onEventTextColorPropertyChanged(oldValue, newValue) {
        this.onEventTextColorChanged(oldValue, newValue);
    }
    onEventTextColorChanged(oldValue, newValue) { }
    onEventFontNamePropertyChanged(oldValue, newValue) {
        this.onEventFontNameChanged(oldValue, newValue);
    }
    onEventFontNameChanged(oldValue, newValue) { }
    onEventFontStylePropertyChanged(oldValue, newValue) {
        this.onEventFontStyleChanged(oldValue, newValue);
    }
    onEventFontStyleChanged(oldValue, newValue) { }
    onEventTextSizePropertyChanged(oldValue, newValue) {
        this.onEventTextSizeChanged(oldValue, newValue);
    }
    onEventTextSizeChanged(oldValue, newValue) { }
}
DayCellStyle.showEventsTextProperty = new Property({
    name: 'showEventsText',
    defaultValue: undefined,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onShowEventsTextPropertyChanged(oldValue, newValue);
    }
});
DayCellStyle.eventTextColorProperty = new Property({
    name: 'eventTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onEventTextColorPropertyChanged(oldValue, newValue);
    }
});
DayCellStyle.eventFontNameProperty = new Property({
    name: 'eventFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onEventFontNamePropertyChanged(oldValue, newValue);
    }
});
DayCellStyle.eventFontStyleProperty = new Property({
    name: 'eventFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onEventFontStylePropertyChanged(oldValue, newValue);
    }
});
DayCellStyle.eventTextSizeProperty = new Property({
    name: 'eventTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onEventTextSizePropertyChanged(oldValue, newValue);
    }
});
DayCellStyle.showEventsTextProperty.register(DayCellStyle);
DayCellStyle.eventTextColorProperty.register(DayCellStyle);
DayCellStyle.eventFontNameProperty.register(DayCellStyle);
DayCellStyle.eventFontStyleProperty.register(DayCellStyle);
DayCellStyle.eventTextSizeProperty.register(DayCellStyle);
/**
 * Cell style class for inline events cells in month view
 */
// missing for ios: separatorColor & shape size
export class InlineEventCellStyle extends ViewBase {
    onCellBackgroundColorPropertyChanged(oldValue, newValue) {
        this.onCellBackgroundColorChanged(oldValue, newValue);
    }
    onCellBackgroundColorChanged(oldValue, newValue) { }
    onEventTextColorPropertyChanged(oldValue, newValue) {
        this.onEventTextColorChanged(oldValue, newValue);
    }
    onEventTextColorChanged(oldValue, newValue) { }
    onEventFontNamePropertyChanged(oldValue, newValue) {
        this.onEventFontNameChanged(oldValue, newValue);
    }
    onEventFontNameChanged(oldValue, newValue) { }
    onEventFontStylePropertyChanged(oldValue, newValue) {
        this.onEventFontStyleChanged(oldValue, newValue);
    }
    onEventFontStyleChanged(oldValue, newValue) { }
    onEventTextSizePropertyChanged(oldValue, newValue) {
        this.onEventTextSizeChanged(oldValue, newValue);
    }
    onEventTextSizeChanged(oldValue, newValue) { }
    onTimeTextColorPropertyChanged(oldValue, newValue) {
        this.onTimeTextColorChanged(oldValue, newValue);
    }
    onTimeTextColorChanged(oldValue, newValue) { }
    onTimeFontNamePropertyChanged(oldValue, newValue) {
        this.onTimeFontNameChanged(oldValue, newValue);
    }
    onTimeFontNameChanged(oldValue, newValue) { }
    onTimeFontStylePropertyChanged(oldValue, newValue) {
        this.onTimeFontStyleChanged(oldValue, newValue);
    }
    onTimeFontStyleChanged(oldValue, newValue) { }
    onTimeTextSizePropertyChanged(oldValue, newValue) {
        this.onTimeTextSizeChanged(oldValue, newValue);
    }
    onTimeTextSizeChanged(oldValue, newValue) { }
}
InlineEventCellStyle.cellBackgroundColorProperty = new Property({
    name: 'cellBackgroundColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.eventTextColorProperty = new Property({
    name: 'eventTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onEventTextColorPropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.eventFontNameProperty = new Property({
    name: 'eventFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onEventFontNamePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.eventFontStyleProperty = new Property({
    name: 'eventFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onEventFontStylePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.eventTextSizeProperty = new Property({
    name: 'eventTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onEventTextSizePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.timeTextColorProperty = new Property({
    name: 'timeTextColor',
    defaultValue: undefined,
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v),
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeTextColorPropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.timeFontNameProperty = new Property({
    name: 'timeFontName',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeFontNamePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.timeFontStyleProperty = new Property({
    name: 'timeFontStyle',
    defaultValue: undefined,
    valueConverter: value => CalendarFontStyle[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeFontStylePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.timeTextSizeProperty = new Property({
    name: 'timeTextSize',
    defaultValue: undefined,
    valueConverter: parseFloat,
    valueChanged: (target, oldValue, newValue) => {
        target.onTimeTextSizePropertyChanged(oldValue, newValue);
    }
});
InlineEventCellStyle.cellBackgroundColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventTextColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventFontNameProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventFontStyleProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventTextSizeProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeTextColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeFontNameProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeFontStyleProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeTextSizeProperty.register(InlineEventCellStyle);
////////////////////////////////////////////////////////////////////////////////////////////////////
export class RadCalendar extends View {
    constructor() {
        super(...arguments);
        this._silentSelectionUpdate = false;
    }
    onLocalePropertyChanged(oldValue, newValue) { }
    onMinDatePropertyChanged(oldValue, newValue) {
        this.onMinDateChanged(oldValue, newValue);
    }
    onMaxDatePropertyChanged(oldValue, newValue) {
        this.onMaxDateChanged(oldValue, newValue);
    }
    onSelectedDatePropertyChanged(oldValue, newValue) {
        if (this._silentSelectionUpdate) {
            return;
        }
        if (this.selectionMode !== CalendarSelectionMode.Single) {
            console.log(this.getSelectionWarningInfo('selectedDate'));
            return;
        }
        this.onSelectedDateChanged(oldValue, newValue);
    }
    onSelectedDatesPropertyChanged(oldValue, newValue) {
        if (this._silentSelectionUpdate) {
            return;
        }
        if (this.selectionMode !== CalendarSelectionMode.Multiple) {
            console.log(this.getSelectionWarningInfo('selectedDates'));
            return;
        }
        this.onSelectedDatesChanged(oldValue, newValue);
    }
    onSelectedDateRangePropertyChanged(oldValue, newValue) {
        if (this._silentSelectionUpdate) {
            return;
        }
        if (this.selectionMode !== CalendarSelectionMode.Range) {
            console.log(this.getSelectionWarningInfo('selectedDateRange'));
            return;
        }
        this.onSelectedDateRangeChanged(oldValue, newValue);
    }
    onViewModePropertyChanged(oldValue, newValue) {
        this.onViewModeChanged(oldValue, newValue);
    }
    onEventsViewModePropertyChanged(oldValue, newValue) {
        this.onEventsViewModeChanged(oldValue, newValue);
    }
    onSelectionModePropertyChanged(oldValue, newValue) {
        this.onSelectionModeChanged(oldValue, newValue);
    }
    onTransitionModePropertyChanged(oldValue, newValue) {
        this.onTransitionModeChanged(oldValue, newValue);
    }
    onDisplayedDatePropertyChanged(oldValue, newValue) {
        this.onDisplayedDateChanged(oldValue, newValue);
    }
    onEventSourcePropertyChanged(oldValue, newValue) {
        this.onEventSourceChanged(oldValue, newValue);
    }
    onHorizontalTransitionPropertyChanged(oldValue, newValue) {
        this.onHorizontalTransitionChanged(oldValue, newValue);
    }
    onMonthViewStylePropertyChanged(oldValue, newValue) {
        this.onMonthViewStyleChanged(oldValue, newValue);
    }
    onWeekViewStylePropertyChanged(oldValue, newValue) {
        this.onWeekViewStyleChanged(oldValue, newValue);
    }
    onDayViewStylePropertyChanged(oldValue, newValue) {
        this.onDayViewStyleChanged(oldValue, newValue);
    }
    onYearViewStylePropertyChanged(oldValue, newValue) {
        this.onYearViewStyleChanged(oldValue, newValue);
    }
    onMonthNamesViewStylePropertyChanged(oldValue, newValue) {
        this.onMonthNamesViewStyleChanged(oldValue, newValue);
    }
    reload() { }
    navigateForward() { }
    navigateBack() { }
    goToDate(date) { }
    getEventsForDate(date) {
        return undefined;
    }
    getSelectedDatesList() {
        let current = this.selectedDates;
        if (typeof this.selectedDates === 'string') {
            current = this.selectedDates.split(',');
        }
        return current;
    }
    _addSelectedDate(date) {
        let newSelection = new Array();
        if (this.selectedDates) {
            let currentSelection = this.getSelectedDatesList();
            for (let i = 0; i < currentSelection.length; i++) {
                let selectedDate = currentSelection[i];
                newSelection.push(selectedDate);
                if (RadCalendar.areDatesSame(selectedDate, date)) {
                    return;
                }
            }
        }
        newSelection.push(date);
        this.selectedDates = newSelection;
    }
    _removeSelectedDate(date) {
        let newSelection = new Array();
        if (this.selectedDates) {
            let currentSelection = this.getSelectedDatesList();
            for (let i = 0; i < currentSelection.length; i++) {
                let selectedDate = currentSelection[i];
                if (!RadCalendar.areDatesSame(selectedDate, date)) {
                    newSelection.push(selectedDate);
                }
            }
            this.selectedDates = newSelection;
        }
    }
    clearSelection() {
        this._silentSelectionUpdate = true;
        if (this.selectedDate !== undefined) {
            this.selectedDate = null;
        }
        if (this.selectedDates !== undefined) {
            this.selectedDates = null;
        }
        if (this.selectedDateRange !== undefined) {
            this.selectedDateRange = null;
        }
        this._silentSelectionUpdate = false;
    }
    onEventSourceChanged(oldValue, newValue) {
        this.updateEventSource();
        if (oldValue instanceof Observable) {
            removeWeakEventListener(oldValue, ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
        if (newValue instanceof Observable) {
            addWeakEventListener(newValue, ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
    }
    EventSourceChangedInternal(data) {
        this.updateEventSource();
    }
    getSelectionWarningInfo(propertyUsed) {
        let recommendedProperty;
        switch (this.selectionMode) {
            case CalendarSelectionMode.Single:
                recommendedProperty = 'selectedDate';
                break;
            case CalendarSelectionMode.Multiple:
                recommendedProperty = 'selectedDates';
                break;
            case CalendarSelectionMode.Range:
                recommendedProperty = 'selectedDateRange';
                break;
            case CalendarSelectionMode.None:
                return `Error setting ${propertyUsed}: Selection can't be changed when selectionMode is None.`;
        }
        return `Error setting ${propertyUsed}: Selection should be changed through ${recommendedProperty}, when calendarSelectionMode is ${this.selectionMode}.`;
    }
    updateEventSource() { }
    static areDatesSame(date1, date2) {
        if (date1 === null && date2 === null) {
            return true;
        }
        if (date1 === null || date2 === null) {
            return false;
        }
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }
    onDisplayedDateChanged(oldValue, newValue) { }
    onSelectionModeChanged(oldValue, newValue) { }
    onTransitionModeChanged(oldValue, newValue) { }
    onViewModeChanged(oldValue, newValue) { }
    onEventsViewModeChanged(oldValue, newValue) { }
    onSelectedDateRangeChanged(oldValue, newValue) { }
    onSelectedDatesChanged(oldValue, newValue) { }
    onSelectedDateChanged(oldValue, newValue) { }
    onMaxDateChanged(oldValue, newValue) { }
    onMinDateChanged(oldValue, newValue) { }
    onHorizontalTransitionChanged(oldValue, newValue) { }
    onMonthViewStyleChanged(oldValue, newValue) { }
    onWeekViewStyleChanged(oldValue, newValue) { }
    onDayViewStyleChanged(oldValue, newValue) { }
    onYearViewStyleChanged(oldValue, newValue) { }
    onMonthNamesViewStyleChanged(oldValue, newValue) { }
}
// public static dateSelectingEvent : string = "dateSelecting";
RadCalendar.dateSelectedEvent = 'dateSelected';
RadCalendar.dateDeselectedEvent = 'dateDeselected';
RadCalendar.cellTapEvent = 'cellTap';
RadCalendar.inlineEventSelectedEvent = 'inlineEventSelected';
RadCalendar.dayViewEventSelectedEvent = 'dayViewEventSelected';
RadCalendar.navigatedToDateEvent = 'navigatedToDate';
RadCalendar.navigatingToDateStartedEvent = 'navigatingToDateStarted';
RadCalendar.viewModeChangedEvent = 'viewModeChanged';
RadCalendar.localeProperty = new Property({
    name: 'locale',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onLocalePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.minDateProperty = new Property({
    name: 'minDate',
    defaultValue: undefined,
    equalityComparer: (x, y) => x <= y && x >= y,
    valueConverter: value => new Date(value),
    valueChanged: (target, oldValue, newValue) => {
        target.onMinDatePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.maxDateProperty = new Property({
    name: 'maxDate',
    defaultValue: undefined,
    equalityComparer: (x, y) => x <= y && x >= y,
    valueConverter: value => new Date(value),
    valueChanged: (target, oldValue, newValue) => {
        target.onMaxDatePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.selectedDateProperty = new Property({
    name: 'selectedDate',
    defaultValue: undefined,
    equalityComparer: (x, y) => x <= y && x >= y,
    valueConverter: value => new Date(value),
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectedDatePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.selectedDatesProperty = new Property({
    name: 'selectedDates',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectedDatesPropertyChanged(oldValue, newValue);
    }
});
RadCalendar.selectedDateRangeProperty = new Property({
    name: 'selectedDateRange',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectedDateRangePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.viewModeProperty = new Property({
    name: 'viewMode',
    defaultValue: CalendarViewMode.Month,
    valueConverter: value => CalendarViewMode[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onViewModePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.eventsViewModeProperty = new Property({
    name: 'eventsViewMode',
    defaultValue: CalendarEventsViewMode.None,
    valueConverter: value => CalendarEventsViewMode[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onEventsViewModePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.selectionModeProperty = new Property({
    name: 'selectionMode',
    defaultValue: CalendarSelectionMode.Single,
    valueConverter: value => CalendarSelectionMode[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onSelectionModePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.transitionModeProperty = new Property({
    name: 'transitionMode',
    defaultValue: CalendarTransitionMode.Slide,
    valueConverter: value => CalendarTransitionMode[value],
    valueChanged: (target, oldValue, newValue) => {
        target.onTransitionModePropertyChanged(oldValue, newValue);
    }
});
// Perhaps currentDate would be a better name for this :/
RadCalendar.displayedDateProperty = new Property({
    name: 'displayedDate',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDisplayedDatePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.eventSourceProperty = new Property({
    name: 'eventSource',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onEventSourcePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.horizontalTransitionProperty = new Property({
    name: 'horizontalTransition',
    defaultValue: true,
    valueConverter: booleanConverter,
    valueChanged: (target, oldValue, newValue) => {
        target.onHorizontalTransitionPropertyChanged(oldValue, newValue);
    }
});
RadCalendar.monthViewStyleProperty = new Property({
    name: 'monthViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthViewStylePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.weekViewStyleProperty = new Property({
    name: 'weekViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onWeekViewStylePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.dayViewStyleProperty = new Property({
    name: 'dayViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onDayViewStylePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.yearViewStyleProperty = new Property({
    name: 'yearViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onYearViewStylePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.monthNamesViewStyleProperty = new Property({
    name: 'monthNamesViewStyle',
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.onMonthNamesViewStylePropertyChanged(oldValue, newValue);
    }
});
RadCalendar.localeProperty.register(RadCalendar);
RadCalendar.minDateProperty.register(RadCalendar);
RadCalendar.maxDateProperty.register(RadCalendar);
RadCalendar.selectedDateProperty.register(RadCalendar);
RadCalendar.selectedDatesProperty.register(RadCalendar);
RadCalendar.selectedDateRangeProperty.register(RadCalendar);
RadCalendar.viewModeProperty.register(RadCalendar);
RadCalendar.eventsViewModeProperty.register(RadCalendar);
RadCalendar.selectionModeProperty.register(RadCalendar);
RadCalendar.transitionModeProperty.register(RadCalendar);
RadCalendar.displayedDateProperty.register(RadCalendar);
RadCalendar.eventSourceProperty.register(RadCalendar);
RadCalendar.horizontalTransitionProperty.register(RadCalendar);
RadCalendar.monthViewStyleProperty.register(RadCalendar);
RadCalendar.weekViewStyleProperty.register(RadCalendar);
RadCalendar.yearViewStyleProperty.register(RadCalendar);
RadCalendar.dayViewStyleProperty.register(RadCalendar);
RadCalendar.monthNamesViewStyleProperty.register(RadCalendar);
//# sourceMappingURL=common.js.map