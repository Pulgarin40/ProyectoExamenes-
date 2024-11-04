import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { RegisterComponent } from './pages/register/register.component'; // supondremos que tienes este componente
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component'; // si lo implementas
import { AuthGuard } from './core/guards/auth.guard'; // si lo implementas
import { TestGeneratorComponent } from './pages/test-generator/test-generator.component';
import { ExcelReaderComponent } from './pages/excel-reader/excel-reader.component';
import { Pantalla Exito } from './pages/Pantalla Exito/PantallaExito.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'exam-list', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/exam-list', pathMatch: 'full' },
  { path: 'test-generator', component: TestGeneratorComponent},
  { path: 'excel-reader', component: ExcelReaderComponent },
];
