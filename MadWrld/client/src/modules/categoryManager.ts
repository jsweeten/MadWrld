import { getToken } from "./auth/authManager";
import ICategoryTemplate from "../interfaces/ICategoryTemplate";

const _apiUrl = "/api/category";

export const getCategories = () => {
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

export const getCategoryById = (id: number) => {
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

export const getByTemplateId = (id: number) => {
    return getToken().then((token) => {  
        return fetch(`${_apiUrl}/categorytemplates/${id}`, {
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

export const addCategoryTemplate = (ct: ICategoryTemplate) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(ct),
          }).then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error(
                      "An unknown error occurred while trying to post categories."
                  )
              }
          }
      )
    })
}

export const deleteCategoryTemplate = (ct: ICategoryTemplate) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/categorytemplates`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(ct),
      })
    })
}