import { useContext, useEffect, useState } from "react";
import { getAllOpenClaimsAxios } from "../../Data/DataFunctions";
import {useSelector, useDispatch} from 'react-redux';
import ClaimsTableRow from "./ClaimsTableRow";
import { UserContext } from "../../Contexts/UserContexts";
import loadingGif from "../../../src/giphy.gif";

const OpenClaimsTable = () => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);
  const claimsInRedux = useSelector( state => state.claims);
  const timeOfLastFetch = useSelector( state => state.lastFetch);
  const dispatch = useDispatch();

  useEffect( () => {
    loadOpenClaims();
} , []);

const loadOpenClaims = () => {

//do we have any claims in redux?
if(claimsInRedux.length > 0 && new Date().getTime() - timeOfLastFetch < 60000) {
  console.log("using open claims from redux");
  setClaims(claimsInRedux);
  setIsLoading(false);
}
else {
    console.log("getting open claims via rest");
    getAllOpenClaimsAxios(currentUser.user.name, currentUser.user.password)
      .then((response) => {
        setClaims(response.data);
        dispatch({type:"updateClaims", value : response.data});
        setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
    }
  }

  return (
    <>
      <div className="content-container">
        <div className="container p-5">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 card" id="claimForm">
              <div className="card-body">
                <h3 className="card-title text-center p-3">Open Claims</h3>
                <div className="col-12 text-center">
                {isLoading && <img src={loadingGif} alt="wait until the page loads" />}
    {!isLoading &&
                  <table className="table text-center align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Claim Id{claims.policyNumber}</th>
                        <th scope="col">Policy Nbr</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    {claims.map(
                      (claim, index) => (<ClaimsTableRow claim={claim} key={index} />)
                    )}
                  </table>
}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenClaimsTable;
