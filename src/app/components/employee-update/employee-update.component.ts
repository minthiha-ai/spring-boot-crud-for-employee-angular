import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
    updateEmployeeForm: FormGroup;
    id: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.updateEmployeeForm = new FormGroup({});
        this.id = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit(){
        this.updateEmployeeForm = this.fb.group({
            employeeId: [null, [Validators.required, Validators.max(5)]],
            employeeName: [null, [Validators.required]],
            employeeEmail: [null, [Validators.required, Validators.email]],
            employeePhone: [null, [Validators.required, Validators.max(11)]],
        });
        this.getEmployeeById();
    }

    getEmployeeById(){
        this.employeeService.getEmployeeById(this.id).subscribe((res) => {
            console.log(res);
            this.updateEmployeeForm.patchValue(res);
        });
    }

    updateEmployee() {
        this.employeeService.updateEmployee(this.id, this.updateEmployeeForm.value).subscribe((res)=>{
            console.log(res);
            this.router.navigateByUrl("");
        });
    }

    // deleteEmployee(id: number) {
    //     this.employeeService.deleteEmployee(id).subscribe((res) => {
    //         console.log(res);
    //         this.router.navigateByUrl("");
    //     })
    // }
}
