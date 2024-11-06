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
  maxQuestionsOptions: number[] = []; // Opciones generales de números de preguntas
  difficultQuestionsOptions: number[] = []; // Opciones dinámicas para preguntas difíciles
  trueFalseQuestionsOptions: number[] = []; // Opciones dinámicas para preguntas de verdadero/falso

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.maxQuestionsOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5); // Múltiplos de 5 hasta 100
    this.examForm = this.fb.group({
      totalQuestions: [10, [Validators.required, Validators.min(5)]],
      difficultQuestions: [0, [Validators.required, Validators.min(0)]],
      trueFalseQuestions: [0, [Validators.required, Validators.min(0)]],
      subject: ['', Validators.required] // Campo de selección de materia
    });

    // Inicializar las opciones de selección según el valor inicial de totalQuestions
    this.updateQuestionLimits();

    // Observar cambios en los campos para actualizar dinámicamente las opciones de selección
    this.examForm.get('totalQuestions')?.valueChanges.subscribe(() => {
      this.updateQuestionLimits();
    });
    this.examForm.get('difficultQuestions')?.valueChanges.subscribe(() => {
      this.updateQuestionLimits();
    });
    this.examForm.get('trueFalseQuestions')?.valueChanges.subscribe(() => {
      this.updateQuestionLimits();
    });
  }

  updateQuestionLimits() {
    const totalQuestions = this.examForm.get('totalQuestions')?.value || 0;
    const difficultQuestions = this.examForm.get('difficultQuestions')?.value || 0;
    const trueFalseQuestions = this.examForm.get('trueFalseQuestions')?.value || 0;

    // Calcular el máximo disponible para cada campo basado en las selecciones
    const maxDifficultQuestions = totalQuestions - trueFalseQuestions;
    const maxTrueFalseQuestions = totalQuestions - difficultQuestions;

    // Crear las opciones dinámicas para cada campo
    this.difficultQuestionsOptions = Array.from({ length: maxDifficultQuestions + 1 }, (_, i) => i);
    this.trueFalseQuestionsOptions = Array.from({ length: maxTrueFalseQuestions + 1 }, (_, i) => i);
  }

  submitSettings() {
    if (this.examForm.valid) {
      const settings = this.examForm.value;
      console.log('Configuración del examen:', settings);
      // Aquí puedes manejar los datos para generar el examen.
    }
  }
}
