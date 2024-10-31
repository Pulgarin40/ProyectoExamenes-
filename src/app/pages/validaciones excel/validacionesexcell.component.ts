import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-exams',
  template: `
    <input type="file" (change)="onFileChange($event)" accept=".xlsx, .xls" />
    <div *ngIf="mensaje">{{ mensaje }}</div>
    <ul *ngIf="errores.length > 0">
      <li *ngFor="let error of errores">{{ error }}</li>
    </ul>
  `,
})
export class UploadExamsComponent {
  mensaje: string | null = null;
  errores: string[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.mensaje = 'No se ha seleccionado ningún archivo.';
      this.errores = [];
      return;
    }

    // Validar formato de archivo
    const validFormats = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validFormats.includes(file.type)) {
      this.mensaje = 'Formato de archivo incorrecto. Debe ser un archivo Excel (.xlsx o .xls).';
      this.errores = [];
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.validarDatos(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  validarDatos(data: any) {
    this.errores = []; // Limpiar errores previos

    if (data.length === 0) {
      this.mensaje = 'El archivo está vacío.';
      return;
    }

    const encabezados = data[0];
    const columnasEsperadas = ['Examen', 'Pregunta', 'Opción A', 'Opción B', 'Opción C', 'Opción D', 'Respuesta Correcta'];

    // Verificar encabezados
    for (const col of columnasEsperadas) {
      if (!encabezados.includes(col)) {
        this.errores.push(`Falta la columna: ${col}`);
      }
    }

    // Validación de datos
    for (let i = 1; i < data.length; i++) {
      const fila = data[i];

      // Validar 'Examen'
      if (!fila[0] || typeof fila[0] !== 'string') {
        this.errores.push(`La fila ${i + 1} tiene un examen inválido.`);
      }

      // Validar 'Pregunta'
      if (!fila[1] || typeof fila[1] !== 'string') {
        this.errores.push(`La fila ${i + 1} tiene una pregunta inválida.`);
      }

      // Validar 'Opciones'
      for (let j = 2; j <= 5; j++) {
        if (!fila[j] || typeof fila[j] !== 'string') {
          this.errores.push(`La fila ${i + 1} tiene una opción inválida en la columna ${encabezados[j]}.`);
        }
      }

      // Validar 'Respuesta Correcta'
      const respuestaCorrecta = fila[6];
      if (typeof respuestaCorrecta !== 'string' || !['A', 'B', 'C', 'D'].includes(respuestaCorrecta)) {
        this.errores.push(`La fila ${i + 1} tiene una respuesta correcta inválida: ${respuestaCorrecta}. Debe ser A, B, C o D.`);
      }
    }

    // Mensaje final
    if (this.errores.length === 0) {
      this.mensaje = 'El archivo es válido.';
    } else {
      this.mensaje = 'Se encontraron errores en el archivo:';
    }
  }
}