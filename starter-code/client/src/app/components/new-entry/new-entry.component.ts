import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {

  entryData = {
    title: '',
    content: ''
  }

  saveError: string;


  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/journal-entries",
    itemAlias: "img"
  });


  constructor( private myJournalService: JournalService,
               private myRouter: Router ) { }

  ngOnInit() {
  }

  saveNewEntry() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveNewEntryNoImage();
    } else {
      this.saveNewEntryWithImage();
    }
  }

  saveNewEntryNoImage(){
    this.myJournalService.createNewEntry(this.entryData)
    .then( (newEntry) => {
      console.log('what: ', newEntry)
      this.entryData = {
        title: '',
        content: ''
      }
      this.saveError = '';
      this.myRouter.navigate(['/']);

    } )
    .catch( err => this.saveError = 'Error while saving in the component: ');
  }

  private saveNewEntryWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      // console.log("=============================")
      // console.log("in onBuildItemForm - item", item);
      // console.log("in onBuildItemForm - form", form);
      // console.log("=============================");
      console.log('this.entryData.entryTitle: ', this.entryData.title)

      form.append("title", this.entryData.title);
      form.append("content", this.entryData.content);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log('blahhhhhh 1111')
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");

        this.saveError = ""
        this.myRouter.navigate(["/"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving entry with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }








}
