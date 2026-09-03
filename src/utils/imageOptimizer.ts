/**
 * Utility to optimize and compress user-uploaded images in the browser.
 * Reduces raw multi-megabyte photos to clean, lightweight JPEG data URLs (~50-150KB)
 * to prevent localStorage QuotaExceededError and ensure instant loading across the app.
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function compressAndOptimizeImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<string> {
  const { maxWidth = 1400, maxHeight = 1400, quality = 0.85 } = options;

  return new Promise((resolve, reject) => {
    // Basic file validation
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File yang dipilih bukan gambar yang valid (JPG, PNG, WebP).'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Gagal membaca file gambar. Silakan coba lagi.'));
    };

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        reject(new Error('Format gambar tidak didukung atau file rusak.'));
      };

      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Calculate aspect ratio scaling
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('Canvas rendering context tidak tersedia.'));
          }

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw image to canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Export as clean JPEG or WebP data URL
          // JPEG is universally compatible in all browsers & storage
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Gagal mengompresi gambar.'));
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable string (e.g. 240 KB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
