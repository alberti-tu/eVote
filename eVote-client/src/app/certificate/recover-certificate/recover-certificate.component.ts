import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../service/UserService";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {CryptographyService} from "../../service/Cryptography/cryptography.service";
import {MAT_SNACK_BAR_DATA, MatSnackBar} from "@angular/material";
import {HttpClientService} from "../../service/HttpClient/http-client.service";

@Component({
  selector: 'app-recover-certificate',
  templateUrl: './recover-certificate.component.html',
  styleUrls: ['./recover-certificate.component.css']
})
export class RecoverCertificateComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              public snackBar: MatSnackBar,
              private http: HttpClientService,
              private router: Router) {
    this.user = this.userService.getUser();
    if(!this.user || !this.user.name || this.user.name === '') {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  recover(password: string) {
    this.user.passwordID = password;
    const publicKey  = this.user.publicKey;
    const unblinded = this.http.unblind(this.user.identity, password, publicKey);
    console.log(unblinded);


    if(!unblinded) {
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: 10000,
      });
    } else {
      const privateKey = this.http.decryptAES(this.user.AESprivateKey, password);
      console.log(publicKey, privateKey);
      this.user.privateKeyMod = privateKey;
      this.user.publicKeyMod = publicKey;
      this.user.identity = unblinded.toString(16);
      this.userService.setUser(this.user);

      this.router.navigate(['down-cert']);
    }
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
