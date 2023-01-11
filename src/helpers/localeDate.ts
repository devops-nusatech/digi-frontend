import moment from 'moment-timezone';
import { getTimezone } from './timezone';

type type = 'fullDate' | 'shortDate' | 'time';

export const localeDate = (date, format: type, timezone = getTimezone()) => {
    const getFormat = type => {
        return {
            fullDate: 'DD-MM-YYYY HH:mm:ss',
            shortDate: 'DD-MM-YYYY HH:mm',
            time: 'HH:mm:ss',
          }[type];
    };
    const formatDisplay = getFormat(format);
    const isUnix = typeof date === 'number';
    const momentObj = isUnix ? moment.unix(date) : moment(date);

    return momentObj.tz(timezone).format(formatDisplay);
};
