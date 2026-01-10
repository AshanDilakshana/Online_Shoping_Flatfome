import React from 'react';
import { X, Upload } from 'lucide-react';

export function ImageUploadPreview({
  images,
  onChange,
  maxImages = 6
}) {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = files.slice(0, remainingSlots);
    
    // Store the actual File objects instead of base64
    onChange([...images, ...filesToProcess]);
  };
  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };
  
  // Helper function to get image preview URL
  const getImagePreview = (image) => {
    if (typeof image === 'string') {
      // Already a URL (from database or Supabase)
      return image;
    } else if (image instanceof File) {
      // Create object URL for File preview
      return URL.createObjectURL(image);
    }
    return '';
  };
  return <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Product Images (Max {maxImages})
      </label>

      {images.length < maxImages && <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-300 hover:bg-rose-50/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
        </label>}

      {images.length > 0 && <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => <div key={index} className="relative group aspect-square">
              <img src={getImagePreview(image)} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg border border-gray-200" />
              <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>)}
        </div>}
    </div>;
}
