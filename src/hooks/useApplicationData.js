import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({...state, day});

  const updateSpots = (state, day, num) => {
    let days = [...state.days];
    for (let item of days) {
      if (day === item.name) {
        item.spots += num;
      }
    }
    console.log(days)
    return days;
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : interview
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, appointment)
    .then((res) => {
      setState(prev => ({...prev, appointments}))
    })
    .then(res => {
      setState(prev => ({...prev, days: updateSpots(state, state.day, -1)}))
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`)
    .then((res) => {
      setState(prev => ({...prev, appointments}))
    })
    .then(res => {
      setState(prev => ({...prev, days: updateSpots(state, state.day, 1)}))
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
    }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

