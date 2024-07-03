import moment, { Moment } from "moment";

export const getTomorrow = (date: string) => {
    const today = moment(date);
    const tomorrow = today.clone().add(1, 'day');
    return tomorrow.format('YYYY-MM-DD');
}

export const formatDateDB = (date: Moment): string => {
    return date.format('YYYY-MM-DD');
};

export const daysBetweenDates = (startDate: Moment, endDate: Moment): number => {
    return endDate.diff(startDate, 'days');
};

export const isDateInRange = (date: Moment, startDate: Moment, endDate: Moment): boolean => {
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
};

export const addDaysToDate = (date: Moment, days: number): Moment => {
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


export const getYesterday = () => {
    return moment().subtract(1, 'days')
}

export const getEndDate = (num: number) => {
    return moment().add(num - 1, 'days');
}