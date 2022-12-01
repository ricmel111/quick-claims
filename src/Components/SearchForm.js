const SearchForm = () => {
    return (
        <div className="container p-5">
            <div className="row">
            <div className="text-center mt-5 pt-5 text-white">
               <h1><strong>Search Claims</strong></h1>
            </div>
         </div>
         <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 card"  id="claimForm">
               <div className="card-body">
                  <form>
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
               </div>
            </div>
         </div>
      </div>
    );
}

export default SearchForm;