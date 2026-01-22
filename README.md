# NativeScript UI Calendar

- [Overview](#overview)
- [Installation](#installation)
- [Documentation](#documentation)
- [API Reference](#api-reference)
- [Custom Non-Working Days (iOS)](#custom-non-working-days-ios)
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

## Custom Non-Working Days (iOS)

This fork adds support for custom non-working days in month view. Non-working days are styled using `weekendCellStyle`.

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

## Sample Apps

The features of the plugin are demonstrated in the Sample apps for:
- [NativeScript Core](https://github.com/NativeScript/nativescript-ui-samples)
- [NativeScript with Angular](https://github.com/NativeScript/nativescript-ui-samples-angular)
- [NativeScript with Vue.js](https://github.com/NativeScript/nativescript-ui-samples-vue)

## Release Notes

The release notes are available [here](https://github.com/NativeScript/nativescript-ui-feedback/blob/master/releases/calendar.md).

## Get Help

Please, use [github issues](https://github.com/NativeScript/nativescript-ui-feedback/issues) strictly for reporting bugs or requesting features.