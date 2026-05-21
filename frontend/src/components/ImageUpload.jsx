// frontend/src/components/ImageUpload.jsx
import { useState } from "react";
import { uploadImage, getImageUrl } from "../services/imageService";
import { useAuth } from "../contexts/AuthContext";

function ImageUpload({ onImageUploaded, currentImageKey }) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageKey, setImageKey] = useState(currentImageKey);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede superar los 5MB");
      return;
    }

    // Vista previa local
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);

    // Subir a S3
    const result = await uploadImage(file, token);

    if (result.success) {
      setImageKey(result.fileKey);
      // Notificar al componente padre
      if (onImageUploaded) {
        onImageUploaded(result.fileKey);
      }
    } else {
      alert(result.error);
      setPreviewUrl(null);
    }

    setUploading(false);
  };

  return (
    <div className="image-upload">
      <label className="upload-label">
        📸 Seleccionar imagen
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          hidden
        />
      </label>

      {uploading && <p>Subiendo imagen...</p>}

      {(previewUrl || imageKey) && (
        <div className="image-preview">
          <img
            src={previewUrl || imageKey}
            alt="Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;