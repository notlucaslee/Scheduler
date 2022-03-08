const getAppointmentsForDay = (state, day) => {
  let appointmentsArray = [];
  for (let item of state.days) {
    if (item.name === day) {
      appointmentsArray = item.appointments;
    }
  }
  return appointmentsArray.map(id => state.appointments[id]);
};

const getInterview = (state, interview) => {
  if (interview) {
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview    
  }
  return null
}

export { getAppointmentsForDay, getInterview }

