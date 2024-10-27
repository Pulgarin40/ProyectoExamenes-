import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MyComponent } from './components/my-component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { ExamUploaderComponent } from "./pages/pantalla-generar-examen/generar-examen.component";
import { ExcelUploaderComponent } from "./pages/pantalla-validar-archivo-excel/validar-formato.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ExamListComponent, MyComponent, ExamUploaderComponent, ExcelUploaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet>
  <app-my-component></app-my-component>
  `,
})
export class AppComponent {
  title = 'ProyectoExamenes';
}
