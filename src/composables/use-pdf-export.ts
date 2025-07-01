import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function usePdfExport() {
  const exportToPdf = async (element: HTMLElement, filename: string, title?: string) => {
    try {
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '1200px'; 
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '30px';
      tempContainer.style.fontFamily = 'Arial, Helvetica, sans-serif';
      tempContainer.style.boxSizing = 'border-box';
      
      if (title) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        titleElement.style.textAlign = 'center';
        titleElement.style.color = '#2c3e50';
        titleElement.style.marginBottom = '30px';
        titleElement.style.fontSize = '28px';
        titleElement.style.fontWeight = 'bold';
        titleElement.style.borderBottom = '3px solid #3498db';
        titleElement.style.paddingBottom = '15px';
        tempContainer.appendChild(titleElement);
      }
      
      const originalCanvases = element.querySelectorAll('canvas');
      const canvasImages: string[] = [];
      
      for (const canvas of Array.from(originalCanvases)) {
        try {
          const dataURL = canvas.toDataURL('image/png', 1.0);
          canvasImages.push(dataURL);
        } catch (error) {
          console.warn('Could not convert canvas to image:', error);
          canvasImages.push('');
        }
      }
      
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '100%';
      clonedElement.style.height = 'auto';
      clonedElement.style.maxHeight = 'none';
      clonedElement.style.overflow = 'visible';
      clonedElement.style.backgroundColor = 'white';
      clonedElement.style.borderRadius = '12px';
      clonedElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      clonedElement.style.padding = '20px';
      
      const clonedCanvases = clonedElement.querySelectorAll('canvas');
      let imageIndex = 0;
      
      for (const canvas of Array.from(clonedCanvases)) {
        if (canvasImages[imageIndex]) {
          const img = document.createElement('img');
          img.src = canvasImages[imageIndex];
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.maxWidth = '100%';
          img.style.display = 'block';
          img.style.margin = '20px 0';
          img.style.borderRadius = '8px';
          img.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
          
          canvas.parentNode?.replaceChild(img, canvas);
        }
        imageIndex++;
      }
      
      const interactiveElements = clonedElement.querySelectorAll('button, .hover, [style*="hover"]');
      interactiveElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
      
      const timestampElement = document.createElement('div');
      timestampElement.style.textAlign = 'center';
      timestampElement.style.color = '#7f8c8d';
      timestampElement.style.fontSize = '12px';
      timestampElement.style.marginTop = '20px';
      timestampElement.style.borderTop = '1px solid #ecf0f1';
      timestampElement.style.paddingTop = '15px';
      timestampElement.textContent = `Generado el: ${new Date().toLocaleString('es-ES')}`;
      
      tempContainer.appendChild(clonedElement);
      tempContainer.appendChild(timestampElement);
      document.body.appendChild(tempContainer);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(tempContainer, {
        scale: 3, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1200,
        height: tempContainer.scrollHeight,
        logging: false,
        imageTimeout: 15000,
        removeContainer: true
      });
      
      document.body.removeChild(tempContainer);
      
      const pdf = new jsPDF('l', 'mm', 'a4');
      
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 15;
      const availableWidth = pageWidth - (2 * margin);
      const availableHeight = pageHeight - (2 * margin);
      
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;
      
      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', margin, margin, imgWidth, imgHeight);
      heightLeft -= availableHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pageNumber++;
        
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Página ${pageNumber}`, pageWidth - 25, pageHeight - 10);
        
        pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', margin, margin + position, imgWidth, imgHeight);
        heightLeft -= availableHeight;
      }
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Página 1', pageWidth - 25, pageHeight - 10);
      
      pdf.save(`${filename}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  };
  
  const exportChartToPdf = async (chartElement: HTMLElement, chartType: string, _data: any[]) => {
    const title = `Top 10 Productos - ${chartType}`;
    const filename = `top-10-productos-${chartType.toLowerCase()}`;
    await exportToPdf(chartElement, filename, title);
  };
  
  const exportListToPdf = async (listElement: HTMLElement, _data: any[]) => {
    const title = 'Top 10 Productos - Listado';
    const filename = 'top-10-productos-listado';
    await exportToPdf(listElement, filename, title);
  };
  
  return {
    exportToPdf,
    exportChartToPdf,
    exportListToPdf
  };
} 