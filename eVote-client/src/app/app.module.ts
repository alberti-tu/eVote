import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CryptographyService } from './service/Cryptography/cryptography.service';
import { HttpClientService } from './service/HttpClient/http-client.service';
import { InitComponent } from './init/init.component';
import { DownloadCertificateComponent } from './certificate/download-certificate/download-certificate.component';
import { LoginComponent } from './certificate/login/login.component';
import {routing} from "./app.routes";
import {UserService} from "./service/UserService";
import {IdAnonimousComponent} from "./certificate/id-anonimous/id-anonimous.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatTableModule,
  MatTabsModule, MatToolbarModule
} from "@angular/material";
import {
  PizzaPartyComponent,
  RecoverCertificateComponent
} from './certificate/recover-certificate/recover-certificate.component';

@NgModule({
  declarations: [ AppComponent,
    PizzaPartyComponent,
    HomeComponent, InitComponent, IdAnonimousComponent, DownloadCertificateComponent, LoginComponent, RecoverCertificateComponent ],
  imports: [ BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule],
  providers: [ CryptographyService, HttpClientService, UserService ],
  bootstrap: [ AppComponent ],
  entryComponents: [PizzaPartyComponent ]

})
export class AppModule { }
