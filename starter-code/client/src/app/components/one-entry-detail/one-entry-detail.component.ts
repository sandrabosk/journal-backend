import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-one-entry-detail',
  templateUrl: './one-entry-detail.component.html',
  styleUrls: ['./one-entry-detail.component.css']
})
export class OneEntryDetailComponent implements OnInit {

  entry:any = {};
  baseUrl = environment.apiBase;
  currentUser: any = {};
  creator: any = {};
  approvedUsers: Array<any> = []

  constructor( private myJournalService: JournalService,
               private myRoute: ActivatedRoute,
               private myAuth: AuthService,
               private myRouter: Router ) { }

  ngOnInit() {
    this.myAuth.checklogin()
    .then( res => {
      // console.log('who: ', res);
      this.currentUser = res;
    })
    .catch(err => {
      // console.log('err is: ', err);
      this.myRouter.navigate(['/']);
    })
    this.myRoute.params.subscribe(params => {
      this.showOneEntryDetails(params['id'])
    })
  }

  showOneEntryDetails(id){
    this.myJournalService.getOneEntryDetailed(id)
    .then( oneEntry => {
      // console.log('entry: ', oneEntry);
      this.entry = oneEntry;
      this.creator = oneEntry.creator;
      // console.log('entry: ', this.entry)
    })
    .catch( err => console.log('Error while getting details in the component: ', err));
  }

  addTheUser(u){
    this.approvedUsers.push(u);
  }

}
