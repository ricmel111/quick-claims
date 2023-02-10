import axios from "axios";

const headers = new Headers({"Accept" : "application/json"})

const getAuthHeader = (username, password) => {
    return {"Authorization" : "Basic " + btoa(`${username}:${password}`)}
}

export const login = (username, password) => {
  return axios({url : "http://localhost:8080/api/login",
                  method: "POST",
                  headers: {...getAuthHeader(username,password),
                       "Accept" : "application/json", "Content-Type": "application/json"},
                       data: {username: username}
                  });
}

export const addNewCLaim = (claim, username, password) => {
  console.log("DATA FUNCTIONS - addClaim", claim, username, password);
  return axios({
    url: "http://localhost:8080/api/claim",
    method: "POST",
    headers: { Accept: "application/json", ...getAuthHeader("vik", "123") },
    data: claim,
  });
};

export const updateClaim = (claim, username, password) => {
  console.log("DATA FUNCTIONS - updateClaim", claim, username, password);
  return axios({
    url: "http://localhost:8080/api/claim/" + claim.id,
    method: "PUT",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    },
    data: claim
  });
};

export const addNewTask = (task, username, password) => {
  console.log("DATA FUNCTIONS - addNewTask", task);
  return axios({
    url: "http://localhost:8080/api/claim/"+task.claimId+"/task",
    method: "POST",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    },
    data: task,
  });
};

export const updateTaskStatus = (task, username, password) => {
  console.log("DATA FUNCTIONS - updateTaskStatus", task);
  return axios({
    url: "http://localhost:8080/api/task/" + task.id,
    method: "PUT",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    },
    data: task
  });
};

export const addNewNote = (note, username, password) => {
  console.log("DATA FUNCTIONS - addNewNote", note);
  return axios({
    url: "http://localhost:8080/api/claim/"+note.claimId+"/note",
    method: "POST",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    },
    data: note,
  });
};

export const getClaimById = (id, username, password) => {
  console.log("DATA FUNCTIONS - getClaimById ", id);
  return axios({
    url: "http://localhost:8080/api/claim/" + id,
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    }
  });
};

export const getAllOpenClaims = (username, password) => {
  console.log("DATA FUNCTIONS - getAllOpenClaims");
  return axios({
    url: "http://localhost:8080/api/claim/?claim-status=O",
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    }
  });
};

export const getAllClaimsByLastName = (lastName, username, password) => {
  console.log("DATA FUNCTIONS - getAllClaimsByLastName ", lastName);
  return axios({
    url: "http://localhost:8080/api/claim/?lastname=" + lastName,
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader(username, password)
    }
  });
};

export const getAllClaimsByPolicyNumber = (policyNbr, username, password) => {
  console.log("DATA FUNCTIONS - getAllClaimsByPolicyNumber ", policyNbr);
  return axios({
    url: "http://localhost:8080/api/claim/?policynumber=" + policyNbr,
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader(username, password)
    }
  });
};

export const getTasksByClaimId = (id, username, password) => {
  console.log("DATA FUNCTIONS - getTasksByClaimId ", id);
  return axios({
    url: "http://localhost:8080/api/task?claimId=" + id,
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    }
  });
};

export const getNotesByClaimId = (id, username, password) => {
  console.log("DATA FUNCTIONS - getNotesByClaimId ", id);
  return axios({
    url: "http://localhost:8080/api/note?claimId=" + id,
    method: "GET",
    headers: {
      Accept: "application/json", ...getAuthHeader("vik", "123")
    }
  });
};
