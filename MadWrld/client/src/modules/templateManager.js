import { getToken } from "./authManager";

const _apiUrl = "/api/template";

export const getTemplates = () => {
    return fetch(_apiUrl).then((res) => {
        if (res.ok)
        {
            return res.json();
        } else {
            throw new Error(
                "An unexpected error occurred",
            );
        }
    })
}

export const getTemplateById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => {
        if (res.ok)
        {
            return res.json();
        } else {
            throw new Error(
                "An unknown error occurred while trying to get inventory.",
              );
        }
    })
}