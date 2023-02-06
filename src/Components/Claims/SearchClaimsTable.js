import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import {
  getClaimById,
  getAllClaimsByLastName,
  getAllClaimsByPolicyNumber
} from "../../Data/DataFunctions";
import ClaimsTableRow from "./ClaimsTableRow";
import loadingGif from "../../../src/giphy.gif";

const SearchClaimsTable = (props) => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (props.lastName !== "" && props.lastName !== undefined) {
      setIsLoading(true);
      getAllClaimsByLastName(
        props.lastName,
        currentUser.user.name,
        currentUser.user.password
      )
        .then((response) => {
          console.log("TEST1", response.data)
          setClaims(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("something went wrong", error);
        });
    } else if (
      props.policySearchNbr !== "" &&
      props.policySearchNbr !== undefined
    ) {
      setIsLoading(true);
      getAllClaimsByPolicyNumber(
        props.policySearchNbr,
        currentUser.user.name,
        currentUser.user.password
      )
        .then((response) => {
          console.log("TEST2", response.data)
          setClaims(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("something went wrong", error);
        });
    } else if (
      props.claimIdSearchNbr !== "" &&
      props.claimIdSearchNbr !== undefined
    ) {
      setIsLoading(true);
      getClaimById(
        props.claimIdSearchNbr,
        currentUser.user.name,
        currentUser.user.password
      )
      .then(response => {
        if(response.status !== 404) {
            setClaims(response.data);
        } else {
            console.log("404 error: Not found");
            setIsLoading(false);
        }
    })
    .catch((error) => {
        console.log("something went wrong", error);
        setIsLoading(false);
    });
    } else {
      setClaims([]);
    }
  }, [props.lastName, props.policySearchNbr, props.claimIdSearchNbr]);

  return (
    <>
      {isLoading && <img src={loadingGif} alt="wait until the page loads" />}
      {!isLoading && (
        <table className="table text-center align-middle mt-5">
          <thead>
            <tr>
              <th scope="col">Claim Id</th>
              <th scope="col">Policy Nbr</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {claims.policy}
          {claims.map((claim, index) => (
            <ClaimsTableRow claim={claim} key={index} />
          ))}
        </table>
      )}
    </>
  );
};

export default SearchClaimsTable;
