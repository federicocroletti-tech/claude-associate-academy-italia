import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/academy-page.component').then((module) => module.AcademyPageComponent),
  },
  { path: '**', redirectTo: '' },
];
