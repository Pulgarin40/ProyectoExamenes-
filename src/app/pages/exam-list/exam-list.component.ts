import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../core/exam.service';
import { AuthService } from '../../core/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe'; // Importa el pipe

const sheet_to_json = XLSX.utils.sheet_to_json;

@Component({
  selector: 'app-exam-list',
  standalone: true, 
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  providers: [ExamService],
  imports: [NavbarComponent, CommonModule, SafeUrlPipe], // Declara el pipe
})
export class ExamListComponent {
  errorMessage: string = '';
  excelData: any[] = [];
  pdfData: SafeResourceUrl = '';
  navbarVisible: boolean = true;

  constructor(private examService: ExamService, private authService: AuthService, private sanitizer: DomSanitizer) {}

  logout(): void {
    this.authService.logout();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.validateAndHandleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('onDragOver event triggered');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('onDrop event triggered');
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.validateAndHandleFile(file);
    }
  }

  private validateAndHandleFile(file: File): void {
    console.log('validateAndHandleFile called with file:', file);
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/pdf'
    ];
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Por favor, sube un archivo Excel o PDF válido.';
      return;
    }

    if (file.type === 'application/pdf') {
      this.handlePdfFile(file);
    } else {
      this.handleExcelFile(file);
    }
  }

  private handleExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.excelData = sheet_to_json(worksheet, { header: 1 });
    };
    reader.onerror = () => {
      this.errorMessage = 'Error al leer el archivo Excel.';
    };
    reader.readAsArrayBuffer(file);
  }

  private handlePdfFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const base64String = this.arrayBufferToBase64(arrayBuffer);
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${base64String}`);
      console.log('PDF file content (base64):', base64String);
    };
    reader.onerror = () => {
      this.errorMessage = 'Error al leer el archivo PDF.';
    };
    reader.readAsArrayBuffer(file);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}