const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark">
         <div className="container-sm">
            <a className="navbar-brand" href="#">Project Speed</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">New Claim</a></li>
                  <li className="nav-item"><a className="nav-link" href="search.html">Search</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Link 2</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Link 3</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Link 4</a></li>
                  <li className="nav-item"><button className="btn btn-primary">Log Out</button></li>
               </ul>
            </div>
         </div>
      </nav>);
}

export default Navbar;