import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent) },
  { path: 'modal', loadComponent: () => import('./pages/modal/modal.component').then(m => m.ModalComponent) },
  { path: 'form', loadComponent: () => import('./pages/form/form.component').then(m => m.FormComponent) },
  { path: 'button', loadComponent: () => import('./pages/button/button.component').then(m => m.ButtonComponent) },
  { path: 'select', loadComponent: () => import('./pages/select/select.component').then(m => m.SelectComponent) },
];
