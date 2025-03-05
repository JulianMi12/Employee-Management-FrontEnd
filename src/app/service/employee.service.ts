import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../model/employee-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }

  getEmployeeById(id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${environment.apiUrl}/employee/${id}`);
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(this.apiUrl, employee);
  }
}
