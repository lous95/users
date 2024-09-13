import { Routes } from '@angular/router';
import { UserFormComponent } from './features/users/components/user-form/user-form.component';
import { UsersTableComponent } from './features/users/components/users-table/users-table.component';

export const routes: Routes = [
    { path: 'users', component: UsersTableComponent },
    { path: 'user-form', component: UserFormComponent },     
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];
