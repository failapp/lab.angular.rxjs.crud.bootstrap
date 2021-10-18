import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { LabRoutingModule } from './lab-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GenderPipe } from './pipes/gender.pipe';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class LabModule { }
