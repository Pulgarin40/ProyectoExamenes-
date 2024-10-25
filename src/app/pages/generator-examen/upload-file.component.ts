import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  selectedFile: File | null = null;

  // Método para manejar la selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el envío automático del formulario

    if (this.selectedFile) {
      // Aquí puedes manejar el archivo, como enviarlo a un servidor
      console.log('Subiendo el archivo:', this.selectedFile.name);
      // Lógica para enviar el archivo al servidor, si es necesario
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }
}
