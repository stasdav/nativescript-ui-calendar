# NativeScript UI Calendar

- [Overview](#overview)
- [Installation](#installation)
- [Documentation](#documentation)
- [API Reference](#api-reference)
- [Custom Non-Working Days](#custom-non-working-days)
- [Weekend + Another Month Style (iOS)](#weekend--another-month-style-ios)
- [Sample Apps](#sample-apps)
- [Release Notes](#release-notes)
- [Get Help](#get-help)


## Overview

Here are some of the features of the **NativeScript UI Calendar**:

* different view modes: week, month, year and day
* support for appointments
* different selection modes: single, range, multiple
* animated transitions
* styling customizations

## Installation

In Command prompt / Terminal navigate to your application root folder and run:

```
tns plugin add nativescript-ui-calendar
```

## Documentation

More information about the plugin features is available in the Guides for:
- [NativeScript Core](https://docs.nativescript.org/ui/professional-ui-components/Calendar/overview)
- [NativeScript with Angular](https://docs.nativescript.org/angular/ui/professional-ui-components/ng-Calendar/overview)
- [NativeScript with Vue.js](https://docs.nativescript.org/vuejs/ns-ui/Calendar/overview)

## API Reference

[Here](https://docs.nativescript.org/ns-ui-api-reference/classes/radcalendar) is the API Reference section.

## Custom Non-Working Days

This fork adds support for custom non-working days in month view. Non-working days are styled using `weekendCellStyle`.

### Platform Support

| Platform | Custom Non-Working Days | weekendAnotherMonthCellStyle |
|----------|------------------------|------------------------------|
| **iOS** | Full support | Full support |
| **Android** | API available, but weekend detection is native | Not supported (anotherMonthCellStyle is iOS-only) |

> **Note:** On Android, weekend detection is handled by the native calendar component. The `setCustomNonWorkingDays` API is provided for code compatibility, but custom non-working days styling requires native code modifications.

### Usage

```javascript
import { setCustomNonWorkingDays } from 'nativescript-ui-calendar';

// Set custom non-working days
setCustomNonWorkingDays({
    iso_weekday_ids: [1, 2, 3, 4, 5], // Working days (0=Sun, 1=Mon, ..., 6=Sat)
    days_off: ['2026-01-23', '2026-01-24'], // Specific days off (YYYY-MM-DD)
    holidays: ['2026-01-01', '2026-05-01'] // Holidays (YYYY-MM-DD)
});

// Reset to system weekend
setCustomNonWorkingDays(null);
```

### Configuration

| Property | Type | Description |
|----------|------|-------------|
| `iso_weekday_ids` | `number[]` | Array of working weekday numbers (0=Sunday, 6=Saturday) |
| `days_off` | `string[]` | Array of specific non-working dates in `YYYY-MM-DD` format |
| `holidays` | `string[]` | Array of holiday dates in `YYYY-MM-DD` format |

### Behavior

- When config is set, custom logic **replaces** system weekend detection
- Days not in `iso_weekday_ids` are marked as non-working
- Dates in `days_off` or `holidays` are marked as non-working
- Style is applied via `weekendCellStyle`

## Weekend + Another Month Style (iOS)

This fork adds `weekendAnotherMonthCellStyle` property to `CalendarMonthViewStyle` for styling cells that are **both** non-working days **and** belong to another month.

### Problem

When a day is both a weekend/non-working day and outside the current month, `weekendCellStyle` takes priority over `anotherMonthCellStyle`. This creates visual "islands" where days outside the month have different backgrounds depending on whether they are working days or not.

### Solution

Use `weekendAnotherMonthCellStyle` to style the intersection of these two conditions:

```javascript
import { CalendarMonthViewStyle, DayCellStyle } from 'nativescript-ui-calendar';

const monthViewStyle = new CalendarMonthViewStyle();

// Style for weekend/non-working days in current month
const weekendStyle = new DayCellStyle();
weekendStyle.cellBackgroundColor = new Color('#8c8c8c');

// Style for regular days in another month
const anotherMonthStyle = new DayCellStyle();
anotherMonthStyle.cellBackgroundColor = new Color('#f0f0f0');
anotherMonthStyle.cellTextColor = new Color('#999999');

// Style for weekend/non-working days in another month (NEW)
const weekendAnotherMonthStyle = new DayCellStyle();
weekendAnotherMonthStyle.cellBackgroundColor = new Color('#f0f0f0');
weekendAnotherMonthStyle.cellTextColor = new Color('#8c8c8c');

monthViewStyle.weekendCellStyle = weekendStyle;
monthViewStyle.anotherMonthCellStyle = anotherMonthStyle;
monthViewStyle.weekendAnotherMonthCellStyle = weekendAnotherMonthStyle;
```

### Style Priority

Styles are applied in the following order (highest priority first):

1. `selectedDayCellStyle` - selected cells
2. `weekendAnotherMonthCellStyle` - weekend/non-working + another month **(NEW)**
3. `weekendCellStyle` - weekend/non-working days
4. `todayCellStyle` - today's date
5. `disabledCellStyle` - disabled dates
6. `anotherMonthCellStyle` - days outside current month
7. `dayCellStyle` - regular days

## Sample Apps

The features of the plugin are demonstrated in the Sample apps for:
- [NativeScript Core](https://github.com/NativeScript/nativescript-ui-samples)
- [NativeScript with Angular](https://github.com/NativeScript/nativescript-ui-samples-angular)
- [NativeScript with Vue.js](https://github.com/NativeScript/nativescript-ui-samples-vue)

## Release Notes

The release notes are available [here](https://github.com/NativeScript/nativescript-ui-feedback/blob/master/releases/calendar.md).

## Get Help

Please, use [github issues](https://github.com/NativeScript/nativescript-ui-feedback/issues) strictly for reporting bugs or requesting features.