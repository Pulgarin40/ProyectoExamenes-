import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-reader',
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.css']
})
export class ExcelReaderComponent {
  questions: string[] = [];
  fileName: string = '';

  // Método para manejar la carga de archivos
  onFileChange(event: any) {
    const file = event.target.files[0];

    // Validar si el archivo es un Excel
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      this.fileName = file.name;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

        // Obtener la primera hoja de trabajo
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir hoja de trabajo a JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Extraer preguntas de la primera columna
        this.questions = data.map((row: any) => row[0]).filter((question: any) => question);
      };

      reader.readAsBinaryString(file);
    }
  }
}