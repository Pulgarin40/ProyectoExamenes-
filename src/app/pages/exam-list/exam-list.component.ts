import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../core/exam.service';
import { AuthService } from '../../core/auth.service';
import { NavbarComponent } from '../navbar/navbar.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  providers: [ExamService]
})
export class ExamListComponent {
  errorMessage: string = '';
  excelData: any[] = [];
  isUserMenuOpen: boolean = false;
  navbarVisible: boolean = true; // Define la propiedad navbarVisible

  constructor(private examService: ExamService, private authService: AuthService) {}

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout(); // Usar el método logout del AuthService
    this.isUserMenuOpen = false;
  }

  // Detectar clics fuera del menú para cerrarlo
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.isUserMenuOpen = false;
    }
  }

  onFileSelect(event: Event): void {
    // Lógica para manejar la selección de archivos
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    // Lógica para manejar la caída de archivos
  }
}