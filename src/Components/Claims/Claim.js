import { getClaimById, updateClaim } from "../../Data/DataFunctions";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import NoteList from "../Notes/NoteList";
import TaskList from "../Tasks/TaskList";
import NewTaskForm from "../Tasks/NewTaskForm";

const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [insuranceTypeSelected, setInsuranceTypeSelected] = useState("");
  const [changeStatusSelected, setChangeStatusSelected] = useState(false);
  const { handleSubmit } = useForm();
  const params = useParams();
  const [editable, setEditable] = useState(false);
  const [archived, setArchived] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    getClaimById(params.claim)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          console.log("APIT RESPONSE ", response.data);
          console.log("claims ", claims);
          dispatch({
            field: "id",
            value: response.data.id,
          });
          dispatch({
            field: "claimStatus",
            value: response.data.claimStatus,
          });
          dispatch({
            field: "policyNumber",
            value: response.data.policyNumber,
          });
          dispatch({
            field: "claimInsuranceType",
            value: response.data.policyType,
          });
          dispatch({
            field: "propertyAddress",
            value: response.data.propertyAddress,
          });
          dispatch({
            field: "vehicleMake",
            value: response.data.vehicleMake,
          });
          dispatch({
            field: "vehicleModel",
            value: response.data.vehicleModel,
          });
          dispatch({
            field: "manufactureYear",
            value: response.data.manufactureYear,
          });
          dispatch({
            field: "typeOfAnimal",
            value: response.data.typeOfAnimal,
          });
          dispatch({
            field: "breedOfAnimal",
            value: response.data.breedOfAnimal,
          });
          dispatch({
            field: "firstName",
            value: response.data.firstName,
          });
          dispatch({
            field: "lastName",
            value: response.data.lastName,
          });
          dispatch({
            field: "claimStartDate",
            value: response.data.claimStartDate,
          });
          dispatch({
            field: "estimatedAmount",
            value: response.data.estimatedAmount,
          });
          dispatch({
            field: "claimReason",
            value: response.data.claimReason,
          });
          dispatch({
            field: "incidentDescription",
            value: response.data.incidentDescription,
          });
          dispatch({
            field: "incidentDate",
            value: response.data.incidentDate,
          });
          dispatch({
            field: "furtherDetails",
            value: response.data.furtherDetails,
          });
        } else {
          console.log("something went wrong", response.status);
        }
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  useEffect(() => {
    checkClaimStatus();
  }, []);

  const checkClaimStatus = () => {
    console.log("check archived 1", claims);
    if (claims.claimStatus === "C" || claims.claimStatus === "R") {
      setArchived(!archived);
    }
  };
  
  const initialState = {
    id: "",
    claimStatus: "",
    note: "",
    policyNumber: "",
    claimInsuranceType: "",
    propertyAddress: "",
    vehicleMake: "",
    vehicleModel: "",
    manufactureYear: "",
    typeOfAnimal: "",
    breedOfAnimal: "",
    firstName: "",
    lastName: "",
    claimStartDate: new Date().toISOString().slice(0, 10),
    estimatedAmount: "",
    claimReason: "",
    incidentDescription: "",
    incidentDate: "",
    furtherDetails: "",
  };
  
  const formReducer = (state, data) => {
    return { ...state, [data.field]: data.value };
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (event) => {
    const updatedFields = {...initialState}
    updatedFields[event.target.id] = event.target.value
    dispatch({ field: event.target.id, value: event.target.value });
  };

  const handleStatusChange = (event) => {
    setChangeStatusSelected(event.target.value);
    handleChange(event);
  };

  const handleInsuranceType = (event) => {
    setInsuranceTypeSelected(event.target.value);
    handleChange(event);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("Submitted data", state);

    if (editable) {
      setMessage("Saving...");
      updateClaim(state)
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
    }

    setEditable(!editable);
  };

  return (
    <>
      {isLoading && (
        <p style={{ textAlign: "center" }}>Please wait... loading</p>
      )}
      {!isLoading && (
        <div className="container content-container p-5 pt-0">
          <div className="row">
            <div className="text-center mt-5 pt-5 text-white">
              <h1>
                <strong>Claim {claims.id}</strong>
              </h1>
              {!archived ? (
                <p className="lead">View and Edit claims here</p>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row">
                        <label
                          htmlFor="claimStatus"
                          className="col-sm-5 col-form-label"
                        >
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
                            {/* <option value="">Select...</option> */}
                            <option value="O">Awaiting Assessment</option>
                            <option value="H">High Value</option>
                            <option value="R">Rejected</option>
                            <option value="P">Accepted - In Progress</option>
                            <option value="A">Accepted - Awaiting Payment</option>
                            <option value="C">Accepted - Paid</option>
                          </select>
                        </div>
                      </div>
                      {changeStatusSelected !== claims.claimStatus &&
                        changeStatusSelected != "" && (
                          <div className="form-group row">
                            <label
                              htmlFor="note"
                              className="col-sm-5 col-form-label"
                            >
                              Add note
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control"
                                id="note"
                                defaultValue={state.note}
                                onChange={handleChange}
                                placeholder="Add note here"
                                disabled={!editable}
                              />
                            </div>
                          </div>
                        )}
                      <hr></hr>
                      <div className="form-group row">
                        <label
                          htmlFor="policyNumber"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="claimInsuranceType"
                          className="col-sm-5 col-form-label"
                        >
                          Insurance Type
                        </label>
                        <div className="col-sm-7">
                          <select
                            id="claimInsuranceType"
                            className="form-select"
                            value={state.claimPolicyType}
                            onChange={handleInsuranceType}
                            disabled={!editable}
                          >
                            <option value="Property">Property</option>
                            <option value="Motor">Motor</option>
                            <option value="Pet">Pet</option>
                          </select>
                        </div>
                      </div>
                      {state.claimInsuranceType === "Property" && (
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
                      {state.claimInsuranceType === "Motor" && (
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
                      {state.claimInsuranceType === "Pet" && (
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
                        <label
                          htmlFor="firstName"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="lastName"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="claimStartDate"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="claimReason"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="incidentDate"
                          className="col-sm-5 col-form-label"
                        >
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
                        <label
                          htmlFor="furtherDetails"
                          className="col-5 col-form-label"
                        >
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
                          <button
                            type="submit"
                            className="btn btn-primary col-7 offset-5"
                          >
                            {editable ? "Save Claim" : "Edit Claim"}
                          </button>
                        </div>
                      )}
                      <div className="text-center text-danger">{message}</div>
                    </form>
                  </div>
                  <div className="col-12 col-lg-6">
                    <TaskList claim={claims.id} />
                    <NewTaskForm claim={claims.id} />
                    <NoteList claim={claims.id} />
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

export default Claim;
