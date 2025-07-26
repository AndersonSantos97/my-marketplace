export const getDriveDirectUrl = (url?: string | null) => {
  if (!url || typeof url !== "string") return null;

  try {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url; // Si no es formato de Drive, devuélvelo igual
  } catch {
    return null;
  }
};

 