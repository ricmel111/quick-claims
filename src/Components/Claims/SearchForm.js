import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = (props) => {
  //const [claimIdSearchNbr, setClaimIdSearchNbr] = useState("");
  const [localClaimIdSearchNbr, setLocalClaimIdSearchNbr] = useState("");
  //const [policySearchNbr, setPolicySearchNbr] = useState("");
  const [localPolicySearchNbr, setLocalPolicySearchNbr] = useState("");
  //const [lastName, setLastName] = useState("");
  const [localLastName, setLocalLastName] = useState("");
  //const [valid, setValid] = useState(true);
  //const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const handleClaimChange = (event) => {
    props.setTouched(true);
    setLocalClaimIdSearchNbr(event.target.value);
    setLocalPolicySearchNbr("");
    props.setPolicySearchNbr("");
    setLocalLastName("");
    props.setLastName("");
    // checkValidity(event.target.value);
  };

  const handlePolicyChange = (event) => {
    props.setTouched(true);
    setLocalPolicySearchNbr(event.target.value);
    setLocalClaimIdSearchNbr("");
    props.setClaimIdSearchNbr("");
    setLocalLastName("");
    props.setLastName("");
    // checkValidity(event.target.value);
  };

  const handlelastNameChange = (event) => {
    props.setTouched(true);
    setLocalLastName(event.target.value);
    setLocalClaimIdSearchNbr("");
    props.setClaimIdSearchNbr("");
    setLocalPolicySearchNbr("");
    props.setPolicySearchNbr("");
    // checkValidity(event.target.value);
  };

  //    const checkValidity = (value) => {
  //       setValid(value.trim().length > 0);
  //   }

  const doSearch = (event) => {
    event.preventDefault();
    if (localClaimIdSearchNbr !== "") {
      props.setClaimIdSearchNbr(localClaimIdSearchNbr);
      navigate(`/search/claim/${localClaimIdSearchNbr}`);
    } else if (localPolicySearchNbr !== "") {
      props.setPolicySearchNbr(localPolicySearchNbr);
      navigate(`/search/policy/${localPolicySearchNbr}`);
    } else if (localLastName !== "") {
      props.setLastName(localLastName);
      navigate(`/search/lastname/${localLastName}`);
    }
  };

  const clearForm = () => {
    setLocalClaimIdSearchNbr("");
    props.setClaimIdSearchNbr("");
    setLocalPolicySearchNbr("");
    props.setPolicySearchNbr("");
    setLocalLastName("");
    props.setLastName("");
    props.setTouched(false);
    navigate("/search");
  };

  return (
    <>
      <form onSubmit={doSearch} className="col-10">
        <div className="form-group row">
          <label htmlFor="searchClaimId" className="col-sm-5 col-form-label">
            Claim Id
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="searchClaimId"
              placeholder="Claim Id"
              onChange={handleClaimChange}
              value={localClaimIdSearchNbr}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="searchPolicyNumber"
            className="col-sm-5 col-form-label"
          >
            Policy Number
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="searchPolicyNumber"
              placeholder="Policy Number"
              onChange={handlePolicyChange}
              value={localPolicySearchNbr}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="searchLastName" className="col-sm-5 col-form-label">
            Last Name
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="searchLastName"
              placeholder="Last Name"
              onChange={handlelastNameChange}
              value={localLastName}
            />
          </div>
        </div>
        <div className="row mt-4">
          <button
            type="submit"
            disabled={!props.touched}
            className="btn btn-primary col-3 offset-5 me-3"
          >
            Search
          </button>
          <button
            disabled={!props.touched}
            className="btn btn-primary col-3"
            onClick={clearForm}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
