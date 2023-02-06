import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContexts";
import { login } from "../Data/DataFunctions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useContext(UserContext);

  const navigate = useNavigate();

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    login(username, password)
      .then((result) => {
        console.log(result);
        currentUser.setUser({ name: result.data.username, role: result.data.role, password: password });
        navigate("/");
      })
      .catch((error) => console.log("login didn't work"));
  };

  return (
    <>
      <div className="content-container-color">
        <div className="container p-5">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 text-center pt-5 mt-5">
              <h1 className="text-white">Please log in</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 offset-lg-4 mt-5">
              <form onSubmit={submitForm}>
                <div className="form-group row mb-3">
                  <label
                    className="col-sm-4 col-form-label text-white"
                    htmlFor="name"
                  >
                    Username
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      value={username}
                      onChange={updateUsername}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                </div>
                <div
                  className="row mt-3 col-4 offset-8
                 text-right"
                >
                  <button className="btn btn-secondary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
