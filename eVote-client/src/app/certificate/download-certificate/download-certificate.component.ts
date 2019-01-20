import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../service/HttpClient/http-client.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../service/UserService";

import { saveAs  } from 'file-saver';
@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.css']
})
export class DownloadCertificateComponent implements OnInit {
  user: User;
  constructor(private http: HttpClientService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user);
    if(!this.user || !this.user.name || this.user.name === '') {
      this.router.navigate(['']);
    }
  }

  download() {

    /**
     * HAY QUE PASAR UN PASSWORD AL UNBLIND
     */

    // Desencriptar AESprivateKey y AESpublicKey en privateKeyMod y publicKeyMod


    let download = JSON.stringify({
      privateIdentity: this.user.privateKeyMod,
      publicIdentity: this.user.publicKeyMod,
      firmIdentity: this.user.identity
    });

    const blob = new Blob([download], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
  }

}
