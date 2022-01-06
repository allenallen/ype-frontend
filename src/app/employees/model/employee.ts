import { FormControl, FormGroup } from '@angular/forms';
import { AuditableEntity } from 'src/app/base/auditable-entity';

export class Employee extends AuditableEntity {
  firstName: string;
  lastName: string;
  employeeNumber: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    employeeNumber: string
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.employeeNumber = employeeNumber;
  }

  static createFormData(formGroup: any): Employee {
    return new Employee(
      '',
      formGroup.firstName,
      formGroup.lastName,
      formGroup.employeeNumber
    );
  }

  static updateFormData(formGroup: any): Employee {
    return new Employee(
      formGroup.id,
      formGroup.firstName,
      formGroup.lastName,
      formGroup.employeeNumber
    );
  }

  static formGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      employeeNumber: new FormControl(),
    });
  }

  static formGroupUpdate(employee: Employee): FormGroup {
    return new FormGroup({
      id: new FormControl(employee.id),
      firstName: new FormControl(employee.firstName),
      lastName: new FormControl(employee.lastName),
      employeeNumber: new FormControl(employee.employeeNumber),
    });
  }
}
