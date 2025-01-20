import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {

    postEmployeeForm: FormGroup;

    constructor(
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.postEmployeeForm = new FormGroup({
            employeeId: new FormControl(''),
            employeeName: new FormControl(''),
            employeeEmail: new FormControl(''),
            employeePhone: new FormControl(''),
        });
    }

    ngOnInit(){
        this.postEmployeeForm = this.formBuilder.group({
            employeeId: [null, [Validators.required, Validators.max(5)]],
            employeeName: [null, [Validators.required]],
            employeeEmail: [null, [Validators.required, Validators.email]],
            employeePhone: [null, [Validators.required, Validators.max(11)]],
        })
    }

    postEmployee(){
        console.log(this.postEmployeeForm.value);
        this.employeeService.postEmployee(this.postEmployeeForm.value).subscribe((res) => {
            console.log(res);
            if (res.id != null) {
                this.router.navigateByUrl("")
            }
        });
    }

}
