import axios from "axios";
import { FavOption } from "../interfaces/Interfaces";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const addFile = async (file: File | null) => {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  try {
    const token = localStorage.getItem("token");

    await api.post("/files/addFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("File upload error:", error);
  }
};

export const getFiles = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token");
    return [];
  }
  try {
    const response = await api.get("/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error(
      "Error receiving files:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const redactFileFavOption = async ({
  filename,
  favOption,
}: FavOption) => {
  try {
    const token = localStorage.getItem("token");

    await api.patch(
      "/files/setFav",
      {
        filename,
        favOption,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("File upload error:", error);
  }
};

export const downloadFile = async (filename: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/files/download/${filename}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const openFile = async (filename: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/files/download/${filename}?action=open`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(response.data);
    window.open(url, "_blank");
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const renameFile = async (filename: string, newName: string) => {
  try {
    const token = localStorage.getItem("token");
    await api.patch(
      "/files/renameFile",
      { filename, newName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to rename file:", error);
  }
};

export const deleteFile = async (filename: string) => {
  try {
    const token = localStorage.getItem("token");
    await api.patch(
      "/files/moveToTrash",
      { filename },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to delete file", error);
  }
};
