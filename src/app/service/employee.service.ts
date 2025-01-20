import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Employee {
    id?: number;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    employeePhone: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseUrl = "http://localhost:8080/api/employees";

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAllEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl).pipe(
            catchError(err => {
                console.error('Error fetching employees:', err);
                return throwError(() => new Error('Failed to fetch employees.'));
            })
        );
    }

    postEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseUrl, employee, this.httpOptions).pipe(
            catchError(err => {
                console.error('Error adding employee:', err);
                return throwError(() => new Error('Failed to add employee.'));
            })
        );
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}/${id}`).pipe(
            catchError(err => {
                console.error(`Error fetching employee with ID ${id}:`, err);
                return throwError(() => new Error('Failed to fetch employee.'));
            })
        );
    }

    updateEmployee(id: number, employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee, this.httpOptions).pipe(
            catchError(err => {
                console.error(`Error updating employee with ID ${id}:`, err);
                return throwError(() => new Error('Failed to update employee.'));
            })
        );
    }

    deleteEmployee(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`).pipe(
            catchError(err => {
                console.error(`Error deleting employee with ID ${id}:`, err);
                return throwError(() => new Error('Failed to delete employee.'));
            })
        );
    }
}
