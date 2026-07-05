import cloudinary from "../config/cloudinary";

const cloudinaryUpload = (buffer: Buffer): Promise<{ imageUrl: string; imagePublicId: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "menu" }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({ imageUrl: result!.secure_url, imagePublicId: result!.public_id });
      })
      .end(buffer);
  });
};

export default cloudinaryUpload;