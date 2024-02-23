import { getToken } from "./auth/authManager"

const _apiUrl = "/api/madlib";

export const getMadLibs = async () => {
  try {
    const token = await getToken();
    const response = await fetch(_apiUrl, {
      method: 'GET',
      headers: {
          Authorization: `Bearer  ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unathorized Request");
    } else {
      throw new Error("Unknown error occurred while retrieving madlibs");
    }
  } catch (error) {throw new Error(`Error occurred while retrieving madlib data: ${error}`)};
};

export const getMadLibById = async (id: number) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized request");
    } else {
      throw new Error("An unknown error occurred while trying to get madlib.");
    };
  } catch (error) {throw new Error(`Error occurred while attempting to retrieve madlib data: ${error}`)};
};

export const getMadLibsByUserId = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/userposts`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized request");
    } else {
      throw new Error("An unknown error occurred while trying to get madlib.");
    }
  } catch (error) {throw new Error(`Error occurred while attempting to retrieve madlib data: ${error}`)};
};

export const deleteMadLib = async (id: number) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      return true;
    } else if (response.status === 401) {
        throw new Error("Unauthorized");
    } else {
        throw new Error("Failed to delete template");
    }
  } catch (error) {
    console.error(`An error occurred while attempting to delete template: ${error}`);
  return false;
  };
};