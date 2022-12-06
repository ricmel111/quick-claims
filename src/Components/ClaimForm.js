import { useState } from "react";

const ClaimForm = () => {

   const [insuranceTypeSelected, setInsuranceTypeSelected] = useState("");

   const handleInsuranceType = (event) => {
      setInsuranceTypeSelected(event.target.value);
   }

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
                           <input type="text" className="form-control" id="claimPolicyNumber" placeholder="Policy Number" />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimInsuranceType" className="col-sm-5 col-form-label">Insurance Type</label>
                        <div className="col-sm-7">
                           <select id="claimInsuranceType" className="form-select" onChange={handleInsuranceType}>
                              <option value="">Select...</option>
                              <option value="Property">Property</option>
                              <option value="Motor">Motor</option>
                              <option value="Pet">Pet</option>
                           </select>
                        </div>
                     </div>
                     {(insuranceTypeSelected === "Property") && 
                     <div className="form-group row">
                        <label htmlFor="propertyAddress" className="col-sm-5 col-form-label">Property Address</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="propertyAddress" placeholder="Property Address" />
                        </div>
                     </div>}
                     {(insuranceTypeSelected === "Motor") && <>
                     <div className="form-group row">
                        <label htmlFor="vehicleMake" className="col-sm-5 col-form-label">Make of Vehicle</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="vehicleMake" placeholder="Make of Vehicle" />
                        </div>
                     </div>
                     <div className="form-group row">
                     <label htmlFor="vehicleModel" className="col-sm-5 col-form-label">Model of Vehicle</label>
                     <div className="col-sm-7">
                        <input type="text" className="form-control" id="vehicleModel" placeholder="Model of Vehicle" />
                     </div>
                     </div>
                     <div className="form-group row">
                     <label htmlFor="vehicleManufactureYear" className="col-sm-5 col-form-label">Year of Manufacture</label>
                     <div className="col-sm-7">
                        <input type="text" className="form-control" id="vehicleManufactureYear" placeholder="Year of Manufacture" />
                     </div>
                     </div>
                     </>}
                     {(insuranceTypeSelected === "Pet") && <>
                     <div className="form-group row">
                     <label htmlFor="typeOfAnimal" className="col-sm-5 col-form-label">Type of Animal</label>
                     <div className="col-sm-7">
                        <input type="text" className="form-control" id="typeOfAnimal" placeholder="Type of Animal" />
                     </div>
                     </div>
                     <div className="form-group row">
                     <label htmlFor="breedOfAnimal" className="col-sm-5 col-form-label">Breed of Animal</label>
                     <div className="col-sm-7">
                        <input type="text" className="form-control" id="breedOfAnimal" placeholder="Breed of Animal" />
                     </div>
                     </div>
                     </>}
                     <div className="form-group row">
                        <label htmlFor="claimFullName" className="col-sm-5 col-form-label">Full Name</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="claimFullName" placeholder="Full Name" />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimStartDate" className="col-sm-5 col-form-label">Claim Start Date</label>
                        <div className="col-sm-7">
                           <input type="date" className="form-control" id="claimStartDate" />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimEstimatedAmount" className="col-sm-5 col-form-label">Estimated Claim Amount</label>
                        <div className="col-sm-7">
                          <span id="dollar">
                           <input type="number" className="form-control" id="claimEstimatedAmount" /></span>
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimReason" className="col-sm-5 col-form-label">Reason for the claim</label>
                        <div className="col-sm-7">
                           <input type="text" className="form-control" id="claimReason" placeholder="Reason for the claim" />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label htmlFor="claimIncidentDescription" className="col-5 col-form-label">Description of Incident</label>
                        <div className="col-7">
                           <textarea cols="40" rows="5" className="form-control" id="claimIncidentDescription" placeholder="Description of Incident"></textarea>
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