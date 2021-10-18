import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

import { UserFormComponent } from '@lab/components/user-form/user-form.component';
import { UserService } from '@lab/services/user.service';
import { User } from '@lab/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userList: Array<User> = [];
  modalRef?: BsModalRef;

  constructor(private userService:UserService, private modalService:BsModalService) { 
    this.subscription = this.userService.users.subscribe( res => {
      //console.log(res);
      this.userList = res;
    });
  }

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  public addUser() {

    this.userService.unsetUser();
    this.modalRef = this.modalService.show(UserFormComponent);
    
  }

  public editUser(user: User, event:Event) {
    event.preventDefault(); 
    this.userService.setUser(user);
    this.modalRef = this.modalService.show(UserFormComponent);
  }


  public deleteUser(user: User, event:Event) {
    event.preventDefault(); 
    this.userService.deleteUser(user).subscribe( x => {
      console.log('[x] user-list delete user.. result -> ', x);
    },
      error => console.log(`ERROR: ${error}`)
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

}
