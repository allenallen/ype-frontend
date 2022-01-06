import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseService<Employee> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getBaseUrl(): string {
    return environment.baseUrl + 'employee';
  }
}
