import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor() {}

  // Método para leer un archivo Excel
  async readExcel(file: File): Promise<any> {
    // Validar el tipo de archivo
    if (!this.isExcelFile(file)) {
      throw new Error('El archivo debe ser un archivo Excel (.xlsx)');
    }

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();

    try {
      await workbook.xlsx.load(buffer);
    } catch (error) {
      throw new Error('Error al cargar el archivo Excel. Asegúrate de que el archivo esté en el formato correcto.');
    }
    
    const worksheet = workbook.getWorksheet(1); // Obteniendo la primera hoja de trabajo

    if (!worksheet) {
      throw new Error('La hoja de trabajo no existe. Asegúrate de que el archivo tiene hojas.');
    }

    const data = this.extractDataFromWorksheet(worksheet);
    return data; // Devolvemos los datos extraídos
  }

  // Método para escribir datos en un archivo Excel
  async writeExcel(data: any[]): Promise<Blob> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Escribir los datos
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Exportamos el archivo como Blob
    const buffer = await workbook.xlsx.writeBuffer();
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  // Método privado para extraer datos de una hoja de trabajo
  private extractDataFromWorksheet(worksheet: ExcelJS.Worksheet): any[] {
    const data: any[] = [];
    worksheet.eachRow((row) => {
      const rowData: any[] = [];
      row.eachCell((cell) => {
        rowData.push(cell.value);
      });
      data.push(rowData);
    });
    return data;
  }

  // Método privado para verificar si el archivo es un archivo Excel
  private isExcelFile(file: File): boolean {
    const allowedExtensions = /(\.xlsx|\.xls)$/i; // Permitir solo archivos .xlsx y .xls
    return allowedExtensions.test(file.name);
  }
}
