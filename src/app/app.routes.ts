import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { ExamListComponent } from './pages/exam-list.component';
import { RegisterComponent } from './pages/register.componet'; // supondremos que tienes este componente
import { RecoverPasswordComponent } from './pages/recover-password.component'; // si lo implementas
import { AuthGuard } from './core/guards/auth.guard'; // si lo implementas

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'exam-list', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
