import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import OpenClaimsTable from "./Components/Claims/OpenClaimsTable";
import ErrorPage from "./Components/ErrorPage";
import { useState } from "react";
import SearchClaimsPage from "./Components/Claims/SearchClaimsPage";
import NewClaimForm from "./Components/Claims/NewClaimForm";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import ClaimPage from "./Components/Claims/ClaimPage";
import Claim from "./Components/Claims/Claim";
import { Provider } from "react-redux";
import store from "./store/store";
import { UserContext } from "./Contexts/UserContexts";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [claimIdSearchNbr, setClaimIdSearchNbr] = useState("");
  const [policySearchNbr, setPolicySearchNbr] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "", role: "" });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <UserContext.Provider
          value={{ user: currentUser, setUser: setCurrentUser }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/new-claim" element={<NewClaimForm />} //temp
              // element={
              //   <ProtectedRoute
              //     roles={["MANAGER"]}
              //     element={<NewClaimForm />}
              //   />  
              // }
            />
            <Route
              path="/claim/:claim" element={<ClaimPage />}//temp
            //   element={
            //     <ProtectedRoute
            //       roles={["USER", "MANAGER"]}
            //       element={<ClaimPage />}
            // />
            //   }
              />
            <Route
              path="/search"
              element={
                <ProtectedRoute
                roles={["USER", "MANAGER"]}
                element={
                  <SearchClaimsPage
                    claimIdSearchNbr={claimIdSearchNbr}
                    policySearchNbr={policySearchNbr}
                    lastName={lastName}
                    setClaimIdSearchNbr={setClaimIdSearchNbr}
                    setPolicySearchNbr={setPolicySearchNbr}
                    setLastName={setLastName}
                  />}
                  />
              }
            />
            <Route
              path="/search/claim/:claimSearchTerm"
              element={
                <ProtectedRoute
                roles={["USER", "MANAGER"]}
              element={
                  <SearchClaimsPage
                    claimIdSearchNbr={claimIdSearchNbr}
                    policySearchNbr={policySearchNbr}
                    lastName={lastName}
                    setClaimIdSearchNbr={setClaimIdSearchNbr}
                    setPolicySearchNbr={setPolicySearchNbr}
                    setLastName={setLastName}
                    />}
                    />
                }
              />
            <Route
              path="/search/policy/:policySearchTerm"
              element={
                <ProtectedRoute
                roles={["USER", "MANAGER"]}
              element={
                  <SearchClaimsPage
                    claimIdSearchNbr={claimIdSearchNbr}
                    policySearchNbr={policySearchNbr}
                    lastName={lastName}
                    setClaimIdSearchNbr={setClaimIdSearchNbr}
                    setPolicySearchNbr={setPolicySearchNbr}
                    setLastName={setLastName}
                    />}
                    />
                }
              />
            <Route
              path="/search/lastname/:lastNameSearchTerm"
              element={
                <ProtectedRoute
                roles={["USER", "MANAGER"]}
              element={
                  <SearchClaimsPage
                    claimIdSearchNbr={claimIdSearchNbr}
                    policySearchNbr={policySearchNbr}
                    lastName={lastName}
                    setClaimIdSearchNbr={setClaimIdSearchNbr}
                    setPolicySearchNbr={setPolicySearchNbr}
                    setLastName={setLastName}
                    />}
                    />
                }
              />
            <Route
              path="/open-claims"
              element={
                <ProtectedRoute
                roles={["USER", "MANAGER"]}
              element={
              <OpenClaimsTable />}
              />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer className="footer--pin" />
        </UserContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
