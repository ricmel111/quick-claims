import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClaimById, getNotesByClaimId } from "../../Data/DataFunctions";
import NoteList from "../Notes/NoteList";
import ClaimForm from "./ClaimForm";
import { UserContext } from "../../Contexts/UserContexts";
import Task from "../Tasks/Task";

const ClaimPage = () => {
  const params = useParams();
  const [archived, setArchived] = useState();
  const [claim, setClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);
  const [awaitingAssessment, setAwaitingAssessment] = useState(false);
  const [note, setNote] = useState([]);

  useEffect(() => {
    if (params.claim) {
      loadClaim();
      loadNotes();
    }
  }, [params.claim]);

  const loadClaim = () => {
    getClaimById(params.claim, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "SUCCESSFUL 200 received from getClaimById",
            response.data
          );
          setClaim(response.data);
          checkClaimStatus(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        } else {
          console.log("something went wrong", response.status);
        }
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const loadNotes = () => {
    setIsLoading(true);
    getNotesByClaimId(
      params.claim,
      currentUser.user.name,
      currentUser.user.password
    )
      .then((response) => {
        console.log(
          "SUCCESSFUL 200 received from getNotesByClaimId",
          response.data
        );
        setNote(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const checkClaimStatus = (claim) => {
    if (claim.claimStatus === "O") {
      setAwaitingAssessment(true);
    } else 
      setAwaitingAssessment(false);
    if (claim.claimStatus === "C" || claim.claimStatus === "R") {
      setArchived(true);
    }
  };

  return (
    <>
      {claim && (
        <div className="container-fluid content-container p-5 pt-0">
          <div className="row">
            <div className="col-lg-6">
              <div className="mt-5 pt-5 text-white" style={{ display: "flex" }}>
                <h1>Claim {claim.id}</h1>
                {archived && (
                  <p style={{ margin: "21px 0px 0px 10px" }}>ARCHIVED</p>
                )}
              </div>
              <div className="card mb-5" id="claimForm">
                <div className="card-body">
                  <ClaimForm
                    claim={claim}
                    archived={archived}
                    awaitingAssessment={awaitingAssessment}
                    isLoading={isLoading}
                    loadClaim={loadClaim}
                    loadNotes={loadNotes}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mt-xl-5 pt-xl-5 text-white">
                <h1>Tasks</h1>
              </div>
              <Task claim={claim} archived={archived} />
              <div className="mt-5 text-white">
                <h1>Notes</h1>
              </div>
              <div className="card">
                <div className="card-body">
                  <NoteList
                    note={note}
                    archived={archived}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimPage;
