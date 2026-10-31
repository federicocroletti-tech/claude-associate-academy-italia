import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AcademyPageComponent } from './app/features/academy-page.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AcademyPageComponent, config, context);

export default bootstrap;
