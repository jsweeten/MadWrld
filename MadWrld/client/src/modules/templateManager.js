import { getToken } from "./authManager";

const _apiUrl = "/api/template";

export const getTemplates = () => {
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

export const getTemplateById = (id) => {
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
              "An unknown error occurred while trying to get template.",
          );
        }
    });
  });
}

export const addMadLib = (madlibAnswerArray, templateId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/madlibform/${templateId}`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(madlibAnswerArray),
      }).then((resp) => {
      if (resp.ok) {
          return resp.json();
      } else if (resp.status === 401) {
          throw new Error("Unauthorized");
      } else {
          throw new Error(
          "An unknown error occurred while trying to save a new madlib.",
          );
      }
      });
  });
};

export const addTemplate = (template) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(template),
      }).then((resp) => {
      if (resp.ok) {
          return resp.json();
      } else if (resp.status === 401) {
          throw new Error("Unauthorized");
      } else {
          throw new Error(
          "An unknown error occurred while trying to save a new madlib.",
          );
      }
      });
  });
};

export const addAnswerTemplate = (sentence) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/answertemplate`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sentence),
      }).then((resp) => {
      if (resp.ok) {
          return resp.json();
      } else if (resp.status === 401) {
          throw new Error("Unauthorized");
      } else {
          throw new Error(
          "An unknown error occurred while trying to save a new madlib.",
          );
      }
      });
  });
};