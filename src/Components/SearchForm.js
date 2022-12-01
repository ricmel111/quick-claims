import ClaimsTable from "./ClaimsTable";

const SearchForm = () => {
    return (
        <div className="container p-5">
         <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 card"  id="claimForm">
            <div className="row mt-3">
            <div className="text-center">
               <h3><strong>Search Claims</strong></h3>
            </div>
         </div>
               <div className="card-body">
                  <form className="col-10">
                     <div className="form-group row">
                        <label htmlFor="searchPolicyNumber" className="col-sm-5 col-form-label">Policy Number</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="searchPolicyNumber" placeholder="Policy Number" required />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="searchSurname" className="col-sm-5 col-form-label">Surname</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="searchSurname" placeholder="Surname" required />
                        </div>
                     </div>
                     <div className="row mt-4">
                        <button type="submit" className="btn btn-primary col-7 offset-5">Search</button>
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