import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ImageUploadProps {
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
}

export function ImageUpload({ onImagesChange, initialImages = [], maxImages = 5 }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;

  const handleFileUpload = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`Максимум ${maxImages} изображений`);
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`Файл ${file.name} не является изображением`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`Файл ${file.name} слишком большой (макс. 5MB)`);
          continue;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);

        // Upload to server
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображений');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${dragActive 
            ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
            : 'border-white/20 hover:border-white/40'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
        
        <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
        
        {uploading ? (
          <p className="text-white/60">Загрузка...</p>
        ) : (
          <>
            <p className="text-white mb-2">
              Перетащите изображения сюда или нажмите для выбора
            </p>
            <p className="text-white/40 text-sm">
              PNG, JPG, WEBP до 5MB ({images.length}/{maxImages})
            </p>
          </>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square bg-black/50 rounded-lg overflow-hidden group"
            >
              <img
                src={url}
                alt={`Изображение ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="
                  absolute top-2 right-2 
                  bg-red-500 hover:bg-red-600 
                  text-white rounded-full p-1
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* URL Input Fallback */}
      <details className="text-white/60 text-sm">
        <summary className="cursor-pointer hover:text-white">
          Или добавить изображения по URL
        </summary>
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const input = e.currentTarget;
                const url = input.value.trim();
                if (url && images.length < maxImages) {
                  const newImages = [...images, url];
                  setImages(newImages);
                  onImagesChange(newImages);
                  input.value = '';
                }
              }
            }}
          />
          <p className="text-xs text-white/40">
            Вставьте URL и нажмите Enter
          </p>
        </div>
      </details>
    </div>
  );
}
