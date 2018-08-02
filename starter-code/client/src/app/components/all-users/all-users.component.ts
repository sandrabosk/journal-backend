import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  @Output() onAddUser = new EventEmitter<Object>();

  allUsers: any;
  userListError: string;

  constructor( private myAuth: AuthService ) { }

  ngOnInit() {
    this.listUsers()
  }

  listUsers(){
    this.myAuth.getAllUsers()
    .subscribe( users =>{
      this.allUsers = users;
      console.log('all users:', this.allUsers)
    } ,
    () => this.userListError = 'error while loading users.' )
  }


  addUser(user){
    this.onAddUser.emit(user);
  }

}

