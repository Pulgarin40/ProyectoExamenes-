import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // si lo implementas
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ExamUploaderComponent } from './pages/pantalla-generar-examen/generar-examen.component';
import { ExcelUploaderComponent } from './pages/pantalla-validar-archivo-excel/validar-formato.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component'; // si lo implementas
import { RegisterComponent } from './pages/register/register.component'; // supondremos que tienes este componente
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'exam-list', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'pantalla-generar-examen',component:ExamUploaderComponent},
  { path:'pantalla-validar-archivo-excel',component:ExcelUploaderComponent}
];
