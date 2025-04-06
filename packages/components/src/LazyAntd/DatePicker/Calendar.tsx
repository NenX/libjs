import * as React from 'react';
import { CalendarInner, CalendarProps } from './Base';
import { Dayjs } from 'dayjs'

const Calendar_L = React.forwardRef<any, CalendarProps>((props, ref) => {
    return <CalendarInner {...props} />;
});

Calendar_L.displayName = 'TimePicker';

export {
    Dayjs,
    Calendar_L,
    CalendarProps
};
