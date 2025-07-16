import { API_PATHS } from "./apiPaths.cjs";
import axiosInstance from "./axiosInstanse.cjs";

const uploadImage = async (imageFile) =>{
    const formData = new FormData();
    // Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/formData', //set header for file upload
            },
        });
        return response.data; // Return response data 
    } catch (error) {
        console.error('Error uploading the image:', error)
        throw error; // rethrow errror for handling
    }
};

export default uploadImage;