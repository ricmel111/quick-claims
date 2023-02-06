import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchClaimsTable from "./SearchClaimsTable";
import SearchForm from "./SearchForm";

const SearchClaimsPage = (props) => {
  const params = useParams();
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (
      params.claimSearchTerm !== "" &&
      params.claimSearchTerm !== props.claimIdSearchNbr
    ) {
      props.setClaimIdSearchNbr(params.claimSearchTerm);
    }
  }, [params.claimSearchTerm]);

  useEffect(() => {
    if (
      params.policySearchTerm !== "" &&
      params.policySearchTerm !== props.policySearchNbr
    ) {
      props.setPolicySearchNbr(params.policySearchTerm);
    }
  }, [params.policySearchTerm]);

  useEffect(() => {
    if (
      params.lastNameSearchTerm !== "" &&
      params.lastNameSearchTerm !== props.lastName
    ) {
      props.setLastName(params.lastNameSearchTerm);
    }
  }, [params.lastNameSearchTerm]);

  return (
    <div className="content-container">
      <div className="container p-5">
        <div className="row">
          <div className="col-12 col-xl-10 offset-xl-1 mt-5 pt-5 text-white">
            <h1>Search Claims</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-10 offset-xl-1 card" id="claimForm">
            <div className="card-body text-center">
              <SearchForm
                setClaimIdSearchNbr={props.setClaimIdSearchNbr}
                setPolicySearchNbr={props.setPolicySearchNbr}
                setLastName={props.setLastName}
                touched={touched}
                setTouched={setTouched}
              />
              <SearchClaimsTable
                claimIdSearchNbr={props.claimIdSearchNbr}
                policySearchNbr={props.policySearchNbr}
                lastName={props.lastName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchClaimsPage;
