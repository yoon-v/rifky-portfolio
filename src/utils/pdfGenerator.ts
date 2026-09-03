// Dynamic import used inside downloadElementAsPdf for performance and compatibility

export interface GeneratePdfOptions {
  element: HTMLElement;
  filename?: string;
  onProgress?: (status: string) => void;
}

/**
 * Robust CV / Document to PDF downloader using html2canvas & jsPDF.
 * Renders the provided element at 2x resolution and exports an A4 PDF document.
 */
export async function downloadElementAsPdf({
  element,
  filename = 'CV_Muhammad_Irdiansyah_Rifky.pdf',
  onProgress
}: GeneratePdfOptions): Promise<void> {
  try {
    onProgress?.('Mempersiapkan dokumen...');

    const [html2canvasModule, jsPdfModule] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const html2canvas = (html2canvasModule as any).default || html2canvasModule;
    const jsPDF = (jsPdfModule as any).default || (jsPdfModule as any).jsPDF;

    // Clone or capture styles cleanly
    const canvas = await html2canvas(element, {
      scale: 2, // 2x for sharp print quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0C0C0C', // matches dark aesthetic or clean contrast
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    onProgress?.('Menghasilkan file PDF...');

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Standard A4 dimensions in millimeters
    const pdfWidth = 210;
    const pageHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Multiple pages if CV is longer than A4
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    onProgress?.('Mengunduh PDF...');
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF via html2canvas:', error);
    // Fallback: Clean printable window
    fallbackPrintWindow(element, filename);
  }
}

/**
 * Fallback print window method if canvas extraction is restricted in environment
 */
export function fallbackPrintWindow(element: HTMLElement, title: string = 'Curriculum Vitae'): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // If popups blocked, try direct print
    window.print();
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', sans-serif;
            background: #ffffff;
            color: #111111;
            padding: 32px 40px;
            font-size: 13px;
            line-height: 1.6;
          }
          @media print {
            @page { size: A4 portrait; margin: 15mm; }
            body { padding: 0; }
            button, .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div style="max-width: 800px; margin: 0 auto;">
          ${element.innerHTML}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
