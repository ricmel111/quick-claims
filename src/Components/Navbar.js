import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark">
         <div className="container-sm">
            <a className="navbar-brand" to="/">Project Speed</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><NavLink to="/new-claim" className="nav-link" aria-current="page">New Claim</NavLink></li>
                  <li className="nav-item"><NavLink to="/search" className="nav-link">Search</NavLink></li>
                  <li className="nav-item"><NavLink to="/open-claims" className="nav-link">Open Claims</NavLink></li>
               </ul>
            </div>
         </div>
      </nav>);
}

export default Navbar;