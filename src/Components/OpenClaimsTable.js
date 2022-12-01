import {getClaimsData} from '../Data/DataFunctions';
import OpenClaimsTableRow from './OpenClaimsTableRow';

const OpenClaimsTable = () => {

    const claims = getClaimsData();

    return (
        <div className="row mt-5 p-5">
                <div className="col-12 col-lg-8 offset-lg-2 card"  id="claimForm">
                   <div className="row card-body">
                   <h3 className="card-title text-center p-3">Open claims</h3>
                     <div className="col-12">
                            <table className="table text-center align-middle">
                                <thead>
                                  <tr>
                                    <th scope="col">Claim Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                  </tr>
                                </thead>
                                  {claims.map ( (claim, index) => claim.status === "Open" && <OpenClaimsTableRow claim={claim} key={index} /> )}
                              </table>
                     </div>
                   </div>
                </div>
             </div>
    )
}

export default OpenClaimsTable;