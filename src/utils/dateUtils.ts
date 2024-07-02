import moment, { Moment } from "moment";

export const formatDateDB = (date: moment.Moment): string => {
    return date.format('YYYY-MM-DD');
};

export const daysBetweenDates = (startDate: moment.Moment, endDate: moment.Moment): number => {
    return endDate.diff(startDate, 'days');
};

export const isDateInRange = (date: moment.Moment, startDate: moment.Moment, endDate: moment.Moment): boolean => {
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
};

export const addDaysToDate = (date: moment.Moment, days: number): moment.Moment => {
    return date.clone().add(days, 'days');
};

export const getDatesInRange = (startDate: Moment, endDate: Moment): string[] => {
    const dates: string[] = [];
    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate, "day")) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
    }
    return dates;
};

// Otras funciones relacionadas con fechas...