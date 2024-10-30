import { Component } from '@angular/core';
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
}