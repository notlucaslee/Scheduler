const getAppointmentsForDay = (state, day) => {
  let appointmentsArray = [];
  for (let item of state.days) {
    if (item.name === day) {
      appointmentsArray = item.appointments;
    }
  }
  return appointmentsArray.map(id => state.appointments[id]);
};

const getInterviewersForDay = (state, day) => {
  let interviewersArray = [];
  for (let item of state.days) {
    if (item.name === day) {
      interviewersArray = item.interviewers;
    }
  }
  return interviewersArray.map(id => state.interviewers[id]);
};

const getInterview = (state, interview) => {
  return (interview ? {...interview, interviewer: state.interviewers[interview.interviewer]} : null);
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }

