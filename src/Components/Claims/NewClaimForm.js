import { useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewCLaim } from "../../Data/DataFunctions";
import { UserContext } from "../../Contexts/UserContexts";

const NewClaimForm = () => {
  const [PolicyTypeSelected, setPolicyTypeSelected] = useState("");
  const { handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const currentUser = useContext(UserContext);
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  const [defaultPolicyType, setDefaultPolicyType] = useState("");

  const onSubmit = (data, event) => {
    event.preventDefault();
    setMessage("Saving...");
    addNewCLaim(newClaim, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          setMessage("New claim added with id " + response.data.id);
          clearForm();
        } else {
          setMessage(
            "Something went wrong - status code was " + response.status
          );
        }
      })
      .catch((error) => {
        setMessage("Something went wrong - " + error);
      });
  };

  const handlePolicyType = (event) => {
    console.log("handlePolicyType", event.target.value);
    setPolicyTypeSelected(event.target.value);

    if (event.target.value == "Property") {
      newClaim.vehicleMake = "";
      newClaim.vehicleModel = "";
      newClaim.manufactureYear = "";
      newClaim.breedOfAnimal = "";
      newClaim.typeOfAnimal = "";
    }

    if (event.target.value == "Motor") {
      newClaim.propertyAddress = "";
      newClaim.breedOfAnimal = "";
      newClaim.typeOfAnimal = "";
    }

    if (event.target.value == "Pet") {
      newClaim.propertyAddress = "";
      newClaim.vehicleMake = "";
      newClaim.vehicleModel = "";
      newClaim.manufactureYear = "";
    }

    handleChange(event);
  };

  const initialNewClaimState = {
    claimStatus: "O",
    policyNumber: "",
    policyType: "",
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

  const [newClaim, dispatch] = useReducer(formReducer, initialNewClaimState);

  const handleChange = (event) => {
    setTouched(true);
    setMessage("");
    dispatch({ field: event.target.id, value: event.target.value });
  };

  const clearForm = () => {
    reset();
    newClaim.policyNumber = "";
    document.getElementById("policyType").value = "";
    setPolicyTypeSelected("");
    newClaim.propertyAddress = "";
    newClaim.vehicleMake = "";
    newClaim.vehicleModel = "";
    newClaim.manufactureYear = "";
    newClaim.typeOfAnimal = "";
    newClaim.breedOfAnimal = "";
    newClaim.firstName = "";
    newClaim.lastName = "";
    newClaim.claimStartDate = new Date().toISOString().slice(0, 10);
    newClaim.estimatedAmount = "";
    newClaim.claimReason = "";
    newClaim.incidentDescription = "";
    newClaim.incidentDate = "";
    newClaim.furtherDetails = "";
  };

  return (
    <div className="content-container container p-5 pt-0">
      <div className="row">
        <div className="text-center mt-5 pt-5 text-white">
          <h1>
            <strong>New Claim</strong>
          </h1>
          <p className="lead">Fill in the form below to start making a claim</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2 card" id="claimForm">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    value={newClaim.policyNumber}
                    onChange={handleChange}
                    placeholder="Policy Number"
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
                    defaultValue={newClaim.policyType}
                    onChange={handlePolicyType}
                  >
                    <option value="">Select...</option>
                    <option value="Property">Property</option>
                    <option value="Motor">Motor</option>
                    <option value="Pet">Pet</option>
                  </select>
                </div>
              </div>
              {PolicyTypeSelected === "Property" && (
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
                      value={newClaim.propertyAddress}
                      onChange={handleChange}
                      placeholder="Property Address"
                    />
                  </div>
                </div>
              )}
              {PolicyTypeSelected === "Motor" && (
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
                        value={newClaim.vehicleMake}
                        onChange={handleChange}
                        placeholder="Make of Vehicle"
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
                        value={newClaim.vehicleModel}
                        onChange={handleChange}
                        placeholder="Model of Vehicle"
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
                        value={newClaim.manufactureYear}
                        onChange={handleChange}
                        placeholder="Year of Manufacture"
                      />
                    </div>
                  </div>
                </>
              )}
              {PolicyTypeSelected === "Pet" && (
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
                        value={newClaim.typeOfAnimal}
                        onChange={handleChange}
                        placeholder="Type of Animal"
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
                        value={newClaim.breedOfAnimal}
                        onChange={handleChange}
                        placeholder="Breed of Animal"
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
                    value={newClaim.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
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
                    value={newClaim.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              {/* <div className="form-group row">
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
                    value={newClaim.claimStartDate}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
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
                      value={newClaim.estimatedAmount}
                      onChange={handleChange}
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
                    value={newClaim.claimReason}
                    onChange={handleChange}
                    placeholder="Reason for the claim"
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
                    value={newClaim.incidentDescription}
                    onChange={handleChange}
                    placeholder="Description of Incident"
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
                    value={newClaim.incidentDate}
                    onChange={handleChange}
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
                    value={newClaim.furtherDetails}
                    onChange={handleChange}
                    placeholder="Further Details"
                  ></textarea>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-5 offset-5">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!valid || !touched}
                >
                  Submit Claim
                </button>
                </div>
                <div className="col-2">
                <button
                  type="button"
                  disabled={!touched}
                  className="btn btn-secondary w-100"
                  onClick={clearForm}
                >
                  Reset
                </button>
                </div>
                <div className="text-center text-danger p-3">{message}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClaimForm;
