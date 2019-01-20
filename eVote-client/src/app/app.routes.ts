import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {InitComponent} from "./init/init.component";
import {IdAnonimousComponent} from "./certificate/id-anonimous/id-anonimous.component";
import {DownloadCertificateComponent} from "./certificate/download-certificate/download-certificate.component";
import {LoginComponent} from "./certificate/login/login.component";
import {RecoverCertificateComponent} from "./certificate/recover-certificate/recover-certificate.component";

const routes: Routes = [
  {
    path: '', component: InitComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'id-anon', component: IdAnonimousComponent
  },
  {
    path: 'down-cert', component: DownloadCertificateComponent
  },
  {
    path: 'recover-cert', component: RecoverCertificateComponent
  }
];
export const routing = RouterModule.forRoot(routes);
