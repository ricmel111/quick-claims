import { useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewCLaim } from "../../Data/DataFunctions";
import { UserContext } from "../../Contexts/UserContexts";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const NewClaimForm = () => {
  const [policyTypeSelected, setPolicyTypeSelected] = useState("");
  const { handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const currentUser = useContext(UserContext);
  const [touched, setTouched] = useState(false);
  const [returnedId, setReturnedId] = useState("");
  const [isFormValid, setIsFormValid] = useState();
  const [policyNumberValid, setPolicyNumberValid] = useState();
  const [policyTypeValid, setPolicyTypeValid] = useState();
  const [propertyAddressValid, setPropertyAddressValid] = useState();
  const [vehicleMakeValid, setVehicleMakeValid] = useState();
  const [vehicleModelValid, setVehicleModelValid] = useState();
  const [manufactureYearValid, setManufactureYearValid] = useState();
  const [typeOfAnimalValid, setTypeOfAnimalValid] = useState();
  const [breedOfAnimalValid, setBreedOfAnimalValid] = useState();
  const [firstNameValid, setFirstNameValid] = useState();
  const [lastNameValid, setLastNameValid] = useState();
  const [estimatedAmountValid, setEstimatedAmountValid] = useState();
  const [claimReasonValid, setClaimReasonValid] = useState();
  const [incidentDescriptionValid, setIncidentDescriptionValid] = useState();

  const onSubmit = (data, event) => {
    event.preventDefault();
    setMessage("Saving...");
    addNewCLaim(newClaim, currentUser.user.name, currentUser.user.password)
      .then((response) => {
        if (response.status === 200) {
          setMessage("New claim added with id " + response.data.id);
          setReturnedId(response.data.id);
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

    if (event.target.value === "Property") {
      newClaim.vehicleMake = "";
      newClaim.vehicleModel = "";
      newClaim.manufactureYear = "";
      newClaim.breedOfAnimal = "";
      newClaim.typeOfAnimal = "";
    }

    if (event.target.value === "Motor") {
      newClaim.propertyAddress = "";
      newClaim.breedOfAnimal = "";
      newClaim.typeOfAnimal = "";
    }

    if (event.target.value === "Pet") {
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
    paymentAmount: 0,
  };

  const formReducer = (state, data) => {
    return { ...state, [data.field]: data.value };
  };

  const [newClaim, dispatch] = useReducer(formReducer, initialNewClaimState);

  const handleChange = (event) => {
    setTouched(true);
    checkValidity(event);
    setMessage("");
    dispatch({ field: event.target.id, value: event.target.value });
  };

  const checkValidity = (event) => {
    if (event.target.id === "policyNumber") {
      if (event.target.value.trim().length === 9) {
        setPolicyNumberValid(true);
      } else {
        setPolicyNumberValid(false);
      }
    }

    if (event.target.id === "policyType") {
      if (
        event.target.value === "Property" ||
        event.target.value === "Pet" ||
        event.target.value === "Motor"
      ) {
        setPolicyTypeValid(true);
      } else {
        setPolicyTypeValid(false);
      }
    }

    if (event.target.id === "propertyAddress") {
      if (event.target.value.trim().length > 3) {
        setPropertyAddressValid(true);
      } else {
        setPropertyAddressValid(false);
      }
    }

    if (event.target.id === "vehicleMake") {
      if (event.target.value.trim().length > 0) {
        setVehicleMakeValid(true);
      } else {
        setVehicleMakeValid(false);
      }
    }

    if (event.target.id === "vehicleModel") {
      if (event.target.value.trim().length > 0) {
        setVehicleModelValid(true);
      } else {
        setVehicleModelValid(false);
      }
    }

    if (event.target.id === "manufactureYear") {
      if (event.target.value.trim().length > 0) {
        setManufactureYearValid(true);
      } else {
        setManufactureYearValid(false);
      }
    }

    if (event.target.id === "typeOfAnimal") {
      if (event.target.value.trim().length > 0) {
        setTypeOfAnimalValid(true);
      } else {
        setTypeOfAnimalValid(false);
      }
    }

    if (event.target.id === "breedOfAnimal") {
      if (event.target.value.trim().length > 0) {
        setBreedOfAnimalValid(true);
      } else {
        setBreedOfAnimalValid(false);
      }
    }

    if (event.target.id === "firstName") {
      if (event.target.value.trim().length > 0) {
        setFirstNameValid(true);
      } else {
        setFirstNameValid(false);
      }
    }

    if (event.target.id === "lastName") {
      if (event.target.value.trim().length > 0) {
        setLastNameValid(true);
      } else {
        setLastNameValid(false);
      }
    }

    if (event.target.id === "estimatedAmount") {
      if (event.target.value.trim().length > 0) {
        setEstimatedAmountValid(true);
      } else {
        setEstimatedAmountValid(false);
      }
    }

    if (event.target.id === "claimReason") {
      if (event.target.value.trim().length > 0) {
        setClaimReasonValid(true);
      } else {
        setClaimReasonValid(false);
      }
    }

    if (event.target.id === "incidentDescription") {
      if (event.target.value.trim().length > 0) {
        setIncidentDescriptionValid(true);
      } else {
        setIncidentDescriptionValid(false);
      }
    }

    if (
      policyNumberValid &&
      policyTypeValid &&
      firstNameValid &&
      lastNameValid &&
      estimatedAmountValid &&
      claimReasonValid &&
      incidentDescriptionValid
    ) {
      if (policyTypeSelected === "Motor") {
        if (vehicleMakeValid && vehicleModelValid && manufactureYearValid) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      } else if (policyTypeSelected === "Property") {
        if (propertyAddressValid) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      } else if (policyTypeSelected === "Pet") {
        if (typeOfAnimalValid && breedOfAnimalValid) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      }
    } else {
      setIsFormValid(false);
    }
  }

  const resetForm = () => {
    setReturnedId("");
    clearForm();
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
    setPolicyNumberValid(false);
    setPolicyTypeValid(false);
    setPropertyAddressValid(false);
    setVehicleMakeValid(false);
    setVehicleModelValid(false);
    setManufactureYearValid(false);
    setTypeOfAnimalValid(false);
    setBreedOfAnimalValid(false);
    setFirstNameValid(false);
    setLastNameValid(false);
    setEstimatedAmountValid(false);
    setClaimReasonValid(false);
    setIncidentDescriptionValid(false);
  };

  return (
    <div className="content-container-color p-5 pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-6 offset-xl-3 mt-5 pt-5 text-white">
            <h1>New Claim</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-6 offset-xl-3 card" id="claimForm">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} id="newClaimForm">
                <div className="form-group row">
                  <label
                    htmlFor="policyNumber"
                    className="col-sm-5 col-form-label required"
                  >
                    Policy Number
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          id="policyNumber"
                          value={newClaim.policyNumber}
                          onChange={handleChange}
                          placeholder="Policy Number"
                          maxLength="9"
                        />
                      </div>
                      <div className="col-1">
                        {policyNumberValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="policyType"
                    className="col-sm-5 col-form-label required"
                  >
                    Insurance Type
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
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
                      <div className="col-1">
                        {policyTypeValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {policyTypeSelected === "Property" && (
                  <div className="form-group row">
                    <label
                      htmlFor="propertyAddress"
                      className="col-sm-5 col-form-label required"
                    >
                      Property Address
                    </label>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-11">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyAddress"
                            value={newClaim.propertyAddress}
                            onChange={handleChange}
                            placeholder="Property Address"
                          />
                        </div>
                        <div className="col-1">
                          {propertyAddressValid && (
                            <span className="check">
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {policyTypeSelected === "Motor" && (
                  <>
                    <div className="form-group row">
                      <label
                        htmlFor="vehicleMake"
                        className="col-sm-5 col-form-label required"
                      >
                        Make of Vehicle
                      </label>
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              id="vehicleMake"
                              value={newClaim.vehicleMake}
                              onChange={handleChange}
                              placeholder="Make of Vehicle"
                            />
                          </div>
                          <div className="col-1">
                            {vehicleMakeValid && (
                              <span className="check">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="vehicleModel"
                        className="col-sm-5 col-form-label required"
                      >
                        Model of Vehicle
                      </label>
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              id="vehicleModel"
                              value={newClaim.vehicleModel}
                              onChange={handleChange}
                              placeholder="Model of Vehicle"
                            />
                          </div>
                          <div className="col-1">
                            {vehicleModelValid && (
                              <span className="check">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="manufactureYear"
                        className="col-sm-5 col-form-label required"
                      >
                        Year of Manufacture
                      </label>
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              id="manufactureYear"
                              value={newClaim.manufactureYear}
                              onChange={handleChange}
                              placeholder="Year of Manufacture"
                            />
                          </div>
                          <div className="col-1">
                            {manufactureYearValid && (
                              <span className="check">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {policyTypeSelected === "Pet" && (
                  <>
                    <div className="form-group row">
                      <label
                        htmlFor="typeOfAnimal"
                        className="col-sm-5 col-form-label required"
                      >
                        Type of Animal
                      </label>
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              id="typeOfAnimal"
                              value={newClaim.typeOfAnimal}
                              onChange={handleChange}
                              placeholder="Type of Animal"
                            />
                          </div>
                          <div className="col-1">
                            {typeOfAnimalValid && (
                              <span className="check">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="breedOfAnimal"
                        className="col-sm-5 col-form-label required"
                      >
                        Breed of Animal
                      </label>
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              id="breedOfAnimal"
                              value={newClaim.breedOfAnimal}
                              onChange={handleChange}
                              placeholder="Breed of Animal"
                            />
                          </div>
                          <div className="col-1">
                            {breedOfAnimalValid && (
                              <span className="check">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="form-group row">
                  <label
                    htmlFor="firstName"
                    className="col-sm-5 col-form-label required"
                  >
                    First Name
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={newClaim.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col-1">
                        {firstNameValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lastName" className="col-sm-5 col-form-label required">
                    Last Name
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={newClaim.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="col-1">
                        {lastNameValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="estimatedAmount"
                    className="col-sm-5 col-form-label required"
                  >
                    Estimated Claim Amount
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
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
                      <div className="col-1">
                        {estimatedAmountValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="claimReason"
                    className="col-sm-5 col-form-label required"
                  >
                    Reason for the claim
                  </label>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          id="claimReason"
                          value={newClaim.claimReason}
                          onChange={handleChange}
                          placeholder="Reason for the claim"
                        />
                      </div>
                      <div className="col-1">
                        {claimReasonValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="incidentDescription"
                    className="col-5 col-form-label required"
                  >
                    Description of Incident
                  </label>
                  <div className="col-7">
                    <div className="row">
                      <div className="col-11">
                        <textarea
                          cols="40"
                          rows="3"
                          className="form-control"
                          id="incidentDescription"
                          value={newClaim.incidentDescription}
                          onChange={handleChange}
                          placeholder="Description of Incident"
                        ></textarea>
                      </div>
                      <div className="col-1">
                        {incidentDescriptionValid && (
                          <span className="check">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        )}
                      </div>
                    </div>
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
                      rows="3"
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
                      disabled={!isFormValid}
                    >
                      Submit Claim
                    </button>
                  </div>
                  <div className="col-2">
                    <button
                      type="button"
                      disabled={!touched}
                      className="btn btn-secondary w-100"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>
                  {returnedId && (
                    <div className="text-center text-danger pt-3">
                      {message}
                      <Link
                        className="ms-2 text-decoration-none text-danger"
                        to={`/claim/${returnedId}`}
                      >
                        <b>- GO TO CLAIM</b>
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClaimForm;
