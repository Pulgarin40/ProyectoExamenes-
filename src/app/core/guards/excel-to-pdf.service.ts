import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelToPdfService {
  constructor() {}

  async convertExcelToPdf(file: File): Promise<Uint8Array> {
    // Leer el archivo Excel
    const data = await this.readExcelFile(file);
    // Crear el documento PDF
    return this.createPdf(data);
  }

  private readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryString = e.target?.result as string;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsBinaryString(file);
    });
  }

  private async createPdf(data: any[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    let y = page.getHeight() - 20; // Starting position from top
    data.forEach((row) => {
      const rowString = row.join(' | '); // Join row data with a separator
      page.drawText(rowString, { x: 20, y, size: 12 });
      y -= 20; // Move down for the next row
    });

    return await pdfDoc.save();
  }
}
