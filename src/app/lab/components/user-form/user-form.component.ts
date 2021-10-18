import { Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";

import { UserService } from '@lab/services/user.service';
import { User } from '@lab/models/user';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit {

  userForm: FormGroup;
  isNew?: boolean;

  constructor(private fb: FormBuilder, 
              private userService:UserService, 
              public modalRef: BsModalRef) { 

    this.userForm = this.fb.group({
      documentId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });

  }
  

  ngOnInit(): void {
    
    this.userService.getUser().subscribe( x => {
      if (!Object.keys(x).length && x.constructor === Object) {
        //console.log('[x] user-form -> user -> empty ..'); 
        this.isNew = true;
      } else {
        //console.log('[x] user-form -> user -> ', x);
        this.isNew = false;
        this.userForm = this.fb.group({
          documentId: [x.documentId],
          firstName: [x.firstName],
          lastName: [x.lastName],
          gender: [x.gender],
          emailAddress: [x.emailAddress],
          phoneNumber: [x.phoneNumber]
        });
      }
    }); 
  }

  ngAfterViewInit(): void {
    if (this.isNew) {
      this.userForm.controls['documentId'].enable();
    } else {
      this.userForm.controls['documentId'].disable();
    }
  }


  public saveUser() {

    if (this.userForm.valid) {
      
      const user = this.userForm.value as User;

      if (this.isNew) {
        this.userService.addUser(user).subscribe( res => {
          //console.log('[x] add user -> ', res);
          this.modalRef.hide();
        },
          error => console.log(`ERROR: ${error}`)
        );
      } else {

        this.userService.updateUser(user).subscribe( res => {
          //console.log('[x] update user -> ', res);
          this.modalRef.hide();
        },
          error => console.log(`ERROR: ${error}`)
        );

      }
      
    } else {
      console.log('[x] user-form invalid!! ..');
    }

  }


  public closeForm(event: Event) {
    event.preventDefault();
    this.userForm.reset();
    this.modalRef.hide();
  }

}
