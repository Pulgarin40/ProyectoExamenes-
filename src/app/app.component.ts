import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MyComponent } from './components/my-component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { UploadFileComponent } from "./pages/generator-examen/upload-file.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ExamListComponent, MyComponent, UploadFileComponent],
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
