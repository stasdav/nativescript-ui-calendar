import { Color, Utils, Application, ObservableArray, Enums } from '@nativescript/core';
import * as commonModule from './common';

// Custom non-working days configuration (API compatibility with iOS)
// Note: On Android, weekend detection is handled natively and custom non-working days
// require native code modifications. This API is provided for code compatibility.
let _customNonWorkingDaysConfig = null;

export function setCustomNonWorkingDays(config) {
    _customNonWorkingDaysConfig = config;
    // Note: On Android, this configuration is not used for weekend styling
    // as the native component handles weekend detection internally.
    // To fully support custom non-working days on Android, native code changes are required.
}

function isCustomNonWorkingDay(date) {
    try {
        if (!_customNonWorkingDaysConfig || !date) return false;

        let jsDate = date;
        if (typeof date === 'number') {
            jsDate = new Date(date);
        }

        const weekday = jsDate.getDay(); // 0=Sun ... 6=Sat

        if (_customNonWorkingDaysConfig.iso_weekday_ids) {
            if (!_customNonWorkingDaysConfig.iso_weekday_ids.includes(weekday)) {
                return true;
            }
        }

        const year = jsDate.getFullYear();
        const month = String(jsDate.getMonth() + 1).padStart(2, '0');
        const day = String(jsDate.getDate()).padStart(2, '0');
        const ymd = `${year}-${month}-${day}`;

        if (_customNonWorkingDaysConfig.days_off?.includes(ymd)) return true;
        if (_customNonWorkingDaysConfig.holidays?.includes(ymd)) return true;

        return false;
    } catch (e) {
        return false;
    }
}

function getSdkApiLevel() {
    return android.os.Build.VERSION.SDK_INT;
}
export * from './common';
export class CalendarEvent extends commonModule.CalendarEvent {
    get android() {
        if (!this._android) {
            this._android = new com.telerik.widget.calendar.events.Event('default', new Date(1990, 0, 1).getTime(), new Date(1990, 0, 2).getTime());
        }
        return this._android;
    }
    _setIsAllDay(value) {
        this.android.setAllDay(value);
    }
    _getIsAllDay() {
        return this.android.isAllDay();
    }
    _setEndDate(date) {
        this.android.setEndDate(date.getTime());
    }
    _getEndDate() {
        return new Date(this.android.getEndDate());
    }
    _setStartDate(date) {
        this.android.setStartDate(date.getTime());
    }
    _getStartDate() {
        return new Date(this.android.getStartDate());
    }
    _setTitle(value) {
        this.android.setTitle(value);
    }
    _getTitle() {
        return this.android.getTitle();
    }
    _setEventColor(value) {
        this.android.setEventColor(value.argb);
    }
    _getEventColor() {
        return new Color(this.android.getEventColor());
    }
}
/**
 * Helper methods
 */
