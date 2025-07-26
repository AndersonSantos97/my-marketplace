// utils/uploadImageToCloudinary.ts
export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'TU_UPLOAD_PRESET'); // reemplaza con tu upload preset
  formData.append('cloud_name', 'df64rglff'); // reemplaza con tu cloud name

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // URL final de la imagen
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    return null;
  }
};
