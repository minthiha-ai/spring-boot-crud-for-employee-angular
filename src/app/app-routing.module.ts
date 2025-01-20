import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';

const routes: Routes = [
    {path: '', component: EmployeeListComponent},
    {path: 'employee', component: EmployeeCreateComponent},
    {path: 'employee/:id', component: EmployeeUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
