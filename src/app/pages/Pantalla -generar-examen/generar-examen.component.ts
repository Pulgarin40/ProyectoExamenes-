
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exam-uploader',
  templateUrl: './generar-examen.component.html',
  styleUrls: ['./generar-examen.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExamUploaderComponent {
  file: File | null = null;
  errorMessage: string = '';

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      this.errorMessage = 'Por favor, carga solo un archivo a la vez.';
      return;
    }

    this.file = target.files[0];
    this.validateFile(this.file);
  }

  validateFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Aquí puedes añadir tus validaciones específicas
      const sheetName: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (!this.isValidFormat(data)) {
        this.errorMessage = 'El formato del archivo Excel no es válido.';
        this.file = null;
      } else {
        this.errorMessage = '';
        // Preparar para procesar el archivo en sprints posteriores
      }
    };
    reader.readAsBinaryString(file);
  }

  isValidFormat(data: any[]): boolean {
    // Añade tus reglas de validación aquí
    // Por ejemplo, verificar que la primera fila tenga ciertos encabezados
    const expectedHeaders = ['Pregunta', 'Opción1', 'Opción2', 'Opción3', 'Opción4', 'RespuestaCorrecta'];
    const fileHeaders = data[0];

    return expectedHeaders.every((header, index) => header === fileHeaders[index]);
  }
}
