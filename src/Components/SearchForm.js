import { useState } from "react";
import ClaimsTable from "./ClaimsTable";

const SearchForm = (props) => {

   const [localSearchTerm, setLocalSearchTerm] = useState("");
   const [valid, setValid] = useState(true);
   const [touched, setTouched] = useState(false);

   const handleChange = (event) => {
      setTouched(true);
      setLocalSearchTerm(event.target.value);
      checkValidity(event.target.value);
   }

   const checkValidity = (value) => {
      setValid(value.trim().length > 0);
  }

   const doSearch  = (event) => {
      event.preventDefault();
      console.log("Searching for ",localSearchTerm);
  }

   return (
        <div className="container p-5">
         <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 card"  id="claimForm">
               <div className="card-body">
               <h3 className="card-title text-center p-3">Search claims</h3>
                  <form onSubmit={doSearch} className="col-10">
                     <div className="form-group row">
                        <label htmlFor="searchPolicyNumber" className="col-sm-5 col-form-label">Policy Number</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="searchPolicyNumber" placeholder="Policy Number" onChange={handleChange} value={localSearchTerm} />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="searchSurname" className="col-sm-5 col-form-label">Surname</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="searchSurname" placeholder="Surname" />
                        </div>
                     </div>
                     <div className="row mt-4">
                        <button type="submit" disabled={!valid || !touched} className="btn btn-primary col-7 offset-5">Search</button>
                     </div>
                  </form>
                  <ClaimsTable />
               </div>
            </div>
         </div>
      </div>
   );
}

export default SearchForm;