import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClaimById } from "../../Data/DataFunctions";
import NoteList from "../Notes/NoteList";
import NewTaskForm from "../Tasks/NewTaskForm";
import TaskList from "../Tasks/TaskList";
import ClaimForm from "./ClaimForm";
import { UserContext } from "../../Contexts/UserContexts";

const ClaimPage = () => {
  const params = useParams();
  const [archived, setArchived] = useState(false);
  const [claim, setClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (params.claim) {
    getClaimById(params.claim, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setClaim(response.data);
          console.log("SUCCESSFUL 200 received from getClaimById", response.data)
        } else {
          console.log("something went wrong", response.status);
        }
      })
      .catch((error) => {
        console.log("something went wrong", error);
      })};
  }, [params.claim]);

  return (
    <>
    {claim && (
      <div className="container content-container p-5 pt-0">
        <div className="row">
          <div className="text-center mt-5 pt-5 text-white">
            <h1>
              <strong>Claim {claim.claimNumber}</strong>
            </h1>
            {claim.claimStatus !== "C" && claim.claimStatus !== "R" && claim.claimStatus !== "H" ? (
              <p className="lead">View and  Edit claim here</p>
            ) : (
              <p className="lead">ARCHIVED</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 card" id="claimForm">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <ClaimForm claim={claim} archived={archived}/>
                </div>
                <div className="col-12 col-lg-6">
                  <TaskList claim={claim} archived={archived}/>
                  <NewTaskForm claim={claim} archived={archived}/>
                  <NoteList claim={claim} archived={archived}/>
                </div>
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
