import cloudinary from 'cloudinary';
import { config as _config } from 'dotenv';
import process from 'process';
import { createReadStream } from 'fs';

_config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// export async function uploads(file, folder) {
//   console.log('FILE PATH', file);
//   const result = await new Promise(resolve => {
//     cloudinary.v2.uploader.upload(file, {
//       resource_type: 'auto',
//       folder
//     }, (result) => {
//       console.log(result);
//       resolve({
//         url: result.url,
//         id: result.public_id
//       });
//     });
//   });
// }
export const uploads = async (file: any): Promise<string> => {
  console.log('FILE ---->', file);
  const uniqueFilename = new Date().toISOString();

  const result = await new Promise(async (resolve, reject) =>

    createReadStream(file.path)
      .pipe(
        cloudinary.v2.uploader.upload_stream(
          {
            folder: 'chnirt',
            public_id: uniqueFilename,
            tags: 'chnirt'
          }, // directory and tags are optional
          (err, image) => {
            if (err) {
              reject(err);
            }
            resolve(image);
          }
        )
      )
      .on('close', () => {
        resolve(true);
      })
      .on('error', () => reject(false))
  );

  return result['secure_url'];
};
