import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class JournalService {

  constructor( private myHttp: Http ) { }

  getAllEntries(){
    return this.myHttp.get(`${environment.apiBase}/api/journal-entries`, { withCredentials: true })
    .map(res => res.json())
  }

  getOneEntryDetailed(theId){
    return this.myHttp.get(`${environment.apiBase}/api/journal-entries/${theId}`, { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while getting single entry: ', err) )
  }

  createNewEntry(dataToSend){
    console.log('hm: ', dataToSend)
    return this.myHttp.post(`${environment.apiBase}/api/journal-entries`, dataToSend
    )
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }
}
