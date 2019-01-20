import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClientService} from '../../service/HttpClient/http-client.service';
import {UserService} from "../../service/UserService";
import {CryptographyService} from '../../service/Cryptography/cryptography.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router,
              private http: HttpClientService,
              private userService: UserService) {
  }

  ngOnInit() { }

  enter(login: string, password: string) : void {
    this.user.name = login;
    this.user.password = password;
    this.http.login(this.user).subscribe(async response => {
      console.log(response);
      this.user = response.findUser;
      console.log(this.user);
      if(!this.user.AESprivateKey || !this.user.publicKey) {
        const t = await this.http.setKeys();
        this.user.publicKeyMod = t.pm;
        this.user.privateKeyMod = t.dm;
      }
      console.log(this.user);
      this.userService.setUser(this.user);
      this.http.setToken(response.token);
      //const t = this.cryptoprivate.keystouser();
      //this.userService.setkeys(t.d, t.pm);

      if(this.user.identity) {
        this.router.navigate(['recover-cert']);
      } else {
        this.router.navigate(['id-anon']);
      }
    });
  }
}
