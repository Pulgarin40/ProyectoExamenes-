
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'Pantalla Error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './Pantalla.Error.Component.html',
  styleUrls: ['./Pantalla.Error.Component.css' ,]
}

function goBack() {
    alert("Volviendo a la página anterior");
}