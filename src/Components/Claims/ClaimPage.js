import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getClaimById,
  getNotesByClaimId,
  getTasksByClaimId,
} from "../../Data/DataFunctions";
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
  const [note, setNote] = useState([]);
  const [task, setTask] = useState([]);
  const [claimDoesNotExist, setClaimDoesNotExist] = useState("");
  const [openTasks, setOpenTasks] = useState();

  useEffect(() => {
    if (params.claim) {
      loadClaim();
      loadNotes();
      loadTaskList();
    }
  }, [params.claim]);

  const loadClaim = () => {
    getClaimById(params.claim, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "SUCCESSFUL  200 received from getClaimById",
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
        if (error.response && error.response.status === 404) {
          console.log(
            "claim does not exist - catch error",
            error.response.status
          );
          setClaimDoesNotExist("Sorry, this claim does not exist");
        } else {
          console.log("something went wrong - catch error", error);
        }
      });
  };

  const loadTaskList = () => {
    getTasksByClaimId(
      params.claim,
      currentUser.user.name,
      currentUser.user.password
    )
      .then((response) => {
        console.log(
          "SUCCESSFUL 200 received from getTasksByClaimId",
          response.data
        );
        setTask(response.data);
        setOpenTasks(response.data.filter((task) => task.taskStatus === "O"));
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const checkClaimStatus = (claim) => {
    if (claim.claimStatus === "C" || claim.claimStatus === "R") {
      setArchived(true);
    } else {
      setArchived(false);
    }
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

  return (
    <>
      {claim ? (
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
                    isLoading={isLoading}
                    loadClaim={loadClaim}
                    loadNotes={loadNotes}
                    loadTaskList={loadTaskList}
                    task={task}
                    openTasks={openTasks}
                    setOpenTasks={setOpenTasks}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mt-xl-5 pt-xl-5 text-white">
                <h1>Tasks</h1>
              </div>
              <Task
                claim={claim}
                task={task}
                archived={archived}
                loadTaskList={loadTaskList}
                isLoading={isLoading}
                openTasks={openTasks}
                setOpenTasks={setOpenTasks}
              />
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
      ) : (
        <div className="content-container-color">
          <div className="container p-5">
            <div className="row">
              <div className="col-12 col-lg-8 offset-lg-2 text-center pt-5 mt-5">
                <h1 className="text-white">{claimDoesNotExist}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4 offset-lg-4 mt-5"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimPage;
