import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    CommonModule
  ],
 
  template: `
    <button (click)="fetchData()">Fetch Data</button>
  `
})
export class MyComponent {
  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get('https://api.example.com/data')
      .subscribe(data => {
        console.log(data);   

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('data', JSON.stringify(data));
        }
      });
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }

}
}
