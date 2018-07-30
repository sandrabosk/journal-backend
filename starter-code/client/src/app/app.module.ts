import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components:
import { AppComponent } from './app.component';
import { JournalListComponent } from './components/journal-list/journal-list.component';
import { OneEntryDetailComponent } from './components/one-entry-detail/one-entry-detail.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

// services:
import { JournalService } from './services/journal.service';
import { AuthService } from './services/auth.service';

// routes:
import { Routes, RouterModule } from '@angular/router';

// images:
import { FileUploadModule } from "ng2-file-upload";



const routes: Routes = [
  {
    path:"",
    component: JournalListComponent
  },
  {
    path:"new-entry",
    component: NewEntryComponent
  },
  {
    path:"signup",
    component: SignupComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:":id",
    component: OneEntryDetailComponent
  },

]

@NgModule({
  declarations: [
    AppComponent,
    JournalListComponent,
    OneEntryDetailComponent,
    NewEntryComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ JournalService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
