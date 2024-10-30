import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-test-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent implements OnInit {
  examForm!: FormGroup;
  navbarVisible: boolean = true;
  subjects: string[] = ['Matemáticas', 'Historia', 'Ciencias', 'Literatura', 'Geografía']; // Opciones de materias

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.examForm = this.fb.group({
      totalQuestions: [10, [Validators.required, Validators.min(1)]],
      difficultQuestions: [0, [Validators.required, Validators.min(0)]],
      trueFalseQuestions: [0, [Validators.required, Validators.min(0)]],
      subject: ['', Validators.required] // Nuevo campo de selección de materia
    });
  }

  submitSettings() {
    if (this.examForm.valid) {
      const settings = this.examForm.value;
      console.log('Configuración del examen:', settings);
      // Aquí puedes manejar los datos para generar el examen.
    }
  }
}
