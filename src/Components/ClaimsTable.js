import {getClaimsData} from '../Data/DataFunctions';
import ClaimsTableRow from './ClaimsTableRow';

const ClaimsTable = () => {

    const claims = getClaimsData();

    return (
            <table className="table text-center align-middle mt-5">
                <thead>
                  <tr>
                    <th scope="col">Claim Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                  {claims.map ( (claim, index) => <ClaimsTableRow claim={claim} key={index} /> )}
              </table>
    )
}

export default ClaimsTable;