import React, { useState, useEffect } from "react";
import DayList from './DayList'
import "components/Application.scss";
import Appointment from "components/Appointment/"
import axios from 'axios';
import { getAppointmentsForDay, getInterview }from '../helpers/selectors'

// const app = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Ashley Barr",
//       interviewer: {
//         id: 1,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Dalai Lama",
//       interviewer: {
//         id: 1,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "6pm",
//     interview: {
//       student: "Mahatma Gandhi",
//       interviewer: {
//         id: 1,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }
// ];


export default function Application(props) {
  
  const setDay = (day) => setState({ ...state, day });


  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log(`from Application//dailyAppointments`, state.interviewers)

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
    )
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      // const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  
  console.log(`After useEffect`, state)
  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
          
      </section>
      <section className="schedule">
        {/* {schedule} */}
        {dailyAppointments
        .map((appointment) => {
            return <Appointment key={appointment.id} {...appointment} />;
          })}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}