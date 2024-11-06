import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-error',
  templateUrl: './pantalla-error.component.html',
  styleUrls: ['./pantalla-error.component.css']
})
export class PantallaErrorComponent {
  constructor(private router: Router) {}

  goBack(): void {
    // Redirige a exam-list cuando el usuario hace clic en "Aceptar"
    this.router.navigate(['/exam-list']);
  }
}