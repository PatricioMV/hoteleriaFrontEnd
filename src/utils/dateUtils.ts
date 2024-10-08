import moment, { Moment } from "moment";
import { CalendarHeaderDays, Day, Reservation, Room } from "../models/Interfaces";


export const getYesterday = () => {
    return moment().subtract(1, 'days')
}

export const getEndDate = (num: number) => {
    return moment().add(num - 1, 'days');
}

export const generateHeadersDays = (amountOfDates: number): CalendarHeaderDays[] => {
    const days: CalendarHeaderDays[] = [];
    const today = moment();
    const yesterday = getYesterday();
    const cutoffDate = moment(yesterday).add(amountOfDates, 'days');
    while (yesterday.isBefore(cutoffDate)) {
        if (yesterday.isSame(today)) { // Fijarse si es necesario que tenga algo difente el dia {today}
            days.push({ date: yesterday.format('DD/MM'), class: "today-calendar-header" });
            yesterday.add(1, 'days');
        } else {
            days.push({ date: yesterday.format('DD/MM'), class: 'calendar-header' });
            yesterday.add(1, 'days');
        }
    }
    return days;
};

export const generateCalendarDays = ( room: Room, startDate: moment.Moment, endDate: moment.Moment, reservations: Reservation[]): Day[] => {
    const days: Day[] = [];
    let auxDate = startDate.clone();
    while (auxDate.isBefore(endDate)) {
      const formattedDate = auxDate.format('YYYY-MM-DD');
      const reservation = reservations.find((r) => auxDate.isBetween(moment(r.checkIn), moment(r.checkOut), null, '[]'));
      if (reservation != undefined) {
        days.push({
          date: formattedDate,
          room: {
            ...room,
            occupied: true,
          },
          isReserved: true,
          reservation: reservation,
          colspan: reservation.nightsStayed,
        });
        auxDate.add(reservation.nightsStayed, 'days');
      } else {
        days.push({
          date: formattedDate,
          room: room,
          isReserved: false,
          colspan: 1,
        });
        auxDate.add(1, 'days');
      }
    }
    return days;
  };

export const getTomorrow = (date: string) => {
    const today = moment(date);
    const tomorrow = today.clone().add(1, 'day');
    return tomorrow.format('YYYY-MM-DD');
}

export const isSameOrBefore = (dateOne: string, dateTwo: string) => {
    return moment(dateOne).isSameOrBefore(moment(dateTwo));
}

export const isDateBeforeToday = (date: string) => {
    const now = moment().startOf('day');   
    const dateToCheck = moment(date).startOf('day');  
    return dateToCheck.isBefore(now);
}

//De aca a abajo no se uso

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


