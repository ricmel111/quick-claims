import { useContext, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewNote, updateClaim } from "../../Data/DataFunctions";
import { UserContext } from "../../Contexts/UserContexts";
import loadingGif from "../../../src/giphy.gif";

const ClaimForm = (props) => {
  const [changeStatusSelected, setChangeStatusSelected] = useState("");
  const { handleSubmit, reset } = useForm();
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [PolicyTypeSelected, setPolicyTypeSelected] = useState("");
  const currentUser = useContext(UserContext);
  const [touched, setTouched] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tasksMessage, setTasksMessage] = useState("");

  const resetState = () => {
    noteState.noteText = "";
    state.paymentAmount = props.claim.paymentAmount;
    state.claimStatus = props.claim.claimStatus;
    state.policyNumber = props.claim.policyNumber;
    state.policyType = props.claim.policyType;
    state.propertyAddress = props.claim.propertyAddress;
    state.vehicleMake = props.claim.vehicleMake;
    state.vehicleModel = props.claim.vehicleModel;
    state.manufactureYear = props.claim.manufactureYear;
    state.typeOfAnimal = props.claim.typeOfAnimal;
    state.breedOfAnimal = props.claim.breedOfAnimal;
    state.firstName = props.claim.firstName;
    state.lastName = props.claim.lastName;
    state.claimStartDate = props.claim.claimStartDate;
    state.estimatedAmount = props.claim.estimatedAmount;
    state.claimReason = props.claim.claimReason;
    state.incidentDescription = props.claim.incidentDescription;
    state.incidentDate = props.claim.incidentDate;
    state.furtherDetails = props.claim.furtherDetails;
  };

  const initialState = {
    noteText: "",
    id: props.claim.id,
    claimStatus: props.claim.claimStatus,
    paymentAmount: props.claim.paymentAmount,
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
    furtherDetails: props.claim.furtherDetails,
  };

  const noteInitialState = {
    noteDate: "",
    noteText: "",
    claimId: props.claim.id,
  };

  const formReducer = (state, data) => {
    return { ...state, [data.field]: data.value };
  };

  const noteFormReducer = (noteState, data) => {
    return { ...noteState, [data.field]: data.value };
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const [noteState, noteDispatch] = useReducer(
    noteFormReducer,
    noteInitialState
  );

  const handleStatusChange = (event) => {
    if (event.target.value === "A" || event.target.value === "C") {
      props.loadTaskList();
      //props.setOpenTasks(props.task.filter(task => task.taskStatus === "O"));
    } else {
      setTasksMessage("");
      setSubmitDisabled(false);
    }

    setChangeStatusSelected(event.target.value);
    handleChange(event);
  };

  useEffect((event) => {
    if ((props.openTasks) && (changeStatusSelected === "C" || changeStatusSelected === "A")) {
      console.log("OpenTasks1", props.openTasks);
      if (props.openTasks.length > 0) {
        console.log("OpenTasks2", props.openTasks);
        setSubmitDisabled(true);
        setTasksMessage(
          "You have open tasks. Please complete them before submitting."
        );
      } else {
        setSubmitDisabled(false);
        setTasksMessage("");
      }
    }
  }, [props.openTasks]);

  const handlePolicyType = (event) => {
    setPolicyTypeSelected(event.target.value);
    handleChange(event);
  };

  const handleChange = (event) => {
    setTouched(true);
    if (event.target.id === "noteText") {
      noteDispatch({ field: event.target.id, value: event.target.value });
    } else {
      dispatch({ field: event.target.id, value: event.target.value });
    }
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (editable) {
      const updatedFields = {};
      updatedFields.id = state.id;
      Object.entries(state).forEach(([field, value]) => {
        if (value !== initialState[field]) {
          updatedFields[field] = value;
        }
      });

      setMessage("Saving...");
      updateClaim(updatedFields, currentUser.user.name, currentUser.user.password)
        .then((response) => {
          if (response.status === 200) {
            setMessage("Claim " + response.data.id + " was updated");
            props.loadClaim();
            noteState.noteText = "";
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
              props.loadNotes();
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

  const clearForm = () => {
    reset();
    resetState();
    props.loadClaim();
    setChangeStatusSelected("");
    noteState.noteText = "";
    setEditable(false);
    setTouched(false);
    setTasksMessage("");
    setSubmitDisabled(false);
  };

  return (
    <>
      <div className="text-center">
        {props.isLoading && (
          <img src={loadingGif} alt="wait until the page loads" />
        )}
      </div>
      {!props.isLoading && (
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
                <option value="H">High Value</option>
                <option value="R">Rejected</option>
                <option value="P">Assessed - In Progress</option>
                <option value="A">Accepted - Awaiting Payment</option>
                {props.accepted && (
                  <option value="C">Accepted - Paid</option>
                )}
              </select>
              <p className="text-danger mt-2">{tasksMessage}</p>
            </div>
          </div>
          {changeStatusSelected !== props.claim.claimStatus &&
            changeStatusSelected !== "" && (
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
                    required={true}
                  />
                </div>
              </div>
            )}
          {(props.claim.claimStatus === "A" ||
            changeStatusSelected === "A" || 
            props.claim.claimStatus === "C" ||
            changeStatusSelected === "C") && (
            <div className="form-group row">
              <label
                htmlFor="paymentAmount"
                className="col-sm-5 col-form-label"
              >
                Payment Amount
              </label>
              <div className="col-sm-7">
                <span id="dollar">
                  <input
                    type="number"
                    className="form-control"
                    id="paymentAmount"
                    value={state.paymentAmount || undefined}
                    onChange={handleChange}
                    disabled={!editable}
                    required={true}
                  />
                </span>
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
                <label
                  htmlFor="vehicleMake"
                  className="col-sm-5 col-form-label"
                >
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
                <label
                  htmlFor="vehicleModel"
                  className="col-sm-5 col-form-label"
                >
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
                <label
                  htmlFor="typeOfAnimal"
                  className="col-sm-5 col-form-label"
                >
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
            <label
              htmlFor="estimatedAmount"
              className="col-sm-5 col-form-label"
            >
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
            <label
              htmlFor="incidentDescription"
              className="col-5 col-form-label"
            >
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
                value={state.incidentDate || ""}
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
          {!props.archived && (
            <div className="form-group row mt-4">
              <div className="col-4 offset-5">
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="btn btn-primary w-100"
                >
                  {editable ? "Save Claim" : "Edit Claim"}
                </button>
              </div>
              <div className="col-3">
                <button
                  onClick={clearForm}
                  type="button"
                  className="btn btn-secondary w-100"
                  disabled={!touched}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          <div className="text-center text-danger">{message}</div>
        </form>
      )}
    </>
  );
};

export default ClaimForm;
