import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';

@Component({
    selector: 'app-employee-update',
    templateUrl: './employee-update.component.html',
    styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
    updateEmployeeForm!: FormGroup;
    id!: number;
    isLoading: boolean = false;
    errorMessage: string | null = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];

        this.updateEmployeeForm = this.fb.group({
            employeeId: ['', [Validators.required, Validators.maxLength(5)]],
            employeeName: ['', [Validators.required, Validators.minLength(3)]],
            employeeEmail: ['', [Validators.required, Validators.email]],
            employeePhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
        });

        this.getEmployeeById();
    }

    get f() {
        return this.updateEmployeeForm.controls;
    }

    getEmployeeById(): void {
        this.isLoading = true;
        this.employeeService.getEmployeeById(this.id).subscribe({
            next: (res) => {
                if (res) {
                    this.updateEmployeeForm.patchValue(res);
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching employee data:', err);
                this.errorMessage = 'Failed to fetch employee details.';
                this.isLoading = false;
            }
        });
    }

    updateEmployee(): void {
        if (this.updateEmployeeForm.invalid) {
            this.updateEmployeeForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this.employeeService.updateEmployee(this.id, this.updateEmployeeForm.value).subscribe({
            next: (res) => {
                console.log('Employee updated:', res);
                this.router.navigateByUrl('');
            },
            error: (err) => {
                console.error('Error updating employee:', err);
                this.errorMessage = 'Failed to update employee.';
                this.isLoading = false;
            }
        });
    }

    deleteEmployee(): void {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.isLoading = true;
            this.employeeService.deleteEmployee(this.id).subscribe({
                next: () => {
                    console.log('Employee deleted');
                    this.router.navigateByUrl('');
                },
                error: (err) => {
                    console.error('Error deleting employee:', err);
                    this.errorMessage = 'Failed to delete employee.';
                    this.isLoading = false;
                }
            });
        }
    }

    navigateToEmployees() {
        this.router.navigateByUrl('');
    }
}
