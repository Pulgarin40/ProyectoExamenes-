import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-uploader',
  templateUrl: './validar-formato.component.html',
  styleUrls: ['./validar-formato.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExcelUploaderComponent {
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
        // Procesa el archivo aquí
      }
    };
    reader.readAsBinaryString(file);
  }

  isValidFormat(data: any[]): boolean {
    // Añade tus reglas de validación aquí
    // Por ejemplo, verificar que la primera fila tenga ciertos encabezados
    const expectedHeaders = ['Header1', 'Header2', 'Header3'];
    const fileHeaders = data[0];

    return expectedHeaders.every((header, index) => header === fileHeaders[index]);
  }
}
