import axios from "axios";

// Cloudinary Upload Hook
export const useCloudinaryUpload = () => {
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jse2zfd4"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "kodenigga"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `${CLOUDINARY_URL}@kodenigga/image/upload`, // Replace with your Cloudinary endpoint
        formData
      );
      console.log(response.data.secure_url)
      return response.data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
  };

  return { uploadToCloudinary };
};
