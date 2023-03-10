import { getToken } from "./authManager"

const _apiUrl = "/api/madlib";

export const getMadLibs = () => {
  return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer  ${token}`,
        },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
          throw new Error(
                "An unexpected error occurred",
          );
        }
    });
  });
}

export const getMadLibById = (id) => {
  return getToken().then((token) => {  
    return fetch(`${_apiUrl}/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
              "An unknown error occurred while trying to get madlib.",
          );
        }
    });
  });
}

export const getMadLibsByUserId = () => {
  return getToken().then((token) => {  
    return fetch(`${_apiUrl}/userposts`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
              "An unknown error occurred while trying to get madlib.",
          );
        }
    });
  });
}

export const deleteMadLib = (id) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}