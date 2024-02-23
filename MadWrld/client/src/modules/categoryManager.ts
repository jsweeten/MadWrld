import { getToken } from "./auth/authManager";
import ICategoryTemplate from "../interfaces/ICategoryTemplate";

const _apiUrl = "/api/category";

export const getCategories = async () => {
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
            return console.error("Unauthorized request");
        } else {
            throw new Error("An unknown error occurred while retrieving categories");
        }
    } catch (error) {throw new Error(`Error while retrieving categories: ${error}`)};
};

export const getCategoryById = async (id: number) => {
    try {
        const token = await getToken();
        const response = await fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            throw new Error("Unauthorized request");
        } else {throw new Error("Unexpected error occurred while retrieving category")};
    } catch (error) {throw new Error(`Error occurred while retrieving category: ${error}`)};
}

export const getByTemplateId = async (id: number) => {
    try {
        const token = await getToken();
        const response = await fetch(`${_apiUrl}/categorytemplates/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            throw new Error("Unauthorized request");
        } else {
            throw new Error("An unexpected error occurred while retrieving data");
        }
    } catch (error) {throw new Error(`An unexpected error occurred: ${error}`);};
}

export const addCategoryTemplate = async (ct: ICategoryTemplate) => {
    try {
        const token = await getToken();
        const response = await fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ct),
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            throw new Error("Unauthorized request");
        } else {
            throw new Error("Unknown error occurred while posting template's category data to database");
        }
    } catch (error) {throw new Error(`Error while posting category data: ${error}`)};
};

export const deleteCategoryTemplate = async (ct: ICategoryTemplate) => {
    try {
        const token = await getToken();
        const response = await fetch(`${_apiUrl}/categorytemplates`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ct),
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