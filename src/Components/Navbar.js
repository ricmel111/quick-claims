import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { UserContext } from '../Contexts/UserContexts';

const Navbar = () => {

   const currentUser = useContext(UserContext);

   const logout = () => {
      currentUser.setUser({name:"", role:""});
  }

    return (
      <>
    <nav className="navbar navbar-expand-lg navbar-dark">
         <div className="container-sm">
            <a className="navbar-brand" href="/"><img className="w-100" src={"http://www.richardmellon.co.uk/test/quick-claims-logo.png"} alt="Logo" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><NavLink to="/new-claim" className="nav-link" aria-current="page">New Claim</NavLink></li>
                  <li className="nav-item"><NavLink to="/search" className="nav-link">Search</NavLink></li>
                  <li className="nav-item"><NavLink to="/open-claims" className="nav-link">Open Claims</NavLink></li>
                  {currentUser.user.name === "" && <li className="nav-item"><NavLink to="/login" className="nav-link">Log in</NavLink></li>}
                  {currentUser.user.name !== "" && <li className="nav-item"><button className="btn-sm btn-primary btn-login" onClick={logout}>Log out</button></li>}
               </ul>
            </div>
         </div>
      </nav>
      <div className="container-sm">
      {currentUser.user.name !== "" && <span className="login">Current user : {currentUser.user.name} ({currentUser.user.role})</span>}
      </div>
      </>
      );
}

export default Navbar;