class Tool {
    static createTypeface(name, style) {
        let fontStyle = android.graphics.Typeface.NORMAL;
        if (style) {
            switch (style) {
                case commonModule.CalendarFontStyle.Bold:
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case commonModule.CalendarFontStyle.Italic:
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case commonModule.CalendarFontStyle.BoldItalic:
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
            }
        }
        if (name) {
            return android.graphics.Typeface.create(name, fontStyle);
        }
        return android.graphics.Typeface.create(android.graphics.Typeface.DEFAULT, fontStyle);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum values identify to what type of cells is related the style object
 */
export var CellStyleType;
(function (CellStyleType) {
    CellStyleType[CellStyleType["RegularDayStyle"] = 0] = "RegularDayStyle";
    CellStyleType[CellStyleType["SelectedDayStyle"] = 1] = "SelectedDayStyle";
    CellStyleType[CellStyleType["TodayStyle"] = 2] = "TodayStyle";
    CellStyleType[CellStyleType["WeekNumberStyle"] = 3] = "WeekNumberStyle";
    CellStyleType[CellStyleType["WeekendStyle"] = 4] = "WeekendStyle";
    CellStyleType[CellStyleType["DayNameStyle"] = 5] = "DayNameStyle";
    CellStyleType[CellStyleType["TitleStyle"] = 6] = "TitleStyle";
    CellStyleType[CellStyleType["MonthNameStyle"] = 7] = "MonthNameStyle"; // cell for month name in compact Year view mode
})(CellStyleType || (CellStyleType = {}));
export class CellStyleInitializer {
    applyStyle(value) {
        this.changeCellBorderWidth(value.cellBorderWidth, value);
        this.changeCellBorderColor(value.cellBorderColor, value);
        this.changeCellBackgroundColor(value.cellBackgroundColor, value);
        this.changeCellAlignment(value.cellAlignment, value);
        this.changeCellPaddingHorizontal(value.cellPaddingHorizontal, value);
        this.changeCellPaddingVertical(value.cellPaddingVertical, value);
        this.changeCellTextColor(value.cellTextColor, value);
        this.changeCellTextFontName(value.cellTextFontName, value);
        this.changeCellTextFontStyle(value.cellTextFontStyle, value);
        this.changeCellTextSize(value.cellTextSize, value);
        value.onStyleChanged();
    }
    changeCellBorderWidth(value, style) {
        if (isNaN(value)) {
            return;
        }
        let borderWidth = new java.lang.Float(value * Utils.layout.getDisplayDensity());
        style.android.setBorderWidth(borderWidth);
    }
    onCellBorderWidthChanged(value, style) {
        this.changeCellBorderWidth(value, style);
        style.onStyleChanged();
    }
    changeCellBorderColor(value, style) {
        if (!value) {
            return;
        }
        let color = value.argb;
        let borderColor = new java.lang.Integer(color);
        style.android.setBorderColor(borderColor);
    }
    onCellBorderColorChanged(value, style) {
        this.changeCellBorderColor(value, style);
        style.onStyleChanged();
    }
    changeCellBackgroundColor(value, style) {
        if (!value) {
            return;
        }
        let color = value.argb;
        let backgroundColor = new java.lang.Integer(color);
        style.android.setBackgroundColor(backgroundColor);
    }
    onCellBackgroundColorChanged(value, style) {
        this.changeCellBackgroundColor(value, style);
        style.onStyleChanged();
    }
    changeCellAlignment(value, style) {
        if (!value) {
            return;
        }
        let position;
        switch (value) {
            case commonModule.CalendarCellAlignment.Bottom:
                position = com.telerik.widget.calendar.CalendarElement.BOTTOM;
                break;
            case commonModule.CalendarCellAlignment.Top:
                position = com.telerik.widget.calendar.CalendarElement.TOP;
                break;
            case commonModule.CalendarCellAlignment.Left:
                position = com.telerik.widget.calendar.CalendarElement.LEFT;
                break;
            case commonModule.CalendarCellAlignment.Right:
                position = com.telerik.widget.calendar.CalendarElement.RIGHT;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter:
                position = com.telerik.widget.calendar.CalendarElement.CENTER_HORIZONTAL;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter:
                position = com.telerik.widget.calendar.CalendarElement.CENTER_VERTICAL;
                break;
            case commonModule.CalendarCellAlignment.Center:
                position = com.telerik.widget.calendar.CalendarElement.CENTER;
                break;
            default:
                position = com.telerik.widget.calendar.CalendarElement.CENTER;
        }
        let positionValue = new java.lang.Integer(position);
        style.android.setTextPosition(positionValue);
    }
    onCellAlignmentChanged(value, style) {
        this.changeCellAlignment(value, style);
        style.onStyleChanged();
    }
    changeCellPaddingHorizontal(value, style) {
        if (isNaN(value)) {
            return;
        }
        let paddingVal = value * Utils.layout.getDisplayDensity();
        let padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingHorizontal(padding);
    }
    onCellPaddingHorizontalChanged(value, style) {
        this.changeCellPaddingHorizontal(value, style);
        style.onStyleChanged();
    }
    changeCellPaddingVertical(value, style) {
        if (isNaN(value)) {
            return;
        }
        let paddingVal = value * Utils.layout.getDisplayDensity();
        let padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingVertical(padding);
    }
    onCellPaddingVerticalChanged(value, style) {
        this.changeCellPaddingVertical(value, style);
        style.onStyleChanged();
    }
    changeCellTextColor(value, style) {
        if (!value) {
            return;
        }
        let color = value.argb;
        let textColor = new java.lang.Integer(color);
        style.android.setTextColor(textColor);
    }
    onCellTextColorChanged(value, style) {
        this.changeCellTextColor(value, style);
        style.onStyleChanged();
    }
    changeCellTextFontName(value, style) {
        if (!value) {
            return;
        }
        let font = Tool.createTypeface(value, style.cellTextFontStyle);
        style.android.setFontName(value);
    }
    onCellTextFontNameChanged(value, style) {
        this.changeCellTextFontName(value, style);
        style.onStyleChanged();
    }
    changeCellTextFontStyle(value, style) {
        if (!value) {
            return;
        }
        let font = Tool.createTypeface(style.cellTextFontName, value);
        let fontStyle = new java.lang.Integer(font.getStyle());
        style.android.setFontStyle(fontStyle);
    }
    onCellTextFontStyleChanged(value, style) {
        this.changeCellTextFontStyle(value, style);
        style.onStyleChanged();
    }
    changeCellTextSize(value, style) {
        if (isNaN(value)) {
            return;
        }
        let size = value * Utils.layout.getDisplayDensity();
        let textSize = new java.lang.Float(size);
        style.android.setTextSize(textSize);
    }
    onCellTextSizeChanged(value, style) {
        this.changeCellTextSize(value, style);
        style.onStyleChanged();
    }
    makeDayCellFilter(cellStyleType, displayMode) {
        let cellFilter = new com.telerik.widget.calendar.CalendarDayCellFilter();
        let positiveFilter = new java.lang.Boolean(true);
        switch (cellStyleType) {
            case CellStyleType.TodayStyle:
                cellFilter.setIsToday(positiveFilter);
            case CellStyleType.RegularDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.WeekendStyle:
                cellFilter.setIsWeekend(positiveFilter);
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.DayNameStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.DayName);
                break;
            case CellStyleType.WeekNumberStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.WeekNumber);
                break;
            case CellStyleType.TitleStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Title);
                break;
            case CellStyleType.SelectedDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                cellFilter.setIsSelected(positiveFilter);
                break;
        }
        if (displayMode) {
            cellFilter.setCalendarDisplayMode(displayMode);
        }
        return cellFilter;
    }
    makeMonthCellFilter() {
        let cellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
        let positiveFilter = new java.lang.Boolean(true);
        cellFilter.setMonthIsCompact(positiveFilter);
        return cellFilter;
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class CellStyle extends commonModule.CellStyle {
    constructor() {
        super(...arguments);
        this._nativeIsYear = false;
    }
    set nativeIsYear(value) {
        if (this._nativeIsYear !== value) {
            this._nativeIsYear = value;
            this._android = null;
        }
    }
    // @ts-ignore
    set owner(value) {
        this._owner = value;
    }
    get initializer() {
        if (!this._initializer) {
            this._initializer = new CellStyleInitializer();
        }
        return this._initializer;
    }
    get android() {
        if (!this._android) {
            if (this._nativeIsYear) {
                this._android = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                this.initializer.applyStyle(this);
            }
            else {
                this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
            }
        }
        return this._android;
    }
    updateNativeStyleFilters(cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        if (this._nativeIsYear) {
            let filter = this.initializer.makeMonthCellFilter();
            this.android.setFilter(filter);
        }
        else {
            let filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
            this.android.setFilter(filter);
        }
    }
    onStyleChanged() {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    }
    onCellBorderWidthChanged(oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    }
    onCellBorderColorChanged(oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    }
    onCellBackgroundColorChanged(oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    }
    onCellTextColorChanged(oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    }
    onCellTextFontNameChanged(oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    }
    onCellTextFontStyleChanged(oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    }
    onCellTextSizeChanged(oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    }
    onCellPaddingHorizontalChanged(oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    }
    onCellPaddingVerticalChanged(oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    }
    onCellAlignmentChanged(oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    }
}
export class DayEventsViewStyle extends commonModule.DayEventsViewStyle {
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.applyStyles();
    }
    get android() {
        if (!this._owner) {
            return null;
        }
        return this._owner.getDayView().getDayEventsViewStyle();
    }
    applyStyles() {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.timeLabelFormat) {
            this.changeTimeLabelFormat(null, this.timeLabelFormat);
        }
        if (this.timeLabelTextColor) {
            this.changeTimeLabelTextColor(null, this.timeLabelTextColor);
        }
        if (this.timeLabelTextSize) {
            this.changeTimeLabelTextSize(null, this.timeLabelTextSize);
        }
        if (this.timeLinesWidth) {
            this.changeTimeLinesWidth(null, this.timeLinesWidth);
        }
        if (this.timeLinesColor) {
            this.changeTimeLinesColor(null, this.timeLinesColor);
        }
    }
    onBackgroundColorChanged(oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    }
    changeBackgroundColor(oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setBackgroundColor(newValue.android);
        }
    }
    onTimeLabelFormatChanged(oldValue, newValue) {
        this.changeTimeLabelFormat(oldValue, newValue);
    }
    changeTimeLabelFormat(oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelFormat(new java.text.SimpleDateFormat(newValue));
        }
    }
    onTimeLabelTextColorChanged(oldValue, newValue) {
        this.changeTimeLabelTextColor(oldValue, newValue);
    }
    changeTimeLabelTextColor(oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setTimeLabelColor(newValue.android);
        }
    }
    onTimeLabelTextSizeChanged(oldValue, newValue) {
        this.changeTimeLabelTextSize(oldValue, newValue);
    }
    changeTimeLabelTextSize(oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelTextSize(newValue * Utils.layout.getDisplayDensity());
        }
    }
    onTimeLinesWidthChanged(oldValue, newValue) {
        this.changeTimeLinesWidth(oldValue, newValue);
    }
    changeTimeLinesWidth(oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLinesWidth(newValue * Utils.layout.getDisplayDensity());
        }
    }
    onTimeLinesColorChanged(oldValue, newValue) {
        this.changeTimeLinesColor(oldValue, newValue);
    }
    changeTimeLinesColor(oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setTimeLinesColor(newValue.android);
        }
    }
}
export class AllDayEventsViewStyle extends commonModule.AllDayEventsViewStyle {
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.applyStyles();
    }
    get android() {
        if (!this._owner) {
            return null;
        }
        return this._owner.getDayView().getAllDayEventsViewStyle();
    }
    applyStyles() {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.allDayText !== AllDayEventsViewStyle.ALL_DAY_TEXT) {
            this.changeAllDayText(AllDayEventsViewStyle.ALL_DAY_TEXT, this.allDayText);
        }
        if (this.allDayTextIsVisible !== undefined) {
            this.changeAllDayTextIsVisible(null, this.allDayTextIsVisible);
        }
    }
    onBackgroundColorChanged(oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    }
    changeBackgroundColor(oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setBackgroundColor(newValue.android);
        }
    }
    onAllDayTextChanged(oldValue, newValue) {
        this.changeAllDayText(oldValue, newValue);
    }
    changeAllDayText(oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayText(newValue);
        }
    }
    onAllDayTextIsVisibleChanged(oldValue, newValue) {
        this.changeAllDayTextIsVisible(oldValue, newValue);
    }
    changeAllDayTextIsVisible(oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayTextIsVisible(newValue);
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class DayCellStyle extends commonModule.DayCellStyle {
    // @ts-ignore
    set owner(value) {
        this._owner = value;
    }
    set eventAdapter(value) {
        this._eventAdapter = value;
    }
    get initializer() {
        if (!this._initializer) {
            this._initializer = new CellStyleInitializer();
        }
        return this._initializer;
    }
    get android() {
        if (!this._android) {
            this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
        }
        return this._android;
    }
    updateNativeStyleFilters(cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        let filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
        this.android.setFilter(filter);
    }
    onCellBorderWidthChanged(oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    }
    onCellBorderColorChanged(oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    }
    onCellBackgroundColorChanged(oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    }
    onCellTextColorChanged(oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    }
    onCellTextFontNameChanged(oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    }
    onCellTextFontStyleChanged(oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    }
    onCellTextSizeChanged(oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    }
    onCellPaddingHorizontalChanged(oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    }
    onCellPaddingVerticalChanged(oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    }
    onCellAlignmentChanged(oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    }
    onStyleChanged() {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    }
    // day cell specific properties
    onShowEventsTextChanged(oldValue, newValue) {
        if (newValue === undefined || newValue == null || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventRenderMode(newValue ? com.telerik.widget.calendar.events.EventRenderMode.Shape_And_Text : com.telerik.widget.calendar.events.EventRenderMode.Shape);
    }
    onEventTextColorChanged(oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event text color property not supported in Android.
    }
    onEventFontNameChanged(oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event font name property not supported in Android.
    }
    onEventFontStyleChanged(oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event font style property not supported in Android.
    }
    onEventTextSizeChanged(oldValue, newValue) {
        if (isNaN(newValue) || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventTextSize(newValue * Utils.layout.getDisplayDensity());
    }
}
/**
 * Cell style class for months in year view mode
 */
export class MonthCellStyle extends commonModule.MonthCellStyle {
    get regularDayStyle() {
        if (!this._regularDayStyle) {
            this._regularDayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            let dateMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
            let positiveFilter = new java.lang.Boolean(true);
            dateMonthCellFilter.setTextIsDate(positiveFilter);
            this._regularDayStyle.setFilter(dateMonthCellFilter);
        }
        return this._regularDayStyle;
    }
    get weekendStyle() {
        if (!this._weekendStyle) {
            this._weekendStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            let weekendMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
            let positiveFilter = new java.lang.Boolean(true);
            weekendMonthCellFilter.setTextIsWeekend(positiveFilter);
            this._weekendStyle.setFilter(weekendMonthCellFilter);
        }
        return this._weekendStyle;
    }
    get todayStyle() {
        if (!this._todayStyle) {
            this._todayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            let todayMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
            let positiveFilter = new java.lang.Boolean(true);
            todayMonthCellFilter.setTextIsToday(positiveFilter);
            this._todayStyle.setFilter(todayMonthCellFilter);
        }
        return this._todayStyle;
    }
    get dayNameStyle() {
        if (!this._dayNameStyle) {
            this._dayNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            let dayNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
            let positiveFilter = new java.lang.Boolean(true);
            dayNameMonthCellFilter.setTextIsDayName(positiveFilter);
            this._dayNameStyle.setFilter(dayNameMonthCellFilter);
        }
        return this._dayNameStyle;
    }
    get monthNameStyle() {
        if (!this._monthNameStyle) {
            this._monthNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            let monthNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
            let positiveFilter = new java.lang.Boolean(true);
            monthNameMonthCellFilter.setTextIsMonthName(positiveFilter);
            this._monthNameStyle.setFilter(monthNameMonthCellFilter);
        }
        return this._monthNameStyle;
    }
    get monthCellStyle() {
        if (!this._monthCellStyle) {
            this._monthCellStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
        }
        return this._monthCellStyle;
    }
    onStyleChanged() {
        if (this.owner && this.owner.getDisplayMode() === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
            this.owner.updateCalendar();
        }
    }
    onWeekendTextColorChanged(oldValue, newValue) {
        if (newValue) {
            let color = newValue.argb;
            let textColor = new java.lang.Integer(color);
            this.weekendStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    }
    onTodayTextColorChanged(oldValue, newValue) {
        if (newValue) {
            let color = newValue.argb;
            let textColor = new java.lang.Integer(color);
            this.todayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    }
    onDayTextColorChanged(oldValue, newValue) {
        if (newValue) {
            let color = newValue.argb;
            let textColor = new java.lang.Integer(color);
            this.regularDayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    }
    onDayFontNameChanged(oldValue, newValue) {
        if (newValue) {
            this.regularDayStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    }
    onDayFontStyleChanged(oldValue, newValue) {
        if (newValue) {
            let font = Tool.createTypeface(this.dayFontName, newValue);
            let fontStyle = new java.lang.Integer(font.getStyle());
            this.regularDayStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    }
    onDayTextSizeChanged(oldValue, newValue) {
        if (!isNaN(+newValue)) {
            let size = newValue * Utils.layout.getDisplayDensity();
            let sizeValue = new java.lang.Float(size);
            this.regularDayStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    }
    onDayNameTextColorChanged(oldValue, newValue) {
        if (newValue) {
            let color = newValue.argb;
            let colorValue = new java.lang.Integer(color);
            this.dayNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    }
    onDayNameFontNameChanged(oldValue, newValue) {
        if (newValue) {
            this.dayNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    }
    onDayNameFontStyleChanged(oldValue, newValue) {
        if (newValue) {
            let font = Tool.createTypeface(this.dayNameFontName, newValue);
            let fontStyle = new java.lang.Integer(font.getStyle());
            this.dayNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    }
    onDayNameTextSizeChanged(oldValue, newValue) {
        if (!isNaN(+newValue)) {
            let size = newValue * Utils.layout.getDisplayDensity();
            let sizeValue = new java.lang.Float(size);
            this.dayNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    }
    onMonthNameTextColorChanged(oldValue, newValue) {
        if (newValue) {
            let color = newValue.argb;
            let colorValue = new java.lang.Integer(color);
            this.monthNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    }
    onMonthNameFontNameChanged(oldValue, newValue) {
        if (newValue) {
            this.monthNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    }
    onMonthNameFontStyleChanged(oldValue, newValue) {
        if (newValue) {
            let font = Tool.createTypeface(this.monthNameFontName, newValue);
            let fontStyle = new java.lang.Integer(font.getStyle());
            this.monthNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    }
    onMonthNameTextSizeChanged(oldValue, newValue) {
        if (!isNaN(+newValue)) {
            let size = newValue * Utils.layout.getDisplayDensity();
            let sizeValue = new java.lang.Float(size);
            this.monthNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    }
}
/**
 * Cell style class for inline events cells in month view
 */
export class InlineEventCellStyle extends commonModule.InlineEventCellStyle {
    apply(adapter) {
        if (!adapter) {
            return;
        }
        this._adapter = adapter;
        let color;
        if (this.cellBackgroundColor) {
            color = this.cellBackgroundColor.argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
        if (this.eventTextColor) {
            // TODO: Text color for inline event is not supported for Android calendar.
        }
        if (this.eventFontName) {
            // TODO: Font name property for inline event text is not supported for Android calendar.
        }
        if (this.eventFontStyle) {
            // TODO: Font style property for inline event text is not supported for Android calendar.
        }
        if (!isNaN(this.eventTextSize)) {
            this._adapter.setInlineEventTitleTextSize(this.eventTextSize);
        }
        if (this.timeTextColor) {
            let color = this.timeTextColor.argb;
            this._adapter.setInlineEventTimeStartTextColor(color);
            this._adapter.setInlineEventTimeEndTextColor(color);
        }
        if (this.timeFontName) {
            // TODO: Font name property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeFontStyle) {
            // TODO: Font style property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeTextSize) {
            if (!isNaN(+this.timeTextSize)) {
                // NOTE: these methods don't require display density to be taken account
                this._adapter.setInlineEventTimeEndTextSize(this.timeTextSize);
                this._adapter.setInlineEventTimeStartTextSize(this.timeTextSize);
            }
        }
    }
    onCellBackgroundColorChanged(oldValue, newValue) {
        if (newValue && this._adapter) {
            let color = newValue.argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
    }
    onEventTextColorChanged(oldValue, newValue) {
        // TODO: console.log("WARNING: Text color for inline event is not supported for Android calendar.")
    }
    onEventFontNameChanged(oldValue, newValue) {
        // TODO: console.log("WARNING: Font name property for inline event text is not supported for Android calendar.")
    }
    onEventFontStyleChanged(oldValue, newValue) {
        // TODO: console.log("WARNING: Font style property for inline event text is not supported for Android calendar.")
    }
    onEventTextSizeChanged(oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            this._adapter.setInlineEventTitleTextSize(newValue);
        }
    }
    onTimeTextColorChanged(oldValue, newValue) {
        if (newValue && this._adapter) {
            let color = newValue.argb;
            this._adapter.setInlineEventTimeStartTextColor(color);
            this._adapter.setInlineEventTimeEndTextColor(color);
        }
    }
    onTimeFontNameChanged(oldValue, newValue) {
        // TODO: console.log("WARNING: Font name property for for inline event date/time is not supported for Android calendar.")
    }
    onTimeFontStyleChanged(oldValue, newValue) {
        // TODO: console.log("WARNING: Font style property for for inline event date/time is not supported for Android calendar.")
    }
    onTimeTextSizeChanged(oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            // NOTE: these methods don't require display density to be taken account
            this._adapter.setInlineEventTimeEndTextSize(newValue);
            this._adapter.setInlineEventTimeStartTextSize(newValue);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT VIEW MODES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class CalendarStyleInitializer {
    updateNativeStyles(style) {
        if (!style._owner || !style._owner._nativeView) {
            return;
        }
        if (style.backgroundColor) {
            let color = style.backgroundColor.argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
        if (style.showDayNames !== undefined && style.showDayNames != null) {
            style._owner._nativeView.setShowDayNames(style.showDayNames);
        }
        if (style.showTitle !== undefined && style.showTitle != null) {
            style._owner._nativeView.setShowTitle(style.showTitle);
        }
        if (style.showWeekNumbers !== undefined && style.showWeekNumbers != null) {
            style._owner._nativeView.setWeekNumbersDisplayMode(style.showWeekNumbers ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
        if (style.dayCellStyle) {
            style.prepareNativeStyle(style.dayCellStyle, CellStyleType.RegularDayStyle);
            style._owner._nativeView.addDayCellStyle(style.dayCellStyle.android);
        }
        if (style.weekendCellStyle) {
            style.prepareNativeStyle(style.weekendCellStyle, CellStyleType.WeekendStyle);
            style._owner._nativeView.addDayCellStyle(style.weekendCellStyle.android);
        }
        if (style.todayCellStyle) {
            style.prepareNativeStyle(style.todayCellStyle, CellStyleType.TodayStyle);
            style._owner._nativeView.addDayCellStyle(style.todayCellStyle.android);
        }
        if (style.dayNameCellStyle) {
            style.prepareNativeStyle(style.dayNameCellStyle, CellStyleType.DayNameStyle);
            style._owner._nativeView.addDayCellStyle(style.dayNameCellStyle.android);
        }
        if (style.weekNumberCellStyle) {
            style.prepareNativeStyle(style.weekNumberCellStyle, CellStyleType.WeekNumberStyle);
            style._owner._nativeView.addDayCellStyle(style.weekNumberCellStyle.android);
        }
        if (style.titleCellStyle) {
            style.prepareNativeStyle(style.titleCellStyle, CellStyleType.TitleStyle);
            style._owner._nativeView.addDayCellStyle(style.titleCellStyle.android);
        }
        if (style.selectedDayCellStyle) {
            style.prepareNativeStyle(style.selectedDayCellStyle, CellStyleType.SelectedDayStyle);
            style._owner._nativeView.addDayCellStyle(style.selectedDayCellStyle.android);
        }
        if (style.inlineEventCellStyle) {
            style.prepareNativeStyle(style.inlineEventCellStyle, null);
        }
        this.syncSelectionShape(style);
    }
    onShowWeekNumbersChanged(oldValue, newValue, style) {
        this.changeShowWeekNumbers(newValue, style);
    }
    changeShowWeekNumbers(newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setWeekNumbersDisplayMode(newValue ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
    }
    onShowTitleChanged(oldValue, newValue, style) {
        this.changeShowTitle(newValue, style);
    }
    changeShowTitle(newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowTitle(newValue);
        }
    }
    onShowDayNamesChanged(oldValue, newValue, style) {
        this.changeShowDayNames(newValue, style);
    }
    changeShowDayNames(newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowDayNames(newValue);
        }
    }
    onBackgroundColorChanged(oldValue, newValue, style) {
        this.changeBackgroundColor(newValue, style);
    }
    changeBackgroundColor(newValue, style) {
        if (newValue && style._owner && style._owner._nativeView) {
            let color = newValue.argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
    }
    onDayCellStyleChanged(oldValue, newValue, style) {
        this.changeDayCellStyle(oldValue, newValue, style);
    }
    changeDayCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.RegularDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onSelectedDayCellStyleChanged(oldValue, newValue, style) {
        this.changeSelectedDayCellStyle(oldValue, newValue, style);
    }
    changeSelectedDayCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.SelectedDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onTodayCellStyleChanged(oldValue, newValue, style) {
        this.changeTodayCellStyle(oldValue, newValue, style);
    }
    changeTodayCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TodayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onWeekNumberCellStyleChanged(oldValue, newValue, style) {
        this.changeWeekNumberCellStyle(oldValue, newValue, style);
    }
    changeWeekNumberCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekNumberStyle);
                // TODO: See if this was working as the addDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onWeekendCellStyleChanged(oldValue, newValue, style) {
        this.changeWeekendCellStyle(oldValue, newValue, style);
    }
    changeWeekendCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekendStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onDayNameCellStyleChanged(oldValue, newValue, style) {
        this.changeDayNameCellStyle(oldValue, newValue, style);
    }
    changeDayNameCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.DayNameStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onTitleCellStyleChanged(oldValue, newValue, style) {
        this.changeTitleCellStyle(oldValue, newValue, style);
    }
    changeTitleCellStyle(oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TitleStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    syncSelectionShape(style) {
        if (style._owner) {
            style._owner._syncSelectionShape();
        }
    }
}
/**
 * Class for month view style
 */
export class CalendarMonthViewStyle extends commonModule.CalendarMonthViewStyle {
    get initializer() {
        if (!this._initializer) {
            this._initializer = new CalendarStyleInitializer();
        }
        return this._initializer;
    }
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.initializer.updateNativeStyles(this);
    }
    updateNativeStyles() {
        this.initializer.updateNativeStyles(this);
    }
    prepareNativeStyle(style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    }
    updateNativeStyleFilters(style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Month);
    }
    onShowWeekNumbersChanged(oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    }
    onSelectionShapeChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onSelectionShapeSizeChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onSelectionShapeColorChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onShowTitleChanged(oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    }
    onShowDayNamesChanged(oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    }
    onBackgroundColorChanged(oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    }
    onDayCellStyleChanged(oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    }
    onSelectedDayCellStyleChanged(oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    }
    onTodayCellStyleChanged(oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    }
    onWeekNumberCellStyleChanged(oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    }
    onWeekendCellStyleChanged(oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    }
    onWeekendAnotherMonthCellStyleChanged(oldValue, newValue) {
        // Note: weekendAnotherMonthCellStyle is iOS-only as Android doesn't support anotherMonthCellStyle
        // This handler is provided for API compatibility
    }
    onDayNameCellStyleChanged(oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    }
    onTitleCellStyleChanged(oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    }
    onInlineEventCellStyleChanged(oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
    }
}
/**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
export class CalendarWeekViewStyle extends CalendarMonthViewStyle {
    updateNativeStyleFilters(style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Week);
    }
}
/**
 * The style class for day mode.
 */
export class CalendarDayViewStyle extends commonModule.CalendarDayViewStyle {
    get initializer() {
        if (!this._initializer) {
            this._initializer = new CalendarStyleInitializer();
        }
        return this._initializer;
    }
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.updateNativeStyles();
    }
    updateNativeStyles() {
        this.initializer.updateNativeStyles(this);
        this.updateNativeDayStyles();
    }
    updateNativeDayStyles() {
        this.changeShowWeek(null, this.showWeek);
        if (this.dayEventsViewStyle) {
            this.changeDayEventsViewStyle(null, this.dayEventsViewStyle);
        }
        if (this.allDayEventsViewStyle) {
            this.changeAllDayEventsViewStyle(null, this.allDayEventsViewStyle);
        }
    }
    prepareNativeStyle(style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    }
    updateNativeStyleFilters(style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Day);
    }
    onShowWeekNumbersChanged(oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    }
    onSelectionShapeChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onSelectionShapeSizeChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onSelectionShapeColorChanged(oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    }
    onShowTitleChanged(oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    }
    onShowDayNamesChanged(oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    }
    onBackgroundColorChanged(oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    }
    onDayCellStyleChanged(oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    }
    onSelectedDayCellStyleChanged(oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    }
    onTodayCellStyleChanged(oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    }
    onWeekNumberCellStyleChanged(oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    }
    onWeekendCellStyleChanged(oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    }
    onWeekendAnotherMonthCellStyleChanged(oldValue, newValue) {
        // Note: weekendAnotherMonthCellStyle is iOS-only as Android doesn't support anotherMonthCellStyle
        // This handler is provided for API compatibility
    }
    onDayNameCellStyleChanged(oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    }
    onTitleCellStyleChanged(oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    }
    onDayEventsViewStyleChanged(oldValue, newValue) {
        this.changeDayEventsViewStyle(oldValue, newValue);
    }
    changeDayEventsViewStyle(oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    }
    onAllDayEventsViewStyleChanged(oldValue, newValue) {
        this.changeAllDayEventsViewStyle(oldValue, newValue);
    }
    changeAllDayEventsViewStyle(oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    }
    onInlineEventCellStyleChanged(oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
    }
    onShowWeekChanged(oldValue, newValue) {
        this.changeShowWeek(oldValue, newValue);
    }
    changeShowWeek(oldValue, newValue) {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        this._owner._nativeView.setShowWeekInDayMode(newValue);
    }
}
/**
 * The year mode style class
 */
export class CalendarYearViewStyle extends commonModule.CalendarYearViewStyle {
    constructor() {
        super();
    }
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.updateNativeStyles();
    }
    updateNativeStyles() {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthCellStyle) {
            this.monthCellStyle.owner = this._owner._nativeView;
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.regularDayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.weekendStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.todayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.dayNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthCellStyle);
        }
    }
    onTitleCellStyleChanged(oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onMonthCellStyleChanged(oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                this._owner._nativeView.removeMonthCellStyle(oldValue.regularDayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.weekendStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.todayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.dayNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthCellStyle);
            }
            if (newValue) {
                this._owner._nativeView.addMonthCellStyle(newValue.regularDayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.weekendStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.todayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.dayNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthCellStyle);
            }
        }
    }
}
/**
 * The year view mode in compact view
 */
export class CalendarMonthNamesViewStyle extends commonModule.CalendarMonthNamesViewStyle {
    constructor() {
        super();
    }
    // @ts-ignore
    set owner(value) {
        this._owner = value;
        this.updateNativeStyles();
    }
    updateNativeStyles() {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthNameCellStyle) {
            this.monthNameCellStyle['nativeIsYear'] = true;
            this.monthNameCellStyle.owner = this._owner._nativeView;
            this.monthNameCellStyle['updateNativeStyleFilters'](CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addMonthCellStyle(this.monthNameCellStyle.android);
        }
    }
    updateFilterDisplayMode(filter) {
        let positiveFilter = new java.lang.Boolean(true);
        // filter.setTextIsMonthName(positiveFilter);
        filter.setMonthIsCompact(positiveFilter);
    }
    onTitleCellStyleChanged(oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    }
    onMonthNameCellStyleChanged(oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeMonthCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.nativeIsYear = true;
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addMonthCellStyle(newValue.android);
            }
        }
    }
}
let CalendarCellClickListener;
let CalendarOnItemClickListener;
let CalendarOnDisplayDateChangedListener;
let CalendarOnDisplayModeChangedListener;
let CalendarEventViewTapListener;
let CalendarOnSelectedDatesChangedListener;
function initializeListeners() {
    if (!CalendarCellClickListener) {
        var CalendarCellClickListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarCellClickListenerImpl, _super);
    function CalendarCellClickListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarCellClickListenerImpl.prototype.onCellClick = function (cell) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var args = {
            eventName: commonModule.RadCalendar.cellTapEvent,
            object: this.owner,
            cell: cell,
            date: new Date(cell.getDate())
        };
        this.owner.notify(args);
    };
    CalendarCellClickListenerImpl = __decorate([
        Interfaces([com.telerik.widget.calendar.RadCalendarView.OnCellClickListener])
    ], CalendarCellClickListenerImpl);
    return CalendarCellClickListenerImpl;
}(java.lang.Object));
        CalendarCellClickListener = CalendarCellClickListenerImpl;
    }
    if (!CalendarOnItemClickListener) {
        var CalendarOnItemClickListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarOnItemClickListenerImpl, _super);
    function CalendarOnItemClickListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarOnItemClickListenerImpl.prototype.onItemClick = function (parent, view, position, id) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var eventInfo = parent.getAdapter().getItem(position); // returned object is instance of EventsManager.EventInfo class
        var event = eventInfo.originalEvent();
        var nsEvent = nativeEventToNSEvent(event, this.owner.eventSource);
        var args = {
            eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
            object: this.owner,
            eventData: nsEvent
        };
        this.owner.notify(args);
    };
    CalendarOnItemClickListenerImpl = __decorate([
        Interfaces([android.widget.AdapterView.OnItemClickListener])
    ], CalendarOnItemClickListenerImpl);
    return CalendarOnItemClickListenerImpl;
}(java.lang.Object));
        CalendarOnItemClickListener = CalendarOnItemClickListenerImpl;
    }
    if (!CalendarOnDisplayDateChangedListener) {
        var CalendarOnDisplayDateChangedListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarOnDisplayDateChangedListenerImpl, _super);
    function CalendarOnDisplayDateChangedListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarOnDisplayDateChangedListenerImpl.prototype.onDisplayDateChanged = function (oldDate, newDate) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var newDisplayedDate = new Date(newDate);
        if (this.owner.displayedDate === newDisplayedDate) {
            return;
        }
        var navigationStartedArgs = {
            eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
            object: this.owner,
            date: newDisplayedDate
        };
        this.owner.notify(navigationStartedArgs);
        this.owner.displayedDate = newDisplayedDate;
        var navigatedArgs = {
            eventName: commonModule.RadCalendar.navigatedToDateEvent,
            object: this.owner,
            date: newDisplayedDate
        };
        this.owner.notify(navigatedArgs);
    };
    CalendarOnDisplayDateChangedListenerImpl = __decorate([
        Interfaces([com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener])
    ], CalendarOnDisplayDateChangedListenerImpl);
    return CalendarOnDisplayDateChangedListenerImpl;
}(java.lang.Object));
        CalendarOnDisplayDateChangedListener = CalendarOnDisplayDateChangedListenerImpl;
    }
    if (!CalendarOnDisplayModeChangedListener) {
        var CalendarOnDisplayModeChangedListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarOnDisplayModeChangedListenerImpl, _super);
    function CalendarOnDisplayModeChangedListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarOnDisplayModeChangedListenerImpl.prototype.onDisplayModeChanged = function (oldMode, newMode) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var newCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(this.owner, newMode);
        this.owner.viewMode = newCalendarMode;
        var oldCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(this.owner, oldMode);
        this.owner.notifyViewModeChanged(oldCalendarMode, newCalendarMode);
    };
    CalendarOnDisplayModeChangedListenerImpl = __decorate([
        Interfaces([com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener])
    ], CalendarOnDisplayModeChangedListenerImpl);
    return CalendarOnDisplayModeChangedListenerImpl;
}(java.lang.Object));
        CalendarOnDisplayModeChangedListener = CalendarOnDisplayModeChangedListenerImpl;
    }
    if (!CalendarEventViewTapListener) {
        var CalendarEventViewTapListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarEventViewTapListenerImpl, _super);
    function CalendarEventViewTapListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarEventViewTapListenerImpl.prototype.onEventViewTap = function (event) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var nsEvent = nativeEventToNSEvent(event, this.owner.eventSource);
        var args = {
            eventName: commonModule.RadCalendar.dayViewEventSelectedEvent,
            object: this.owner,
            eventData: nsEvent
        };
        this.owner.notify(args);
    };
    CalendarEventViewTapListenerImpl = __decorate([
        Interfaces([com.telerik.widget.calendar.dayview.CalendarDayView.EventViewTapListener])
    ], CalendarEventViewTapListenerImpl);
    return CalendarEventViewTapListenerImpl;
}(java.lang.Object));
        CalendarEventViewTapListener = CalendarEventViewTapListenerImpl;
    }
    if (!CalendarOnSelectedDatesChangedListener) {
        var CalendarOnSelectedDatesChangedListenerImpl = /** @class */ (function (_super) {
    __extends(CalendarOnSelectedDatesChangedListenerImpl, _super);
    function CalendarOnSelectedDatesChangedListenerImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CalendarOnSelectedDatesChangedListenerImpl.prototype.onSelectedDatesChanged = function (context) {
        if (!this.owner) {
            // Race condition: Calendar already disposed
            return;
        }
        var selectedCount = context.datesAdded().size();
        var deselectedCount = context.datesRemoved().size();
        if (selectedCount === 0 && deselectedCount === 0) {
            return;
        }
        if (this.owner.selectionMode === commonModule.CalendarSelectionMode.Range) {
            var nativeCalendar = this.owner.android;
            var dateRange = nativeCalendar.getSelectionManager().getSelectedRange();
            var firstSelected = dateRange ? new Date(dateRange.getStart()) : null;
            var lastSelected = dateRange ? new Date(dateRange.getEnd()) : null;
            this.owner.notifyRangeSelectionChanged(this.owner, firstSelected, lastSelected);
        }
        if (deselectedCount > 0) {
            for (var i = 0; i < deselectedCount; i++) {
                var deselectedDate = new Date(context
                    .datesRemoved()
                    .get(i)
                    .longValue());
                this.owner.notifyDateDeselected(this.owner, deselectedDate);
            }
        }
        if (selectedCount > 0) {
            for (var i = 0; i < selectedCount; i++) {
                var millis = context
                    .datesAdded()
                    .get(i)
                    .longValue();
                var selectedDate = new Date(millis);
                this.owner.notifySingleDateSelected(this.owner, selectedDate);
            }
        }
    };
    CalendarOnSelectedDatesChangedListenerImpl = __decorate([
        Interfaces([com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener])
    ], CalendarOnSelectedDatesChangedListenerImpl);
    return CalendarOnSelectedDatesChangedListenerImpl;
}(java.lang.Object));
        CalendarOnSelectedDatesChangedListener = CalendarOnSelectedDatesChangedListenerImpl;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              RadCalendar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class RadCalendar extends commonModule.RadCalendar {
    constructor() {
        super();
        this._androidViewId = -1;
    }
    get _nativeView() {
        return this._android;
    }
    createNativeView() {
        initializeListeners();
        this._android = new com.telerik.widget.calendar.RadCalendarView(this._context, Application.systemAppearance());
        this._android.setHorizontalScroll(this.horizontalTransition);
        this.addOnCellClickListener();
        this.addOnDisplayDateChangedListener();
        this.updateEventSource();
        this.addOnDisplayModeChangedListener();
        this.addOnSelectedDatesChangedListener();
        this.setDayViewEventSelectedListener();
        // set initial property values using value changed handlers
        this.setNativeMinDate(this.minDate);
        this.setNativeMaxDate(this.maxDate);
        if (this.displayedDate === undefined) {
            this.loadNativeDisplayedDate();
        }
        else {
            this.setNativeDisplayedDate(this.displayedDate);
        }
        this.setNativeSelectionMode(this.selectionMode);
        this.setNativeEventsViewMode(this.eventsViewMode);
        this.setNativeHorizontalTransition(this.horizontalTransition);
        this.setNativeTransitionMode(this.transitionMode);
        this.setNativeViewMode(this.viewMode);
        this.setNativeSelectedDate(this.selectedDate);
        this.setNativeSelectedDates(this.selectedDates);
        this.setNativeSelectedDateRange(this.selectedDateRange);
        this.initOnInlineEventsClickedListener();
        this.setNativeLocale(this.locale);
        // apply cell styles
        if (this.monthViewStyle) {
            this.monthViewStyle.owner = this;
        }
        if (this.weekViewStyle) {
            this.weekViewStyle.owner = this;
        }
        if (this.dayViewStyle) {
            this.dayViewStyle.owner = this;
        }
        if (this.yearViewStyle) {
            this.yearViewStyle.owner = this;
        }
        if (this.monthNamesViewStyle) {
            this.monthNamesViewStyle.owner = this;
        }
        this.systemAppearanceChangedHandler = (args) => {
            if (!this.nativeViewProtected || !this.nativeViewProtected.getAdapter()) {
                return;
            }
            this.nativeViewProtected.palette = args.newValue;
            this.updateCalendarStyle(args.newValue);
        };
        Application.on(Application.systemAppearanceChangedEvent, this.systemAppearanceChangedHandler);
        return this._nativeView;
    }
    initNativeView() {
        super.initNativeView();
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._nativeView.setId(this._androidViewId);
        if (Application.systemAppearance() === Enums.SystemAppearance.dark) {
            this.updateCalendarStyle(Application.systemAppearance());
        }
        if (getSdkApiLevel() && getSdkApiLevel() >= 29) {
            this._nativeView.setForceDarkAllowed(false);
        }
    }
    disposeNativeView() {
        Application.off(Application.systemAppearanceChangedEvent, this.systemAppearanceChangedHandler);
        if (this._nativeView._cellClickListener) {
            this._nativeView._cellClickListener.owner = null;
        }
        if (this._nativeView._itemClickListener) {
            this._nativeView._itemClickListener.owner = null;
        }
        if (this._nativeView._displayDateChangedListener) {
            this._nativeView._displayDateChangedListener.owner = null;
        }
        if (this._nativeView._displayModeChangedListener) {
            this._nativeView._displayModeChangedListener.owner = null;
        }
        if (this._nativeView._eventViewTapListener) {
            this._nativeView._eventViewTapListener.owner = null;
        }
        if (this._nativeView._onSelectedDatesChangedListener) {
            this._nativeView._onSelectedDatesChangedListener.owner = null;
        }
        super.disposeNativeView();
    }
    updateCalendarStyle(appearance) {
        this.nativeViewProtected.getAdapter().setStyle(this.getStyleForSystemAppearance(appearance));
    }
    getStyleForSystemAppearance(appearance) {
        if (appearance === Enums.SystemAppearance.dark) {
            return com.telerik.widget.calendar.CalendarStyles.materialDark(this.nativeViewProtected.getContext());
        }
        return com.telerik.widget.calendar.CalendarStyles.materialLight(this.nativeViewProtected.getContext());
    }
    loadNativeDisplayedDate() {
        let date = new Date(this._android.getDisplayDate());
        if (this.displayedDate !== date) {
            this.displayedDate = date;
        }
    }
    addOnCellClickListener() {
        this._nativeView._cellClickListener = new CalendarCellClickListener(this);
        this._nativeView.setOnCellClickListener(this._nativeView._cellClickListener);
    }
    _syncSelectionShape() {
        let activeStyle = this.viewMode === commonModule.CalendarViewMode.Month ? this.monthViewStyle : this.viewMode === commonModule.CalendarViewMode.Week ? this.weekViewStyle : this.viewMode === commonModule.CalendarViewMode.Day ? this.dayViewStyle : undefined;
        if (this._nativeView) {
            let defaultDecorator = new com.telerik.widget.calendar.CellDecorationsLayer(this._nativeView);
            this._nativeView.setCellDecorator(defaultDecorator);
            if (activeStyle && activeStyle.selectionShape) {
                switch (activeStyle.selectionShape) {
                    case commonModule.CalendarSelectionShape.Round:
                        let roundDecorator = new com.telerik.widget.calendar.decorations.CircularCellDecorator(this._nativeView);
                        roundDecorator.setStroked(false);
                        roundDecorator.setRadius(Utils.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            roundDecorator.setColor(activeStyle.selectionShapeColor.android);
                        }
                        this._nativeView.setCellDecorator(roundDecorator);
                        this._nativeView.setShowCellDecorations(true);
                        break;
                    case commonModule.CalendarSelectionShape.Square:
                        let squareDecorator = new com.telerik.widget.calendar.decorations.SquareCellDecorator(this._nativeView);
                        squareDecorator.setStroked(false);
                        squareDecorator.setSize(Utils.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            squareDecorator.setColor(activeStyle.selectionShapeColor.android);
                        }
                        this._nativeView.setCellDecorator(squareDecorator);
                        this._nativeView.setShowCellDecorations(true);
                        break;
                    case commonModule.CalendarSelectionShape.None:
                        this._nativeView.setShowCellDecorations(false);
                        break;
                }
            }
        }
    }
    addOnInlineEventsClickedListener() {
        if (this._nativeView.eventsManager()) {
            this._nativeView.eventsManager().setOnItemClickListener(null);
            if (this._nativeView._itemClickListener) {
                this._nativeView._itemClickListener.owner = null;
            }
            this._nativeView._itemClickListener = new CalendarOnItemClickListener(this);
            this._nativeView.eventsManager().setOnItemClickListener(this._nativeView._itemClickListener);
        }
    }
    // calendarDidNavigateToDate
    // calendarWillNavigateToDate
    addOnDisplayDateChangedListener() {
        this._nativeView._displayDateChangedListener = new CalendarOnDisplayDateChangedListener(this);
        this._nativeView.setOnDisplayDateChangedListener(this._nativeView._displayDateChangedListener);
    }
    // calendarDidChangedViewModeFromTo
    addOnDisplayModeChangedListener() {
        this._nativeView._displayModeChangedListener = new CalendarOnDisplayModeChangedListener(this);
        this._nativeView.setOnDisplayModeChangedListener(this._nativeView._displayModeChangedListener);
    }
    notifyViewModeChanged(oldMode, newMode) {
        let args = {
            eventName: commonModule.RadCalendar.viewModeChangedEvent,
            object: this,
            oldValue: oldMode,
            newValue: newMode
        };
        this.notify(args);
    }
    setDayViewEventSelectedListener() {
        this._nativeView._eventViewTapListener = new CalendarEventViewTapListener(this);
        this._nativeView.getDayView().setEventViewTapListener(this._nativeView._eventViewTapListener);
    }
    // calendarDidDeselectedDate
    // calendarDidSelectDate
    // calendarShouldSelectDate
    addOnSelectedDatesChangedListener() {
        this._nativeView._onSelectedDatesChangedListener = new CalendarOnSelectedDatesChangedListener(this);
        this._nativeView.setOnSelectedDatesChangedListener(this._nativeView._onSelectedDatesChangedListener);
    }
    notifySingleDateSelected(calendar, date) {
        this._forbidNativeSelection = true;
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Single && (!this.selectedDate || !commonModule.RadCalendar.areDatesSame(this.selectedDate, date))) {
            this.selectedDate = date;
        }
        else if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._addSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        let selectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    }
    notifyDateDeselected(calendar, date) {
        this._forbidNativeSelection = true;
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._removeSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        let selectedArgs = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    }
    notifyRangeSelectionChanged(calendar, firstSelected, lastSelected) {
        this._forbidNativeSelection = true;
        this.selectedDateRange = firstSelected ? new commonModule.DateRange(firstSelected, lastSelected) : null;
        this._forbidNativeSelection = false;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & property changed handlers.
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    setNativeViewMode(mode) {
        if (mode) {
            let bSetYearMode = false;
            let nativeMode = null;
            switch (mode) {
                case commonModule.CalendarViewMode.Month:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                    break;
                case commonModule.CalendarViewMode.MonthNames:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    bSetYearMode = true;
                    break;
                case commonModule.CalendarViewMode.Week:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                    break;
                case commonModule.CalendarViewMode.Year:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    break;
                case commonModule.CalendarViewMode.Day:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                    break;
                // case commonModule.CalendarViewMode.Flow.toLowerCase():
                //     nativeMode = TKCalendarViewMode.TKCalendarViewModeFlow;
                //     break;
                // case commonModule.CalendarViewMode.YearNumbers.toLowerCase():
                // 	nativeMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
                // 	break;
            }
            let eventsManager = this._android.eventsManager();
            if (eventsManager) {
                eventsManager.closeEvents();
            }
            if (nativeMode === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                if (this._android.isYearModeCompact() !== bSetYearMode) {
                    if (this._android.getDisplayMode() === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                        // The NS calendar view modes Year and MonthName are both represented by CalendarDisplayMode.Year in android.
                        // To achieve the difference another property (isYearModeCompact) is used which has no listener.
                        // This is why we notify for the NS event at this point.
                        if (bSetYearMode) {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.Year, commonModule.CalendarViewMode.MonthNames);
                        }
                        else {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.MonthNames, commonModule.CalendarViewMode.Year);
                        }
                    }
                    this._android.setYearModeCompact(bSetYearMode);
                }
            }
            this._android.changeDisplayMode(nativeMode, false);
        }
    }
    setNativeSelectionMode(mode) {
        if (mode) {
            let selMode = null;
            switch (mode) {
                case commonModule.CalendarSelectionMode.None:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.None;
                    break;
                case commonModule.CalendarSelectionMode.Single:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Single;
                    break;
                case commonModule.CalendarSelectionMode.Multiple:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Multiple;
                    break;
                case commonModule.CalendarSelectionMode.Range:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Range;
                    break;
                default:
                    console.log('WARNING: Unsupported selection mode set: ' + mode);
            }
            if (selMode) {
                this._android.setSelectionMode(selMode);
            }
        }
    }
    setNativeTransitionMode(mode) {
        if (mode) {
            this._nativeView.setScrollMode(RadCalendar.getAndroidTransitonModeFromTransitionMode(mode));
        }
    }
    setNativeEventsViewMode(mode) {
        if (mode) {
            this._nativeView.setEventsDisplayMode(RadCalendar.getAndroidEventsViewModeFromEventsViewMode(mode));
        }
    }
    setNativeMaxDate(date) {
        if (date) {
            let calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMaxDate(calendar.getTimeInMillis());
        }
    }
    setNativeMinDate(date) {
        if (date) {
            let calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMinDate(calendar.getTimeInMillis());
        }
    }
    setNativeDisplayedDate(date) {
        if (date) {
            let calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setDisplayDate(calendar.getTimeInMillis());
        }
    }
    setNativeSelectedDate(date) {
        if (!date) {
            this._nativeView.setSelectedDates(null);
        }
        else {
            let calendar = RadCalendar.getCalendarFromDate(date);
            let selectedDates = new java.util.ArrayList();
            selectedDates.add(new java.lang.Long(calendar.getTimeInMillis()));
            this._nativeView.setSelectedDates(selectedDates);
        }
    }
    setNativeSelectedDates(data) {
        if (!data) {
            this._nativeView.setSelectedDates(null);
        }
        else {
            let newDates = data;
            if (typeof data === 'string') {
                newDates = newDates.split(',');
            }
            let selectedDates = new java.util.ArrayList();
            for (let date in newDates) {
                let newDate = RadCalendar.getCalendarFromDate(new Date(newDates[date]));
                selectedDates.add(new java.lang.Long(newDate.getTimeInMillis()));
            }
            this._nativeView.setSelectedDates(selectedDates);
        }
    }
    setNativeSelectedDateRange(data) {
        if (!data) {
            this._nativeView.setSelectedDates(null);
        }
        else if (data instanceof commonModule.DateRange) {
            let newDateRange = data;
            let start = RadCalendar.getCalendarFromDate(newDateRange.startDate);
            let end = RadCalendar.getCalendarFromDate(newDateRange.endDate);
            let androidDateRange = new com.telerik.widget.calendar.DateRange(start.getTimeInMillis(), end.getTimeInMillis());
            this._nativeView.setSelectedRange(androidDateRange);
        }
    }
    setNativeHorizontalTransition(horizontalTransition) {
        this._nativeView.setHorizontalScroll(horizontalTransition);
    }
    getDisplayedDate() {
        return this._android.getDisplayDate();
    }
    onLocalePropertyChanged(oldValue, newValue) {
        super.onLocalePropertyChanged(oldValue, newValue);
        this.setNativeLocale(newValue);
    }
    setNativeLocale(locale) {
        if (locale && this._nativeView) {
            let langAndCountry = locale.split('-');
            if (langAndCountry.length === 1) {
                langAndCountry.push(langAndCountry[0].toUpperCase());
            }
            if (langAndCountry.length === 2) {
                let nativeLocale = new java.util.Locale(langAndCountry[0], langAndCountry[1]);
                this._nativeView.setLocale(nativeLocale);
            }
        }
    }
    onViewModeChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeViewMode(newValue);
        }
        this._syncSelectionShape();
    }
    onSelectionModeChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.clearSelection();
            this.setNativeSelectionMode(newValue);
        }
    }
    onTransitionModeChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeTransitionMode(newValue);
        }
    }
    onEventsViewModeChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeEventsViewMode(newValue);
            this.initOnInlineEventsClickedListener();
        }
    }
    onMaxDateChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMaxDate(newValue);
        }
    }
    onMinDateChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMinDate(newValue);
        }
    }
    onDisplayedDateChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeDisplayedDate(newValue);
        }
    }
    onSelectedDateChanged(oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDate(newValue);
    }
    onSelectedDatesChanged(oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDates(newValue);
    }
    onSelectedDateRangeChanged(oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDateRange(newValue);
    }
    onHorizontalTransitionChanged(oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeHorizontalTransition(newValue);
        }
    }
    onMonthViewStyleChanged(oldValue, newValue) {
        if (newValue && newValue instanceof CalendarMonthViewStyle) {
            this.monthViewStyle.owner = this;
        }
    }
    onWeekViewStyleChanged(oldValue, newValue) {
        if (newValue && newValue instanceof CalendarWeekViewStyle) {
            this.weekViewStyle.owner = this;
        }
    }
    onDayViewStyleChanged(oldValue, newValue) {
        if (newValue && newValue instanceof CalendarDayViewStyle) {
            this.dayViewStyle.owner = this;
        }
    }
    onMonthNamesViewStyleChanged(oldValue, newValue) {
        if (newValue && newValue instanceof CalendarMonthNamesViewStyle) {
            this.monthNamesViewStyle.owner = this;
        }
    }
    onYearViewStyleChanged(oldValue, newValue) {
        if (newValue && newValue instanceof CalendarYearViewStyle) {
            this.yearViewStyle.owner = this;
        }
    }
    reload() {
        if (this._nativeView) {
            this._nativeView.invalidate();
        }
        this.clearSelection();
    }
    navigateForward() {
        this._nativeView.shiftDate(true);
    }
    navigateBack() {
        this._nativeView.shiftDate(false);
    }
    goToDate(date) {
        this._nativeView.setDisplayDate(date.getTime());
    }
    getEventsForDate(date) {
        let nativeResult = this._nativeView.getEventAdapter().getEventsForDate(date.getTime());
        let result = new Array();
        if (nativeResult) {
            for (let i = 0; i < nativeResult.size(); i++) {
                let nativeEvent = nativeResult.get(i);
                let nsEvent = nativeEventToNSEvent(nativeEvent, this.eventSource);
                result.push(nsEvent);
            }
        }
        return result;
    }
    static getCalendarFromDate(date) {
        let calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(date.getTime());
        return calendar;
    }
    static getDateFromCalendar(calendar) {
        return new Date(calendar.getTimeInMillis());
    }
    clearSelection() {
        super.clearSelection();
        if (this._nativeView) {
            this._nativeView.setSelectedDates(null);
        }
    }
    initOnInlineEventsClickedListener() {
        if (this.eventsViewMode === commonModule.CalendarEventsViewMode.Inline) {
            this.addOnInlineEventsClickedListener();
        }
    }
    updateEventSource() {
        if (!this._nativeView) {
            return;
        }
        if (this.eventSource) {
            let list = new java.util.ArrayList();
            for (let i = 0; i < this.eventSource.length; i++) {
                let item;
                if (this.eventSource instanceof ObservableArray) {
                    item = this.eventSource.getItem(i).android;
                }
                else if (this.eventSource instanceof Array) {
                    item = this.eventSource[i].android;
                }
                list.add(item);
            }
            let eventAdapter = this._nativeView.getEventAdapter();
            eventAdapter.setEvents(list);
        }
    }
    static getAndroidViewModeFromViewMode(viewMode) {
        let result = null;
        switch (viewMode) {
            case commonModule.CalendarViewMode.Month:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                break;
            case commonModule.CalendarViewMode.MonthNames:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Week:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                break;
            case commonModule.CalendarViewMode.Year:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Day:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                break;
            // case commonModule.CalendarViewMode.Flow.toLocaleLowerCase():
            //     //this._android.setDisplayMode("?????");// = TKCalendarViewMode.TKCalendarViewModeFlow;
            //     break;
            // case commonModule.CalendarViewMode.YearNumbers.toLocaleLowerCase():
            // 	// this._android.viewMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
            // 	break;
        }
        return result;
    }
    static getViewModeFromAndroidViewMode(calendar, viewMode) {
        let result;
        switch (viewMode) {
            case com.telerik.widget.calendar.CalendarDisplayMode.Month:
                result = commonModule.CalendarViewMode.Month;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Week:
                result = commonModule.CalendarViewMode.Week;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Day:
                result = commonModule.CalendarViewMode.Day;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Year: {
                if (calendar._nativeView.isYearModeCompact()) {
                    result = commonModule.CalendarViewMode.MonthNames;
                }
                else {
                    result = commonModule.CalendarViewMode.Year;
                }
                break;
            }
        }
        // ?? case com.telerik.widget.calendar.CalendarDisplayMode.Flow: result = commonModule.CalendarViewMode.Flow; break;
        // ?? case com.telerik.widget.calendar.CalendarDisplayMode.YearNumbers: result = commonModule.CalendarViewMode.YearNumbers; break;
        return result;
    }
    static getAndroidTransitonModeFromTransitionMode(transitionMode) {
        let nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
        switch (transitionMode) {
            case commonModule.CalendarTransitionMode.None:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.None;
                break;
            case commonModule.CalendarTransitionMode.Slide:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
                break;
            case commonModule.CalendarTransitionMode.Stack:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Stack;
                break;
            case commonModule.CalendarTransitionMode.Plain:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Plain;
                break;
            case commonModule.CalendarTransitionMode.Free:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Free;
                break;
            case commonModule.CalendarTransitionMode.Combo:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Combo;
                break;
            case commonModule.CalendarTransitionMode.Overlap:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Overlap;
                break;
            default:
                console.log('WARNING: Unsupported transition mode: ' + transitionMode);
        }
        return nativeScrollMode;
    }
    static getAndroidEventsViewModeFromEventsViewMode(eventsViewMode) {
        let nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Normal;
        switch (eventsViewMode) {
            case commonModule.CalendarEventsViewMode.Inline:
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Inline;
                break;
            case commonModule.CalendarEventsViewMode.Popover:
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Popup;
                break;
            default:
                break;
        }
        return nativeViewMode;
    }
}
function nativeEventToNSEvent(nativeEvent, items) {
    if (!items) {
        return null;
    }
    for (let i = 0; i < items.length; i++) {
        let eventModel;
        if (items instanceof ObservableArray) {
            eventModel = items.getItem(i);
        }
        else {
            eventModel = items[i];
        }
        if (+eventModel.android.eventId() === +nativeEvent.eventId()) {
            return eventModel;
        }
    }
    return null;
}
//# sourceMappingURL=index.android.js.map