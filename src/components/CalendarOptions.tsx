import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CalendarOptionsProps } from "../models/Interfaces";


const CalendarOptions: React.FC<CalendarOptionsProps> = ({
    numDays, handleNumDaysChange, filterUnavailable,
    handleFilterUnavailableChange, filterEmpty, handleFilterEmptyChange
}) => (
    <Row className='calendar-options'>
        <Col md={6}>
            <label htmlFor="numDays">Show:</label>
            <select id="numDays" value={numDays} onChange={handleNumDaysChange}>
                <option value={7}>7 days</option>
                <option value={15}>15 days</option>
                <option value={30}>30 days</option>
            </select>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
            <div className="checkbox-group">
                <div>
                    <input
                        type="checkbox"
                        id="filterUnavailable"
                        checked={filterUnavailable}
                        onChange={handleFilterUnavailableChange}
                    />
                    <label htmlFor="filterUnavailable" className='no-select'>Filter out-of-service rooms</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="filterEmpty"
                        checked={filterEmpty}
                        onChange={handleFilterEmptyChange}
                    />
                    <label htmlFor="filterEmpty" className='no-select'>Filter empty rooms</label>
                </div>
            </div>
        </Col>
    </Row>
)

export default CalendarOptions;