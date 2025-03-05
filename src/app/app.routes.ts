import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'jm/employee-management/home', pathMatch: 'full' },
    { path: 'jm/employee-management/home', component: HomeComponent },
    { path: 'jm/employee-management/employee', component: EmployeeComponent },
    { path: '**', redirectTo: 'jm/employee-management/home', pathMatch: 'full' }
];

@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }