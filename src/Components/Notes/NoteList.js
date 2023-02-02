import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import { getNotesByClaimId } from "../../Data/DataFunctions";
import Note from "./Note";
import loadingGif from "../../../src/giphy.gif";

const NoteList = (props) => {
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    loadNoteList();
  }, []);

  const loadNoteList = () => {
    setIsLoading(true);
    getNotesByClaimId(
      props.claim.id,
      currentUser.user.name,
      currentUser.user.password
    )
      .then((response) => {
        setNote(response.data);
        console.log("note data received", response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  return (
    <>
      <div className="mt-5 mb-5">
        <h2 className="mb-4 text-center">Notes</h2>
        <div className="text-center">
          {isLoading && (
            <img src={loadingGif} alt="wait until the page loads" />
          )}
        </div>
        {!isLoading && (
          <>
            {note.length === 0 && (
              <div className="text-center p-2">
                <p>No notes</p>
              </div>
            )}
            <ul className="notes list-group list-group-flush">
              {note.map((note, index) => (
                <Note note={note} key={index} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default NoteList;
