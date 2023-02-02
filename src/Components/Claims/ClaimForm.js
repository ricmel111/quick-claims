import { useEffect, useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewNote, getClaimById, updateClaim } from "../../Data/DataFunctions";
import { UserContext } from "../../Contexts/UserContexts";
import loadingGif from "../../../src/giphy.gif";

const ClaimForm = (props) => {
  const [changeStatusSelected, setChangeStatusSelected] = useState(false);
  const { handleSubmit } = useForm();
  const [editable, setEditable] = useState(false);

  const [message, setMessage] = useState("");
  const [PolicyTypeSelected, setPolicyTypeSelected] = useState("");
  const currentUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    if (props.claim.id) {
    getClaimById(props.claim.id)
      .then((response) => {
        if (response.status === 200) {
          console.log("SUCCESSFUL 200 response received from getClaimById", response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
          checkArchived(response.data.claimStatus);
        } else {
          console.log("something went wrong", response.status);
        }
      })
      .catch((error) => {
        console.log("something went wrong", error);
      })};
  }, [props.claim.id]);

  const checkArchived = (claimStatus) => {
    console.log("check archived 1", claims);
    if (claimStatus === "C" || claimStatus === "R") {
      setArchived(!archived);
    }
  };

  const initialState = {
    id: props.claim.id,
    claimStatus: props.claim.claimStatus,
    policyNumber: props.claim.policyNumber,
    policyType: props.claim.policyType,
    propertyAddress: props.claim.propertyAddress,
    vehicleMake: props.claim.vehicleMake,
    vehicleModel: props.claim.vehicleModel,
    manufactureYear: props.claim.manufactureYear,
    typeOfAnimal: props.claim.typeOfAnimal,
    breedOfAnimal: props.claim.breedOfAnimal,
    firstName: props.claim.firstName,
    lastName: props.claim.lastName,
    claimStartDate: props.claim.claimStartDate,
    estimatedAmount: props.claim.estimatedAmount,
    claimReason: props.claim.claimReason,
    incidentDescription: props.claim.incidentDescription,
    incidentDate: props.claim.incidentDate,
    furtherDetails: props.claim.furtherDetails
  };

  const noteInitialState = {
    noteDate: new Date().toISOString().slice(0, 10),
    noteText: "",
    claimId: props.claim.id
  }

  const formReducer = (state, data) => {
    return { ...state, [data.field]: data.value };
  };

  const noteFormReducer = (noteState, data) => {
    return { ...noteState, [data.field]: data.value };
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const [noteState, noteDispatch] = useReducer(noteFormReducer, noteInitialState);

  const handleChange = (event) => {

    if (event.target.id === "noteText") {
      noteDispatch({ field: event.target.id, value: event.target.value });
    } else {
      dispatch({ field: event.target.id, value: event.target.value });
    }
  };

  const handleStatusChange = (event) => {
    setChangeStatusSelected(event.target.value);
    handleChange(event);
  };

  const handlePolicyType = (event) => {
    setPolicyTypeSelected(event.target.value);
    handleChange(event);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (editable) {
      setMessage("Saving...");
      updateClaim(state, currentUser.user.name, currentUser.user.password)
        .then((response) => {
          if (response.status === 200) {
            setMessage("Claim " + response.data.id + " was updated");
          } else {
            setMessage(
              "Something went wrong - status code was " + response.status
            );
          }
        })
        .catch((error) => {
          setMessage("Something went wrong - " + error);
        });
        if (noteState.noteText) {
      addNewNote(noteState, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Note " + response.data.id + " was added");
        } else {
          setMessage(
            "Something went wrong - status code was " + response.status
          );
        }
      })
      .catch((error) => {
        setMessage("Something went wrong - " + error);
      });
    }
  }

    setEditable(!editable);
  };

  return (
    <>
    <div className="text-center">
    {isLoading && <img src={loadingGif} alt="wait until the page loads" />}
    </div>
    {!isLoading &&
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="claimStatus" className="col-sm-5 col-form-label">
            Claim Status
          </label>
          <div className="col-sm-7">
            <select
              id="claimStatus"
              className="form-select"
              value={state.claimStatus}
              onChange={handleStatusChange}
              disabled={!editable}
            >
              <option value="O">Awaiting Assessment</option>
              <option value="P">In Progress</option>
              <option value="R">Rejected</option>
              <option value="A">Awaiting Payment</option>
              <option value="C">Paid&nbsp;&amp;&nbsp;Closed</option>
              <option value="H">High Value</option>
            </select>
          </div>
        </div>
        {changeStatusSelected !== props.claim.claimStatus &&
          changeStatusSelected != "" && (
            <div className="form-group row">
              <label htmlFor="note" className="col-sm-5 col-form-label">
                Add note
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="noteText"
                  value={noteState.noteText}
                  onChange={handleChange}
                  placeholder="Add note here"
                  disabled={!editable}
                />
              </div>
            </div>
          )}
        <hr></hr>
        <div className="form-group row">
          <label htmlFor="policyNumber" className="col-sm-5 col-form-label">
            Policy Number
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="policyNumber"
              value={state.policyNumber}
              onChange={handleChange}
              placeholder="Policy Number"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="policyType" className="col-sm-5 col-form-label">
            Insurance Type
          </label>
          <div className="col-sm-7">
            <select
              id="policyType"
              className="form-select"
              value={state.policyType}
              onChange={handlePolicyType}
              disabled={!editable}
            >
              <option value="Property">Property</option>
              <option value="Motor">Motor</option>
              <option value="Pet">Pet</option>
            </select>
          </div>
        </div>
        {state.policyType === "Property" && (
          <div className="form-group row">
            <label
              htmlFor="propertyAddress"
              className="col-sm-5 col-form-label"
            >
              Property Address
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                id="propertyAddress"
                value={state.propertyAddress}
                onChange={handleChange}
                placeholder="Property Address"
                disabled={!editable}
              />
            </div>
          </div>
        )}
        {state.policyType === "Motor" && (
          <>
            <div className="form-group row">
              <label htmlFor="vehicleMake" className="col-sm-5 col-form-label">
                Make of Vehicle
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="vehicleMake"
                  value={state.vehicleMake}
                  onChange={handleChange}
                  placeholder="Make of Vehicle"
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="vehicleModel" className="col-sm-5 col-form-label">
                Model of Vehicle
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="vehicleModel"
                  value={state.vehicleModel}
                  onChange={handleChange}
                  placeholder="Model of Vehicle"
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="manufactureYear"
                className="col-sm-5 col-form-label"
              >
                Year of Manufacture
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="manufactureYear"
                  value={state.manufactureYear}
                  onChange={handleChange}
                  placeholder="Year of Manufacture"
                  disabled={!editable}
                />
              </div>
            </div>
          </>
        )}
        {state.policyType === "Pet" && (
          <>
            <div className="form-group row">
              <label htmlFor="typeOfAnimal" className="col-sm-5 col-form-label">
                Type of Animal
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="typeOfAnimal"
                  value={state.typeOfAnimal}
                  onChange={handleChange}
                  placeholder="Type of Animal"
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="breedOfAnimal"
                className="col-sm-5 col-form-label"
              >
                Breed of Animal
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="breedOfAnimal"
                  value={state.breedOfAnimal}
                  onChange={handleChange}
                  placeholder="Breed of Animal"
                  disabled={!editable}
                />
              </div>
            </div>
          </>
        )}
        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-5 col-form-label">
            First Name
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={state.firstName}
              onChange={handleChange}
              placeholder="First Name"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastName" className="col-sm-5 col-form-label">
            Last Name
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={state.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="claimStartDate" className="col-sm-5 col-form-label">
            Claim Start Date
          </label>
          <div className="col-sm-7">
            <input
              type="date"
              className="form-control"
              id="claimStartDate"
              value={state.claimStartDate}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="estimatedAmount" className="col-sm-5 col-form-label">
            Estimated Claim Amount
          </label>
          <div className="col-sm-7">
            <span id="dollar">
              <input
                type="number"
                className="form-control"
                id="estimatedAmount"
                value={state.estimatedAmount}
                onChange={handleChange}
                disabled={!editable}
              />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="claimReason" className="col-sm-5 col-form-label">
            Reason for the claim
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="claimReason"
              value={state.claimReason}
              onChange={handleChange}
              placeholder="Reason for the claim"
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="incidentDescription" className="col-5 col-form-label">
            Description of Incident
          </label>
          <div className="col-7">
            <textarea
              cols="40"
              rows="5"
              className="form-control"
              id="incidentDescription"
              value={state.incidentDescription}
              onChange={handleChange}
              placeholder="Description of Incident"
              disabled={!editable}
            ></textarea>
          </div>
        </div>
        <hr></hr>
        <div className="form-group row">
          <label htmlFor="incidentDate" className="col-sm-5 col-form-label">
            Claim Incident Date
          </label>
          <div className="col-sm-7">
            <input
              type="date"
              className="form-control"
              id="incidentDate"
              value={state.incidentDate}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="furtherDetails" className="col-5 col-form-label">
            Further Details
          </label>
          <div className="col-7">
            <textarea
              cols="40"
              rows="5"
              className="form-control"
              id="furtherDetails"
              value={state.furtherDetails}
              onChange={handleChange}
              placeholder="Further Details"
              disabled={!editable}
            ></textarea>
          </div>
        </div>
        {!archived && (
          <div className="row mt-4">
            <button type="submit" className="btn btn-primary col-7 offset-5">
              {editable ? "Save Claim" : "Edit Claim"}
            </button>
          </div>
        )}
        <div className="text-center text-danger">{message}</div>
      </form>
}
    </>
  );
};

export default ClaimForm;
