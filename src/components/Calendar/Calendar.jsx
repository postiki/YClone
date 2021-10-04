import moment from "moment";
import './index.scss'

export default function Calendar() {
    let weekDay = moment.weekdaysShort()

    let firstDay = moment().startOf("month").format("d")
    let today = moment().format('D')

    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
        blanks.push(<td className="calendar-day empty">{""}</td>)
    }

    let daysInMonth = [];
    for (let d = 1; d <= moment().daysInMonth(); d++) {
        if (d.toString() === today) {
            daysInMonth.push(<td className="calendarDay today" onClick={() => console.log(d)}>{d}</td>);
        } else {
            daysInMonth.push(<td className="calendarDay" onClick={() => console.log(d)}>{d}</td>);
        }
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if (i === totalSlots.length - 1) {
            rows.push(cells);
        }
    });

    return (
        <div className='calendar'>
            <div className='navigation'>
                <div>{"<"}</div>
                <div>{moment().format('MMMM')}</div>
                <div>{">"}</div>
            </div>
            <table>
                <thead>
                <tr>
                    {weekDay && weekDay.map(days => {
                        return <th key={days}>{days}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {rows && rows.map((d, i) => {
                    return <tr>{d}</tr>;
                })}
                </tbody>
            </table>
        </div>
    )
}