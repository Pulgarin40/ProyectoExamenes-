import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component'; // Add this line to import AppComponent

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
