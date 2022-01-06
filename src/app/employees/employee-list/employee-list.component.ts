import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Response } from 'src/app/base/response';
import { NotificationService } from 'src/app/notification/notification.service';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  employeeForm = Employee.formGroup();
  employeeFormUpdate = Employee.formGroup();

  @ViewChild('closeCreateModal') private closeCreateModal!: ElementRef;
  @ViewChild('closeUpdateModal') private closeUpdateModal!: ElementRef;

  constructor(
    private employeeSerivce: EmployeeService,
    private notificationService: NotificationService
  ) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.employeeSerivce.getAll().subscribe((data) => {
      this.employees = data.data;
    });
  }

  populateData(employee: Employee) {
    this.employeeFormUpdate = Employee.formGroupUpdate(employee);
  }

  onUpdate(data: any) {
    this.employeeSerivce.update(Employee.updateFormData(data)).subscribe(
      (data) => {
        this.notificationService.sendNotification(data);
        if ((data.code = 200)) {
          this.getEmployees();
        }
      },
      (error) => {
        this.notificationService.sendNotification(
          new Response(error.error.code, error.error.message, error.error)
        );
        this.closeUpdateModal.nativeElement.click();
      },
      () => {
        this.closeUpdateModal.nativeElement.click();
      }
    );
  }

  onCreate(data: any) {
    this.employeeSerivce.create(Employee.createFormData(data)).subscribe(
      (data) => {
        this.notificationService.sendNotification(data);
        if ((data.code = 200)) {
          this.employees.push(data.data);
        }
      },
      (error) => {
        this.notificationService.sendNotification(
          new Response(error.error.code, error.error.message, error.error)
        );
        this.closeCreateModal.nativeElement.click();
      },
      () => {
        this.closeCreateModal.nativeElement.click();
      }
    );
  }
}
