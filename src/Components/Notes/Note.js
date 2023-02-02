const Note = (props) => {
  return (
    <>
      <li className="list-group-item">
        <div className="row align-items-center">
          <div className="col-3">
            <b>{props.note.noteDate}</b>
          </div>
          <div className="col-9">
            {props.note.noteText}</div>
        </div>
      </li>
    </>
  );
};
export default Note;
