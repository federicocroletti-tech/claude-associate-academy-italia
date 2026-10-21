import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AcademyPageComponent } from './app/features/academy-page.component';

bootstrapApplication(AcademyPageComponent, appConfig).catch((error: unknown) => {
  console.error('Avvio dell’applicazione non riuscito.', error);
});
