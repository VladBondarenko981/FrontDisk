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
    console.log(token);
    await api.post("/files/addFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Файл отправлен");
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
  }
};

export const getFiles = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Токен отсутствует");
    return [];
  }
  try {
    const response = await api.get("/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Файлы успешно получены");
    return response.data || [];
  } catch (error) {
    console.error(
      "Ошибка получения файлов:",
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
    console.log(token);
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
    console.log("Файл теперь избранный", filename);
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
  }
};

export const downloadFile = async (filename: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    console.log("URL для загрузки:", `/files/download/${filename}`);
    const response = await api.get(`/files/download/${filename}`, {
      responseType: "blob", // Указываем blob для корректного скачивания файла
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Создаём ссылку для скачивания
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Указываем имя файла
    document.body.appendChild(link);
    link.click();

    // Убираем ссылку из DOM
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
  }
};

export const openFile = async (filename: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    console.log("URL для загрузки:", `/files/download/${filename}?action=open`);
    const response = await api.get(`/files/download/${filename}?action=open`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    // Создаём ссылку для скачивания
    const url = window.URL.createObjectURL(response.data);
    window.open(url, "_blank"); // Открыть файл в новой вкладке
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
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
    console.error("Не удалось переименовать файл:", error);
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
    console.error("Не удалось удалить файл", error);
  }
};
