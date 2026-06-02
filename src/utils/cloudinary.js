/**
 * Utility to generate optimized Cloudinary URLs
 * @param {string} publicId - The public ID of the asset in Cloudinary
 * @param {'image' | 'video'} type - The type of asset
 * @param {object} options - Optional transformations (e.g., width, height, crop)
 * @returns {string} The fully formed optimized URL, or an empty string if cloud name is not set
 */
export function getCloudinaryUrl(publicId, type = 'image', options = {}) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || 'portfolio';
  
  if (!cloudName) {
    return '';
  }

  // Combine the folder and the publicId, avoiding double nesting
  let fullPublicId = publicId;
  if (folder && !publicId.startsWith(folder + '/')) {
    // If the publicId already has a folder structure that matches, don't prepend
    fullPublicId = `${folder}/${publicId}`;
  }

  // Base transformations: f_auto (auto format) and q_auto (auto quality)
  let transformations = 'f_auto,q_auto';

  if (options.width) transformations += `,w_${options.width}`;
  if (options.height) transformations += `,h_${options.height}`;
  if (options.crop) transformations += `,c_${options.crop}`;

  return `https://res.cloudinary.com/${cloudName}/${type}/upload/${transformations}/${fullPublicId}`;
}
