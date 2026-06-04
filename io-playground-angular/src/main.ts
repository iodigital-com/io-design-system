import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { defineCustomElements } from '@iodigital-com/components/loader';

defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
