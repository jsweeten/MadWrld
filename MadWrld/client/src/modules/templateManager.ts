import { ITemplate, ITemplateTitle } from "../interfaces/ITemplate";
import IAnswerTemplate from "../interfaces/IAnswerTemplate";
import { getToken } from "./auth/authManager";

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

export const getTemplateById = (id: number) => {
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

export const addMadLib = (madlibAnswerArray: string[], templateId: number) => {
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

export const addTemplate = (template: ITemplateTitle) => {
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

export const addAnswerTemplate = (sentence: IAnswerTemplate) => {
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

export const editTemplate = (template: ITemplate) => {
  return getToken().then((token) => {
      return fetch(`${_apiUrl}/${template.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      }).then((resp) => {
        if (!resp.ok) {
          throw new Error("An unknown error occurred while trying to edit title.")
        }
      })
  })
}

export const editAnswerTemplate = (answerTemplate: IAnswerTemplate) => {
  return getToken().then((token) => {
      return fetch(`${_apiUrl}/answertemplate/${answerTemplate.id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(answerTemplate),
      }).then((resp) => {
          if (!resp.ok) {
            throw new Error("An unknown error occurred while trying to edit sentence.")
          }
      })
  })
}

export const getTemplatesByUserId = () => {
  return getToken().then((token) => {  
    return fetch(`${_apiUrl}/user`, {
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

export const deleteTemplate = (id: number) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}