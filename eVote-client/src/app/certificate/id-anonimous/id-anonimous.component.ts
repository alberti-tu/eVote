import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClientService} from "../../service/HttpClient/http-client.service";
import {User} from "../../models/user";
import {UserService} from "../../service/UserService";


@Component({
  selector: 'app-id-anonimous',
  templateUrl: './id-anonimous.component.html',
  styleUrls: ['./id-anonimous.component.css']
})
export class IdAnonimousComponent implements OnInit {

  user: User = new User();
  //wait: boolean = false;

  constructor(private router: Router,
              private http: HttpClientService,
              private userService: UserService,
              ) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    if(!this.user || !this.user.name || this.user.name === '') {
      this.router.navigate(['']);
    }
  }

  generateId(password: string) : void {
    // this.wait = true;
    // this.http.encryptPrivate(this.cryptoservice.stringToHex(this.user.name));
    // this.user.certificate = password;
    this.http.sendIdentity(password).subscribe(signed => {
      if (signed) {
        console.log(signed);

        this.user.identity = this.http.unblind( signed.identity, password ,null).toString(16);
        this.user.passwordID = password;

        console.log( this.user.identity );

        this.userService.setUser( this.user );
        this.router.navigate(['down-cert']);
      }
      //this.wait = false;
    });
  }

}
