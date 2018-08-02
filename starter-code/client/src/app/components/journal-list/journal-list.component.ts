import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css']
})
export class JournalListComponent implements OnInit {

  allTheEntries: Array<Object> = [];
  listError: String = '';
  logoutError: String = '';
  theUser: any = {};



  constructor( private myJournalService: JournalService,
              private myAuthService: AuthService,
              private myRouter: Router ) { }

  ngOnInit() {
    this.myAuthService.checklogin()
    .then( resFromDB => {
      console.log('????: ', resFromDB)
      this.theUser = resFromDB;
    } )
    this.showFullList();
  }

  showFullList(){
    this.myJournalService.getAllEntries()
    .subscribe( allEntries => {
      // console.log('in the component: ', allEntries);
      this.allTheEntries = allEntries;
    },
    () => this.listError = 'Sorry! No entries! Something went bad so check your backend route!')
  }


  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()

}
