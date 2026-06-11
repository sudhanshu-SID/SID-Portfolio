import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const mediaDir = path.join(__dirname, '../public/know_me');
const folderName = process.env.VITE_CLOUDINARY_FOLDER || 'portfolio';

async function uploadFiles() {
  try {
    const files = fs.readdirSync(mediaDir);
    
    for (const file of files) {
      const filePath = path.join(mediaDir, file);
      
      // Determine resource type
      const isVideo = file.endsWith('.mp4');
      const resourceType = isVideo ? 'video' : 'image';
      
      // Use filename without extension as public_id
      const publicId = path.parse(file).name;
      
      console.log(`Uploading ${file}...`);
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
        public_id: publicId,
        resource_type: resourceType,
        overwrite: true
      });
      
      console.log(`Uploaded ${file} successfully: ${result.secure_url}`);
    }
    console.log('All files uploaded successfully!');
  } catch (error) {
    console.error('Error uploading files:', error);
  }
}

uploadFiles();
