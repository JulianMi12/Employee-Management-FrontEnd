import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../service/employee.service';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeModel } from '../../model/employee-model';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavVarComponent,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: EmployeeModel[] = [];
  employeeId: string = '';
  page: number = 1;
  pageSize: number = 5;
  availablePageSizes: number[] = [5, 10, 15, 20];
  showTable: boolean = false;
  selected: EmployeeModel | null = null;
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void { }

  searchEmployee(): void {
    this.errorMessage = '';

    if (this.employeeId.trim()) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (data) => {
          this.selected = data;
          this.showTable = false;
          this.openModal(data);
        },
        error: (err) => {
          console.error('Error al obtener empleado', err);
          if (err.status === 404) {
            this.errorMessage = `Empleado con ID ${this.employeeId} no encontrado.`;
          } else {
            this.errorMessage = 'Ocurrió un error al obtener la información del empleado.';
          }
          this.selected = null;
        }
      });
    } else {
      this.employeeService.getEmployees().subscribe({
        next: (data) => {
          this.employees = data;
          this.showTable = true;
        },
        error: (err) => {
          console.error('Error al obtener empleados', err);
          this.errorMessage = 'Ocurrió un error al obtener la lista de empleados.';
          this.employees = [];
        }
      });
    }
  }

  updatePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.page = 1;
  }

  openModal(employee: EmployeeModel): void {
    this.selected = employee;
    const modalElement = document.querySelector('#employeeModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
