import { Component } from '@angular/core';
import { Employee, EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

    employees: Employee[] = [];

    constructor(private employeeService: EmployeeService, private router: Router) {}

    ngOnInit(){
        this.getAllEmployees();
    }

    getAllEmployees(){
        this.employeeService.getAllEmployee().subscribe((res) => {
            console.log(res);
            this.employees = res;
        });
    }

    editEmployee(id: number) {
        this.router.navigate(['employee', id]);
    }

    deleteEmployee(id: number) {
        this.employeeService.deleteEmployee(id).subscribe((res) => {
            console.log(res);
            this.getAllEmployees();
        })
    }
}
