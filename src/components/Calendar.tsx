import Table from "react-bootstrap/Table";
import CalendarRow from "./CalendarRow";
import CalendarHeaders from "./CalendarHeader";
import { getEndDate, getYesterday } from '../utils/dateUtils';
import { CalendarProps } from "../models/Interfaces";

const Calendar: React.FC<CalendarProps> = ({ numDays, rooms, forceCalendarRender }) => (
    <Table striped bordered hover responsive className="no-select calendar-table" size="sm" >
        <thead>
            <CalendarHeaders numDays={numDays} />
        </thead>
        <tbody>
            {rooms.map((room) => (
                <CalendarRow
                    room={room}
                    startDate={getYesterday()}
                    endDate={getEndDate(numDays)}
                    forceCalendarRender={forceCalendarRender}
                />
            ))}
        </tbody>
    </Table>
)

export default Calendar;