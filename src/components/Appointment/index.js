import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm  from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "Saving";
  const DELETING = "Deleting"
  const CONFIRM = "Are you sure you would like to delete this meeting? This action cannot be undone.";
  const EDIT = "EDIT";
  const ERROR_SAVE = "An error occurred while saving.";
  const ERROR_DELETE = "An error occurred while deleting.";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  };

  const deleteAppointment = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }

  const handleTrashCanClick = () => {
    transition(CONFIRM);
  }

  const handleCancel = () => {
    transition(SHOW);
  }

  const handleEdit = () => {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
       <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={handleTrashCanClick}
          onEdit={handleEdit}
      />)}  
      {mode === CREATE && <Form onCancel={() => back()} onSave={save} interviewers={props.interviewers}/>}
      {mode === EDIT && <Form onCancel={() => back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === CONFIRM && <Confirm message={CONFIRM} onConfirm={deleteAppointment} onCancel={handleCancel}/>}
      {mode === ERROR_SAVE && <Error message={ERROR_SAVE} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={ERROR_DELETE} onClose={back}/>}
    </article>
  )
}