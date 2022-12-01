import { useState } from 'react';

const OpenClaimsTableRow = (props) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <tbody>
            <tr>
                <td>{props.claim.claim_nbr}</td><td>{props.claim.full_name}</td><td>{props.claim.status}</td><td><button className="btn btn-primary" onClick={() => setIsActive(!isActive)}>{isActive ?  'Hide' : 'Show' } Details</button></td>
            </tr>
            <tr id="fullClaimDisplay" className="text-start" style= {{display : isActive ? 'contents' : 'none'}}>
                <td colSpan='4'>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <h3>Claim: {props.claim.claim_nbr}</h3><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-1">
                            <strong>Full Name: </strong>{props.claim.full_name}<br />
                            <strong>Policy: </strong>{props.claim.policy_nbr}<br />
                            <strong>Insurance Type: </strong>{props.claim.insurance_type}<br />
                            <strong>Status: </strong>{props.claim.status}
                        </div>
                        <div className="col-7">    
                            <strong>Claim Start Date: </strong>{props.claim.claim_start_date}<br />
                            <strong>Claim Amount: </strong>{props.claim.estimated_claim_amount}<br />
                            <strong>Reason for claim: </strong>{props.claim.reason_for_claim}<br />
                            <strong>Description of Incident: </strong>{props.claim.description_of_incident}
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default OpenClaimsTableRow;