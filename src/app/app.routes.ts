import { Routes } from '@angular/router';
import { UserFormComponent } from './features/users/components/user-form/user-form.component';
import { UsersTableComponent } from './features/users/components/users-table/users-table.component';
import { countriesResolver } from './core/resolvers/countries.resolver';

export const routes: Routes = [
    { path: 'users', component: UsersTableComponent },
    { path: 'user-form', component: UserFormComponent, resolve: {countries: countriesResolver} },     
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];
