import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserMenuOpen: boolean = false;

  logout() {
    // Implementación del método logout
    console.log('Logout method called');
    // Aquí puedes agregar la lógica para cerrar sesión, por ejemplo, llamar a un servicio de autenticación
  }

  toggleUserMenu() {
    // Implementación del método toggleUserMenu
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const userMenu = document.querySelector('.user-menu');
    const userIcon = document.querySelector('.user-icon');

    if (userMenu && userIcon && !userMenu.contains(target) && !userIcon.contains(target)) {
      this.isUserMenuOpen = false;
    }
  }
}