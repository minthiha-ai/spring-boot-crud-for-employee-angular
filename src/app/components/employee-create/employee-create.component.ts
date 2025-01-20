import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

    postEmployeeForm!: FormGroup;

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.postEmployeeForm = this.formBuilder.group({
            employeeId: ['', [Validators.required, Validators.maxLength(5)]],
            employeeName: ['', [Validators.required, Validators.minLength(3)]],
            employeeEmail: ['', [Validators.required, Validators.email]],
            employeePhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
        });
    }

    get f() {
        return this.postEmployeeForm.controls;
    }

    isFieldInvalid(field: string): boolean {
        return this.postEmployeeForm.controls[field].invalid &&
            (this.postEmployeeForm.controls[field].dirty || this.postEmployeeForm.controls[field].touched);
    }

    postEmployee() {
        if (this.postEmployeeForm.invalid) {
            this.postEmployeeForm.markAllAsTouched();
            return;
        }
        console.log(this.postEmployeeForm.value);
        this.employeeService.postEmployee(this.postEmployeeForm.value).subscribe((res) => {
            console.log(res);
            if (res.id != null) {
                this.router.navigateByUrl("");
            }
        });
    }
}
