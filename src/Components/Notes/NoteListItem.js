const NoteListItem = (props) => {

  const noteDate = new Date(props.note.noteDate);
  const date = noteDate.toISOString().slice(0, 10);
  const time = noteDate.toLocaleTimeString();

  return (
    <>
      <li className="list-group-item">
        <div className="row align-items-center">
          <div className="col-3">
            <b>
              {date}<br></br>{time}
            </b>
          </div>
          <div className="col-9">{props.note.noteText}</div>
        </div>
      </li>
    </>
  );
};
export default NoteListItem;
