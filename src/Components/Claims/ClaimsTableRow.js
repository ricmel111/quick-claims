import { useState } from "react";
import { Link } from "react-router-dom";

const ClaimsTableRow = (props) => {
  const [isActive, setIsActive] = useState(false);

  const codeToString = {
    O: 'Awaiting Assessment',
    P: 'In Progress',
    R: 'Rejected',
    A: 'Awaiting Payment',
    C: 'Paid & Closed',
    H: 'High Value'
  }
  
  const statusString = codeToString[props.claim.claimStatus];

  return (
    <tbody>
      <tr>
        <td>{props.claim.claimNumber}</td>
        <td>{props.claim.policyNumber}</td>
        <td>{props.claim.firstName}</td>
        <td>{props.claim.lastName}</td>
        <td>{statusString}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Hide" : "Show"} Details
          </button>
        </td>
      </tr>
      <tr
        id="fullClaimDisplay"
        className="text-start"
        style={{ display: isActive ? "contents" : "none" }}
      >
        <td colSpan="6">
          <div className="row d-inline">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col-12 p-0">
                  <h3 className="d-inline me-3">
                    Claim: {props.claim.id}
                  </h3>
                  <Link to={`/claim/${props.claim.id}`}>
                    <button className="btn btn-primary btn-sm">View/Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 offset-1">
              <strong>First Name: </strong>
              {props.claim.firstName}
              <br />
              <strong>Last Name: </strong>
              {props.claim.lastName}
              <br />
              <strong>Policy: </strong>
              {props.claim.policyNumber}
              <br />
              <strong>Insurance Type: </strong>
              {props.claim.policyType}
              <br />
              <strong>Status: </strong>
              {statusString}
            </div>
            <div className="col-7">
              <strong>Claim Start Date: </strong>
              {props.claim.claimStartDate}
              <br />
              <strong>Claim Amount: </strong>$
              {props.claim.estimatedAmount}
              <br />
              <strong>Reason for claim: </strong>
              {props.claim.claimReason}
              <br />
              <strong>Description of Incident: </strong>
              {props.claim.incidentDescription}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ClaimsTableRow;
