import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee{
    id?: number;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    employeePhone: number;
}
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseUrl = "http://localhost:8080/api/employees";
    constructor(private http: HttpClient) { }

    getAllEmployee(): Observable<Employee[]>{
        return this.http.get<Employee[]>(this.baseUrl);
    }

    postEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<Employee>(this.baseUrl, employee);
    }

    getEmployeeById(id: number): Observable<Employee>{
        return this.http.get<Employee>(`${this.baseUrl}/${id}`);
    }

    updateEmployee(id: number, employee: Employee): Observable<Object>{
        return this.http.put(`${this.baseUrl}/${id}`, employee);
    }

    deleteEmployee(id: number): Observable<Object>{
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
