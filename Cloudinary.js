import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

export const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        })
      },
      {
        resource_type: 'auto',
        folder: folder,
      },
    )
  })
}
