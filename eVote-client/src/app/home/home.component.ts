import { Component, OnInit } from '@angular/core';
import { HttpClientService } from "../service/HttpClient/http-client.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  answer: string;

  constructor( private http: HttpClientService ) { }

  ngOnInit() {  }

  list: any = [
    { id: 0, name: 'Encrypt' },
    { id: 1, name: 'Encrypt & Sign' },
    { id: 2, name: 'Sign' },
  ];

  send(message: string, select: string): void {
    switch ( parseInt(select) ) {
      case 0:

      break;
      case 1:

      break;
      case 2:

      break;
    }
  }
}


/*
  answer: string;

  constructor( private http: HttpClientService ) { }

  ngOnInit() {  }

  list: any = [
    { id: 0, name: 'Encrypt' },
    { id: 1, name: 'Encrypt & Sign' },
    { id: 2, name: 'Sign' },
  ];

  send(message: string, select: string): void {
    switch ( parseInt(select) ) {
      case 0:
        this.http.encrypt(message).subscribe(response => {
          this.answer = this.http.decrypt( response );
        });
      break;
      case 1:
        this.http.signEncrypted(message).subscribe( response => {
          if(this.http.verifyDecrypted(response) == true) { this.answer = 'Server: verified' }
          else { this.answer = 'Server: not verified' }
        });
      break;
      case 2:
        this.http.sign(message).subscribe( response => {
          if(this.http.verify(response) == true){ this.answer = 'Server: verified' }
          else { this.answer = 'Server: not verified' }
        });
      break;
    }
  }*/
