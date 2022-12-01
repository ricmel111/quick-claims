const ClaimForm = () => {
    return (
        <div className="container p-5 pt-0">
                 <div className="row">
            <div className="text-center mt-5 pt-5 text-white">
               <h1><strong>New Claim</strong></h1>
               <p className="lead">Fill in the form below to start making a claim</p>
            </div>
         </div>
         <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 card"  id="claimForm">
               <div className="card-body">
                  <form>
                     <div className="form-group row">
                        <label htmlFor="claimPolicyNumber" className="col-sm-5 col-form-label">Policy Number</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="claimPolicyNumber" placeholder="Policy Number" required />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimInsuranceType" className="col-sm-5 col-form-label">Insurance Type</label>
                        <div className="col-sm-7">
                           <select id="claimInsuranceType" className="form-select" required>
                              <option value="">Select...</option>
                              <option value="Property">Property</option>
                              <option value="Motor">Motor</option>
                              <option value="Pet">Pet</option>
                           </select>
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimFullName" className="col-sm-5 col-form-label">Full Name</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="claimFullName" placeholder="Full Name" required />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimStartDate" className="col-sm-5 col-form-label">Claim Start Date</label>
                        <div className="col-sm-7">
                           <input type="date" className="form-control" id="claimStartDate" required />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimEstimatedAmount" className="col-sm-5 col-form-label">Estimated Claim Amount</label>
                        <div className="col-sm-7">
                          <span id="dollar">
                           <input type="number" className="form-control" id="claimEstimatedAmount" required /></span>
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimReason" className="col-sm-5 col-form-label">Reason for the claim</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="claimReason" placeholder="Reason for the claim" required />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimIncidentDescription" className="col-5 col-form-label">Description of Incident</label>
                        <div className="col-7">
                           <textarea cols="40" rows="5" className="form-control" id="claimIncidentDescription" placeholder="Description of Incident" required></textarea>
                        </div>
                     </div>
                     <div className="row mt-4">
                        <button type="submit" className="btn btn-primary col-7 offset-5">Submit Claim</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
    );
}

export default ClaimForm;