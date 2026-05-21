// frontend/src/services/imageService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sube una imagen a S3 usando Presigned URL
 */
export const uploadImage = async (file, token) => {
  try {
    // 1. Solicitar URL firmada al backend
    const urlResponse = await axios.post(
      `${API_URL}/images/upload-url`,
      {
        fileName: file.name,
        fileType: file.type,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { uploadUrl, fileKey } = urlResponse.data;

    // 2. Subir el archivo DIRECTAMENTE a S3 usando la URL firmada
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return {
      success: true,
      fileKey,
      message: "Imagen subida exitosamente",
    };
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Error al subir imagen",
    };
  }
};

/**
 * Obtiene una URL firmada para visualizar una imagen
 */
export const getImageUrl = async (fileKey, token) => {
  try {
    const response = await axios.get(`${API_URL}/images/view/${fileKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.imageUrl;
  } catch (error) {
    console.error("Error al obtener URL de imagen:", error);
    return null;
  }
};

/**
 * Elimina una imagen de S3
 */
export const deleteImage = async (fileKey, token) => {
  try {
    await axios.delete(`${API_URL}/images/${fileKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return { success: false, error: error.message };
  }
};