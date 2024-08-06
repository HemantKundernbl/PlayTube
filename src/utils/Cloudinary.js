import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload is successful
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); // remove the locally stored temp file when the upload fails
  }
};

export { uploadOnCloudinary };
