import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "../Contexts/UserContexts";
import NotAuthorized from "./NotAuthorized";

const ProtectedRoute = (props) => {

    //props = path, element, roles =["USER", "MANAGER"]

    const currentUser = useContext(UserContext);
    let result = props.element;
    if (currentUser.user.role === "") {
        result = <Navigate to={`/login?target=${props.path}`} />
    }
    else if (!props.roles.includes(currentUser.user.role) ) {
        result = <NotAuthorized />
    }

    return result;


}

export default ProtectedRoute;