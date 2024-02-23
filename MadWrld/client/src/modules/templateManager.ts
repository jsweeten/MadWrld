import ITemplate, { ITemplateTitle } from "../interfaces/ITemplate";
import IAnswerTemplate from "../interfaces/IAnswerTemplate";
import { getToken } from "./auth/authManager";

const _apiUrl = "/api/template";

export const getTemplates = async () => {
  try {
    const token = await getToken();
    const response = await fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while trying to save a new madlib.");
    }
  } catch (error) {throw new Error(`Error retrieving templates: ${error}`)};
};

export const getTemplateById = async (id: number) => {
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
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while trying to save a new madlib.");
    }
  } catch (error) {throw new Error(`Error retrieving templates: ${error}`)};
};

export const addMadLib = async (madlibAnswerArray: string[], templateId: number) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/madlibform/${templateId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(madlibAnswerArray),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while trying to save a new madlib.");
    }
  } catch (error) {throw new Error(`Error adding madlib: ${error}`)};
};

export const addTemplate = async (template: ITemplateTitle) => {
  try {
    const token = await getToken();
    const response = await fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while trying to save a new template.");
    }
  } catch (error) {throw new Error(`Error adding template: ${error}`)};
}

export const addAnswerTemplate = async (sentence: IAnswerTemplate) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/answertemplate`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sentence),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while sending template");
    }
  } catch (error) {throw new Error(`Error posting template: ${error}`)};
};

export const editTemplate = async (template: ITemplate) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${template.id}`, {
    method: "PUT",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(template),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while sending template");
    }
  } catch (error) {throw new Error(`Error posting template: ${error}`)};
};

export const editAnswerTemplate = async (answerTemplate: IAnswerTemplate) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/answertemplate/${answerTemplate.id}`, {
    method: "PUT",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(answerTemplate),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("An unknown error occurred while sending template");
    }
  } catch (error) {throw new Error(`Error posting template: ${error}`)};
};

export const getTemplatesByUserId = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {throw new Error("An unknown error occurred while retrieving user templates")};
  } catch (error) {throw new Error(`Error retrieving templates: ${error}`)};
};

export const deleteTemplate = async (id: number): Promise<boolean> => {
  try {
    const token = await getToken()
    const response = await fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
      },
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