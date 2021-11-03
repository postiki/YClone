import './index.scss'
import {useEffect, useState} from "react";
import moment from "moment";
import UserService from "../../service/userService";

export default function Calendar() {
    let weekDay = [...moment.weekdaysShort().slice(1), moment.weekdaysShort().slice()[0]]

    const [currentMonth, setCurrentMonth] = useState(0)


    const [rows, setRows] = useState([])
    const [data, setData] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)


    useEffect(() => {
        UserService.getMonth().then(
            r => setData(r.data.date)
        )
    }, [])

    useEffect(() => {
        let setUpCalendar = () => {
            let blanks = [];
            for (let i = 0; i < moment().add(currentMonth, 'month').startOf('month').format('d') - 1; i++) {
                blanks.push(<td className="calendarDay empty">{""}</td>)
            }
            let daysInMonth = [];
            for (let d = 1; d <= moment().daysInMonth(); d++) {
                if (d.toString() === moment().format('D')) {
                    daysInMonth.push(<td className={data[d] ? 'calendarDay free today' : 'calendarDay disturb'}
                                         key={d}
                                         onClick={() => console.log(d)}>{d}</td>);
                } else {
                    daysInMonth.push(<td className={data[d] ? 'calendarDay free' : 'calendarDay disturb'} key={d}
                                         onClick={() => console.log(d)}>{d}</td>);
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
            setRows(rows)
            setShowCalendar(true)
        }
        if (data) {
            setUpCalendar()
        }
    }, [data, currentMonth])

    return (
        showCalendar && <div className='calendar'>
            <div className='navigation'>
                <div onClick={() => setCurrentMonth(prevState => prevState - 1)}>{"<"}</div>
                <div>{moment().add(currentMonth, 'month').format('MMMM')}</div>
                <div onClick={() => setCurrentMonth(prevState => prevState + 1)}>{">"}</div>
            </div>
            <table>
                <thead>
                <tr>
                    {weekDay.map(days => {
                        return <th key={days}>{days}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {rows.map(d => {
                    return <tr>{d}</tr>;
                })}
                </tbody>
            </table>
        </div>
    )
}