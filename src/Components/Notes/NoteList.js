import Note from "./Note";
import loadingGif from "../../../src/giphy.gif";

const NoteList = (props) => {

  return (
    <>
      <div>
        <div className="text-center">
          {props.isLoading && (
            <img src={loadingGif} alt="wait until the page loads" />
          )}
        </div>
        {!props.isLoading && (
          <>
            {props.note.length === 0 && (
              <div className="text-center p-2">
                <span>No notes</span>
              </div>
            )}
            <ul className="notes list-group list-group-flush">
              {props.note.map((note, index) => (
                <Note note={note} key={index} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default NoteList;
