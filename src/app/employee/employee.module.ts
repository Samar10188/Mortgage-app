import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the EmployeeRoutingModule
import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    // Add EmployeeRoutingModule to the imports array
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent
  ]
})
export class EmployeeModule { }