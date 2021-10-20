import './index.scss'
import {useEffect, useState} from "react";
import moment from "moment";
import axios from "axios";

export default function Calendar() {
    let weekDay = [...moment.weekdaysShort().slice(1), moment.weekdaysShort().slice()[0]]
    const [rows, setRows] = useState([])
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentYear, setCurrentYear] = useState(0)
    const [dateOfMonth, setDateOfMonth] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/date', {
            headers: {
                'x-access-token': document.cookie.split('=')[1]
            }
        })
            .then(r => setDateOfMonth(r.data.date))
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
                    daysInMonth.push(<td className={dateOfMonth[d] ? 'calendarDay free today' : 'calendarDay disturb'}
                                         key={d}
                                         onClick={() => console.log(d)}>{d}</td>);
                } else {
                    daysInMonth.push(<td className={dateOfMonth[d] ? 'calendarDay free' : 'calendarDay disturb'} key={d}
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
        if (dateOfMonth) {
            setUpCalendar()
        }
    }, [dateOfMonth, currentMonth])


    useEffect(() => {
        if (moment().add(currentMonth, 'month').format('MM') % 12 === 0) {
            setCurrentYear(s => s + 1)
        }
    }, [currentMonth])
    return (
        <>
            {showCalendar && <div className='calendar'>
                <div className='navigation'>
                    <div onClick={() => setCurrentMonth(prevState => prevState - 1)}>{"<"}</div>
                    <div
                        onClick={() => setCurrentMonth(0)}>{moment().add(currentMonth, 'month').format('MMMM') + '' + moment().add(currentYear, 'year').format('YYYY')}</div>
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
            </div>}
        </>
    )
}