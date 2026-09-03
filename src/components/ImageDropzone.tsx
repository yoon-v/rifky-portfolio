import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Check, X, RefreshCw, AlertCircle } from 'lucide-react';
import { compressAndOptimizeImage, formatFileSize } from '../utils/imageOptimizer';

interface ImageDropzoneProps {
  label: string;
  sublabel?: string;
  currentImage?: string;
  onImageUploaded: (dataUrl: string) => void;
  onImageRemoved?: () => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  label,
  sublabel = 'Format didukung: JPG, PNG, WEBP (Otomatis dioptimalkan)',
  currentImage,
  onImageUploaded,
  onImageRemoved,
  aspectRatio = 'video',
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.85,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [optimizationInfo, setOptimizationInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Pilih file gambar yang valid (JPG, PNG, atau WebP).');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setOptimizationInfo(null);

    const originalSize = file.size;

    try {
      const optimizedDataUrl = await compressAndOptimizeImage(file, {
        maxWidth,
        maxHeight,
        quality,
      });

      // Calculate approximate size from base64 string
      const approxBytes = Math.round((optimizedDataUrl.length * 3) / 4);
      setOptimizationInfo(
        `File asli: ${formatFileSize(originalSize)} ➔ Dioptimalkan: ${formatFileSize(approxBytes)}`
      );

      onImageUploaded(optimizedDataUrl);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Gagal memproses gambar. Silakan coba file lain.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // reset input so same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const aspectClasses = {
    square: 'aspect-square max-w-[200px]',
    video: 'aspect-[16/9] w-full',
    portrait: 'aspect-[3/4] max-w-[220px]',
    auto: 'min-h-[140px] w-full',
  }[aspectRatio];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
          {label}
        </label>
        {optimizationInfo && (
          <span className="text-[11px] font-mono-tech text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" />
            {optimizationInfo}
          </span>
        )}
      </div>

      {currentImage ? (
        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-neutral-950 group">
          <div className={`${aspectClasses} relative flex items-center justify-center overflow-hidden mx-auto`}>
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-mono-tech font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>GANTI</span>
              </button>
              {onImageRemoved && (
                <button
                  type="button"
                  onClick={onImageRemoved}
                  className="px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-xs font-mono-tech font-bold hover:bg-red-500 transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>HAPUS</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
              : 'border-white/15 hover:border-emerald-400/50 bg-neutral-900/40 hover:bg-neutral-900/70'
          }`}
        >
          {isProcessing ? (
            <div className="py-6 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
              <p className="text-xs font-mono-tech text-neutral-300">
                Mengompresi & mengoptimalkan gambar...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Klik untuk pilih file atau seret gambar ke sini
                </p>
                <p className="text-[11px] text-neutral-500 font-mono-tech mt-1">{sublabel}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 mt-1">
                <ImageIcon className="w-3 h-3 text-emerald-400" />
                Pilih dari Perangkat
              </span>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-500/20 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
