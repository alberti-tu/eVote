(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\n  flex: 1 1 auto;\n}\n.white{\n  color: white;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <span>Smart Cities 2 - eVote</span>\n  <span class=\"spacer\"></span>\n  <a href=\"https://eetac.upc.edu/ca\" target=\"_blank\"><img src=\"../../assets/image.png\" height=\"50\" width=\"50\" style=\"margin-left: 0.5em; margin-right: 0.5em\"></a>\n  <a href=\"https://github.com/alberti-tu/eVote-client\" target=\"_blank\"><button mat-button class=\"white\"><i class=\"fab fa-github\"></i> GitHub</button></a>\n</mat-toolbar>\n<router-outlet></router-outlet>\n<!--<app-home></app-home>-->\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _service_Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service/Cryptography/cryptography.service */ "./src/app/service/Cryptography/cryptography.service.ts");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
/* harmony import */ var _init_init_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./init/init.component */ "./src/app/init/init.component.ts");
/* harmony import */ var _certificate_download_certificate_download_certificate_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./certificate/download-certificate/download-certificate.component */ "./src/app/certificate/download-certificate/download-certificate.component.ts");
/* harmony import */ var _certificate_login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./certificate/login/login.component */ "./src/app/certificate/login/login.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _service_UserService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./service/UserService */ "./src/app/service/UserService.ts");
/* harmony import */ var _certificate_id_anonimous_id_anonimous_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./certificate/id-anonimous/id-anonimous.component */ "./src/app/certificate/id-anonimous/id-anonimous.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./certificate/recover-certificate/recover-certificate.component */ "./src/app/certificate/recover-certificate/recover-certificate.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_16__["PizzaPartyComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"], _init_init_component__WEBPACK_IMPORTED_MODULE_8__["InitComponent"], _certificate_id_anonimous_id_anonimous_component__WEBPACK_IMPORTED_MODULE_13__["IdAnonimousComponent"], _certificate_download_certificate_download_certificate_component__WEBPACK_IMPORTED_MODULE_9__["DownloadCertificateComponent"], _certificate_login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"], _certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_16__["RecoverCertificateComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _app_routes__WEBPACK_IMPORTED_MODULE_11__["routing"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_15__["MatCardModule"]],
            providers: [_service_Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_6__["CryptographyService"], _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_7__["HttpClientService"], _service_UserService__WEBPACK_IMPORTED_MODULE_12__["UserService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            entryComponents: [_certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_16__["PizzaPartyComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _init_init_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init/init.component */ "./src/app/init/init.component.ts");
/* harmony import */ var _certificate_id_anonimous_id_anonimous_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./certificate/id-anonimous/id-anonimous.component */ "./src/app/certificate/id-anonimous/id-anonimous.component.ts");
/* harmony import */ var _certificate_download_certificate_download_certificate_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./certificate/download-certificate/download-certificate.component */ "./src/app/certificate/download-certificate/download-certificate.component.ts");
/* harmony import */ var _certificate_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./certificate/login/login.component */ "./src/app/certificate/login/login.component.ts");
/* harmony import */ var _certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./certificate/recover-certificate/recover-certificate.component */ "./src/app/certificate/recover-certificate/recover-certificate.component.ts");






var routes = [
    {
        path: '', component: _init_init_component__WEBPACK_IMPORTED_MODULE_1__["InitComponent"]
    },
    {
        path: 'login', component: _certificate_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
    },
    {
        path: 'id-anon', component: _certificate_id_anonimous_id_anonimous_component__WEBPACK_IMPORTED_MODULE_2__["IdAnonimousComponent"]
    },
    {
        path: 'down-cert', component: _certificate_download_certificate_download_certificate_component__WEBPACK_IMPORTED_MODULE_3__["DownloadCertificateComponent"]
    },
    {
        path: 'recover-cert', component: _certificate_recover_certificate_recover_certificate_component__WEBPACK_IMPORTED_MODULE_5__["RecoverCertificateComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "./src/app/certificate/download-certificate/download-certificate.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/certificate/download-certificate/download-certificate.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/certificate/download-certificate/download-certificate.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/certificate/download-certificate/download-certificate.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row center\">\n    <button mat-raised-button (click)=\"download()\">DESCARGAR CERTIFICADO</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/certificate/download-certificate/download-certificate.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/certificate/download-certificate/download-certificate.component.ts ***!
  \************************************************************************************/
/*! exports provided: DownloadCertificateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadCertificateComponent", function() { return DownloadCertificateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_UserService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/UserService */ "./src/app/service/UserService.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DownloadCertificateComponent = /** @class */ (function () {
    function DownloadCertificateComponent(http, userService, router) {
        this.http = http;
        this.userService = userService;
        this.router = router;
    }
    DownloadCertificateComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getUser();
        console.log(this.user);
        if (!this.user || !this.user.name || this.user.name === '') {
            this.router.navigate(['']);
        }
    };
    DownloadCertificateComponent.prototype.download = function () {
        /**
         * HAY QUE PASAR UN PASSWORD AL UNBLIND
         */
        // Desencriptar AESprivateKey y AESpublicKey en privateKeyMod y publicKeyMod
        var download = JSON.stringify({
            privateIdentity: this.user.privateKeyMod,
            publicIdentity: this.user.publicKeyMod,
            firmIdentity: this.user.identity
        });
        var blob = new Blob([download], { type: "text/plain;charset=utf-8" });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_4__["saveAs"])(blob, "hello world.txt");
    };
    DownloadCertificateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-download-certificate',
            template: __webpack_require__(/*! ./download-certificate.component.html */ "./src/app/certificate/download-certificate/download-certificate.component.html"),
            styles: [__webpack_require__(/*! ./download-certificate.component.css */ "./src/app/certificate/download-certificate/download-certificate.component.css")]
        }),
        __metadata("design:paramtypes", [_service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_1__["HttpClientService"],
            _service_UserService__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], DownloadCertificateComponent);
    return DownloadCertificateComponent;
}());



/***/ }),

/***/ "./src/app/certificate/id-anonimous/id-anonimous.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/certificate/id-anonimous/id-anonimous.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/certificate/id-anonimous/id-anonimous.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/certificate/id-anonimous/id-anonimous.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row center\">\n    <form (submit)=\"generateId(password.value)\">\n      <mat-form-field class=\"example-width\">\n        <input matInput type=\"password\" #password placeholder=\"Password\">\n      </mat-form-field>\n      <button mat-raised-button>Id Anonimo</button>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/certificate/id-anonimous/id-anonimous.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/certificate/id-anonimous/id-anonimous.component.ts ***!
  \********************************************************************/
/*! exports provided: IdAnonimousComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdAnonimousComponent", function() { return IdAnonimousComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _service_UserService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/UserService */ "./src/app/service/UserService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IdAnonimousComponent = /** @class */ (function () {
    //wait: boolean = false;
    function IdAnonimousComponent(router, http, userService) {
        this.router = router;
        this.http = http;
        this.userService = userService;
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_3__["User"]();
    }
    IdAnonimousComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getUser();
        if (!this.user || !this.user.name || this.user.name === '') {
            this.router.navigate(['']);
        }
    };
    IdAnonimousComponent.prototype.generateId = function (password) {
        var _this = this;
        // this.wait = true;
        // this.http.encryptPrivate(this.cryptoservice.stringToHex(this.user.name));
        // this.user.certificate = password;
        this.http.sendIdentity(password).subscribe(function (signed) {
            if (signed) {
                console.log(signed);
                _this.user.identity = _this.http.unblind(signed.identity, password, null).toString(16);
                _this.user.passwordID = password;
                console.log(_this.user.identity);
                _this.userService.setUser(_this.user);
                _this.router.navigate(['down-cert']);
            }
            //this.wait = false;
        });
    };
    IdAnonimousComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-id-anonimous',
            template: __webpack_require__(/*! ./id-anonimous.component.html */ "./src/app/certificate/id-anonimous/id-anonimous.component.html"),
            styles: [__webpack_require__(/*! ./id-anonimous.component.css */ "./src/app/certificate/id-anonimous/id-anonimous.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"],
            _service_UserService__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], IdAnonimousComponent);
    return IdAnonimousComponent;
}());



/***/ }),

/***/ "./src/app/certificate/login/login.component.css":
/*!*******************************************************!*\
  !*** ./src/app/certificate/login/login.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/certificate/login/login.component.html":
/*!********************************************************!*\
  !*** ./src/app/certificate/login/login.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row center\">\n    <form (submit)=\"enter(login.value, password.value)\" class=\"example-form\">\n      <mat-form-field class=\"example-width\">\n        <input matInput type=\"text\" #login placeholder=\"Login\">\n      </mat-form-field>\n      <mat-form-field class=\"example-width\">\n        <input matInput type=\"password\" #password placeholder=\"Password\">\n      </mat-form-field>\n      <button mat-raised-button>Login</button>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/certificate/login/login.component.ts":
/*!******************************************************!*\
  !*** ./src/app/certificate/login/login.component.ts ***!
  \******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
/* harmony import */ var _service_UserService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/UserService */ "./src/app/service/UserService.ts");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, http, userService) {
        this.router = router;
        this.http = http;
        this.userService = userService;
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]();
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.enter = function (login, password) {
        var _this = this;
        this.user.name = login;
        this.user.password = password;
        this.http.login(this.user).subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var t;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(response);
                        this.user = response.findUser;
                        console.log(this.user);
                        if (!(!this.user.AESprivateKey || !this.user.publicKey)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.http.setKeys()];
                    case 1:
                        t = _a.sent();
                        this.user.publicKeyMod = t.pm;
                        this.user.privateKeyMod = t.dm;
                        _a.label = 2;
                    case 2:
                        console.log(this.user);
                        this.userService.setUser(this.user);
                        this.http.setToken(response.token);
                        //const t = this.cryptoprivate.keystouser();
                        //this.userService.setkeys(t.d, t.pm);
                        if (this.user.identity) {
                            this.router.navigate(['recover-cert']);
                        }
                        else {
                            this.router.navigate(['id-anon']);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/certificate/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/certificate/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"],
            _service_UserService__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/certificate/recover-certificate/recover-certificate.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/certificate/recover-certificate/recover-certificate.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/certificate/recover-certificate/recover-certificate.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/certificate/recover-certificate/recover-certificate.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row center\">\n    <mat-form-field class=\"example-width\">\n      <input matInput type=\"password\" #password placeholder=\"Password\">\n    </mat-form-field>\n    <button mat-raised-button (click)=\"recover(password.value)\">RECUPERAR PASSWORD</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/certificate/recover-certificate/recover-certificate.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/certificate/recover-certificate/recover-certificate.component.ts ***!
  \**********************************************************************************/
/*! exports provided: RecoverCertificateComponent, PizzaPartyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverCertificateComponent", function() { return RecoverCertificateComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PizzaPartyComponent", function() { return PizzaPartyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/UserService */ "./src/app/service/UserService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var RecoverCertificateComponent = /** @class */ (function () {
    function RecoverCertificateComponent(userService, snackBar, http, router) {
        this.userService = userService;
        this.snackBar = snackBar;
        this.http = http;
        this.router = router;
        this.user = this.userService.getUser();
        if (!this.user || !this.user.name || this.user.name === '') {
            this.router.navigate(['']);
        }
    }
    RecoverCertificateComponent.prototype.ngOnInit = function () {
    };
    RecoverCertificateComponent.prototype.recover = function (password) {
        this.user.passwordID = password;
        var publicKey = this.user.publicKey;
        var unblinded = this.http.unblind(this.user.identity, password, publicKey);
        console.log(unblinded);
        if (!unblinded) {
            this.snackBar.openFromComponent(PizzaPartyComponent, {
                duration: 10000,
            });
        }
        else {
            var privateKey = this.http.decryptAES(this.user.AESprivateKey, password);
            console.log(publicKey, privateKey);
            this.user.privateKeyMod = privateKey;
            this.user.publicKeyMod = publicKey;
            this.user.identity = unblinded.toString(16);
            this.userService.setUser(this.user);
            this.router.navigate(['down-cert']);
        }
    };
    RecoverCertificateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-recover-certificate',
            template: __webpack_require__(/*! ./recover-certificate.component.html */ "./src/app/certificate/recover-certificate/recover-certificate.component.html"),
            styles: [__webpack_require__(/*! ./recover-certificate.component.css */ "./src/app/certificate/recover-certificate/recover-certificate.component.css")]
        }),
        __metadata("design:paramtypes", [_service_UserService__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"],
            _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_4__["HttpClientService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RecoverCertificateComponent);
    return RecoverCertificateComponent;
}());

var PizzaPartyComponent = /** @class */ (function () {
    function PizzaPartyComponent(data) {
        this.data = data;
    }
    PizzaPartyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'snack-bar-component-example-snack',
            template: __webpack_require__(/*! ./snack-bar-component-example-snack.html */ "./src/app/certificate/recover-certificate/snack-bar-component-example-snack.html"),
            styles: ["\n    .example-pizza-party {\n      color: hotpink;\n    }\n  "],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_SNACK_BAR_DATA"])),
        __metadata("design:paramtypes", [Object])
    ], PizzaPartyComponent);
    return PizzaPartyComponent;
}());



/***/ }),

/***/ "./src/app/certificate/recover-certificate/snack-bar-component-example-snack.html":
/*!****************************************************************************************!*\
  !*** ./src/app/certificate/recover-certificate/snack-bar-component-example-snack.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"example-pizza-party\">\n  Wrong password\n</span>\n"

/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <form (submit)=\"send(message.value, select.value)\">\n    <label><input #message placeholder=\"Message\"></label>\n    <label><select #select>\n      <option *ngFor=\"let item of list\" [value]=\"item.id\">{{item.name}}</option>\n    </select></label>\n    <button>Send</button>\n  </form>\n\n  <label>{{answer}}</label>\n</div>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/HttpClient/http-client.service */ "./src/app/service/HttpClient/http-client.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.list = [
            { id: 0, name: 'Encrypt' },
            { id: 1, name: 'Encrypt & Sign' },
            { id: 2, name: 'Sign' },
        ];
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.send = function (message, select) {
        switch (parseInt(select)) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_service_HttpClient_http_client_service__WEBPACK_IMPORTED_MODULE_1__["HttpClientService"]])
    ], HomeComponent);
    return HomeComponent;
}());

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


/***/ }),

/***/ "./src/app/init/init.component.css":
/*!*****************************************!*\
  !*** ./src/app/init/init.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/init/init.component.html":
/*!******************************************!*\
  !*** ./src/app/init/init.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row center\">\n    <button mat-raised-button (click)=\"goToLogin()\">GENERAR CERTIFICADO</button> &nbsp;\n    <button mat-raised-button>VOTACIONES</button>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/init/init.component.ts":
/*!****************************************!*\
  !*** ./src/app/init/init.component.ts ***!
  \****************************************/
/*! exports provided: InitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitComponent", function() { return InitComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InitComponent = /** @class */ (function () {
    function InitComponent(router) {
        this.router = router;
    }
    InitComponent.prototype.ngOnInit = function () {
    };
    InitComponent.prototype.goToLogin = function () {
        this.router.navigate(['login']);
    };
    InitComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-init',
            template: __webpack_require__(/*! ./init.component.html */ "./src/app/init/init.component.html"),
            styles: [__webpack_require__(/*! ./init.component.css */ "./src/app/init/init.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], InitComponent);
    return InitComponent;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "./src/app/service/Cryptography/cryptography.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/service/Cryptography/cryptography.service.ts ***!
  \**************************************************************/
/*! exports provided: CryptographyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CryptographyService", function() { return CryptographyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sha_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sha.js */ "./node_modules/sha.js/index.js");
/* harmony import */ var sha_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sha_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// @ts-ignore




var CryptographyService = /** @class */ (function () {
    function CryptographyService(bits, e) {
        this.bits = bits;
        this._e = big_integer__WEBPACK_IMPORTED_MODULE_3__(e);
        this.newKey();
    }
    CryptographyService_1 = CryptographyService;
    CryptographyService.primeGenerator = function (bits) {
        var max = big_integer__WEBPACK_IMPORTED_MODULE_3__(2).pow(bits).subtract(1);
        var min = big_integer__WEBPACK_IMPORTED_MODULE_3__(2).pow(bits - 1);
        var prime;
        do {
            prime = big_integer__WEBPACK_IMPORTED_MODULE_3__["randBetween"](min, max);
        } while (prime.isProbablePrime() !== true);
        return prime;
    };
    CryptographyService.prototype.newKey = function () {
        if (this.bits < 256) {
            console.error('ERROR: public modulus very small, more bits are needed');
            return;
        }
        var _p, _q;
        do {
            _p = CryptographyService_1.primeGenerator(this.bits / 2);
            _q = CryptographyService_1.primeGenerator(this.bits / 2);
        } while (_p.multiply(_q) < big_integer__WEBPACK_IMPORTED_MODULE_3__(2).pow(this.bits).divide(2));
        // phi = (p-1)(q-1)
        var phi = _p.subtract(1).multiply(_q.subtract(1));
        this._n = big_integer__WEBPACK_IMPORTED_MODULE_3__(_p).multiply(_q);
        this._d = big_integer__WEBPACK_IMPORTED_MODULE_3__(this._e).modInv(phi);
        console.log('Generated RSA keys of ' + this._n.bitLength() + ' bits');
    };
    //Return the public keys
    CryptographyService.prototype.sendKeys = function () {
        return { e: this._e, n: this._n };
    };
    //Set the keys of the another instance
    CryptographyService.prototype.setKeys = function (n, e) {
        this.n = big_integer__WEBPACK_IMPORTED_MODULE_3__(n, 16);
        this.e = big_integer__WEBPACK_IMPORTED_MODULE_3__(e, 16);
        console.log("Server's keys are correctly configured");
    };
    CryptographyService.prototype.encrypt = function (message) {
        return message.modPow(this.e, this.n);
    };
    CryptographyService.prototype.decrypt = function (message) {
        return message.modPow(this._d, this._n);
    };
    CryptographyService.prototype.sign = function (message) {
        return message.modPow(this._d, this._n);
    };
    CryptographyService.prototype.verify = function (message) {
        return message.modPow(this.e, this.n);
    };
    CryptographyService.prototype.blindSign = function (message, password) {
        var hash1 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(password).digest('hex');
        var hash2 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash1).digest('hex');
        var hash3 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash2).digest('hex');
        var hash4 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash3).digest('hex');
        var k = big_integer__WEBPACK_IMPORTED_MODULE_3__(hash4 + hash3 + hash2 + hash1, 16);
        do {
            k = k.add(1);
        } while (big_integer__WEBPACK_IMPORTED_MODULE_3__["gcd"](k, this.n).toString() != '1');
        return message.multiply(big_integer__WEBPACK_IMPORTED_MODULE_3__(k).modPow(this.e, this.n)).mod(this.n);
    };
    CryptographyService.prototype.unBlindSign = function (message, password) {
        var hash1 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(password).digest('hex');
        var hash2 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash1).digest('hex');
        var hash3 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash2).digest('hex');
        var hash4 = sha_js__WEBPACK_IMPORTED_MODULE_2__('sha256').update(hash3).digest('hex');
        var k = big_integer__WEBPACK_IMPORTED_MODULE_3__(hash4 + hash3 + hash2 + hash1, 16);
        do {
            k = k.add(1);
        } while (big_integer__WEBPACK_IMPORTED_MODULE_3__["gcd"](k, this.n).toString() != '1');
        return message.multiply(k.modInv(this.n)).mod(this.n);
    };
    CryptographyService.prototype.encryptAES = function (message, password) {
        return crypto_js__WEBPACK_IMPORTED_MODULE_4___default.a.AES.encrypt(message, password).toString();
    };
    CryptographyService.prototype.decryptAES = function (message, password) {
        return crypto_js__WEBPACK_IMPORTED_MODULE_4___default.a.AES.decrypt(message, password).toString();
    };
    CryptographyService.prototype.stringToHex = function (message) {
        return buffer__WEBPACK_IMPORTED_MODULE_1__["Buffer"].from(message).toString('hex');
    };
    CryptographyService.prototype.hexToString = function (message) {
        return buffer__WEBPACK_IMPORTED_MODULE_1__["Buffer"].from(message, 'hex').toString('ascii');
    };
    CryptographyService.prototype.keysToUser = function () {
        return {
            dm: this._d.toString(16) + '.' + this._n.toString(16),
            pm: this._e.toString(16) + '.' + this._n.toString(16)
        };
    };
    var CryptographyService_1;
    CryptographyService = CryptographyService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [Number, Number])
    ], CryptographyService);
    return CryptographyService;
}());



/***/ }),

/***/ "./src/app/service/HttpClient/http-client.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/service/HttpClient/http-client.service.ts ***!
  \***********************************************************/
/*! exports provided: HttpClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClientService", function() { return HttpClientService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Cryptography/cryptography.service */ "./src/app/service/Cryptography/cryptography.service.ts");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sha_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sha.js */ "./node_modules/sha.js/index.js");
/* harmony import */ var sha_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sha_js__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var HttpClientService = /** @class */ (function () {
    function HttpClientService(http) {
        this.http = http;
        this.url = 'https://localhost:3000';
        this.keys = { n: '', e: '' };
        this.security = new _Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_2__["CryptographyService"](512, 65537); // Generates the RSA keys
        // this.setKeys();                                         // Exchange the RSA keys with the server
        this.test();
        this.takeKeys();
    }
    HttpClientService.prototype.login = function (user) {
        return this.http.post(this.url + '/login', user);
    };
    HttpClientService.prototype.setToken = function (token) {
        this.token = token;
    };
    HttpClientService.prototype.takeKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.http.get(this.url + '/keys').subscribe(function (value) {
                    _this.keys = value;
                    _this.security.setKeys(_this.keys.n, _this.keys.e);
                });
                return [2 /*return*/];
            });
        });
    };
    HttpClientService.prototype.setKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        // this.security = new CryptographyService(1024, 65537);    // Generates the RSA keys
                        _b = (_a = this.http).post;
                        _c = [this.url + '/rsa'];
                        return [4 /*yield*/, this.security.sendKeys()];
                    case 1:
                        // this.security = new CryptographyService(1024, 65537);    // Generates the RSA keys
                        _b.apply(_a, _c.concat([_f.sent()])).subscribe(function (value) {
                            _this.keys = value;
                            console.log('clavees', _this.keys);
                            _this.security.setKeys(_this.keys.n, _this.keys.e);
                        });
                        return [2 /*return*/, this.security.keysToUser()];
                }
            });
        });
    };
    HttpClientService.prototype.sendIdentity = function (password) {
        var publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
        var privateKey = this.security._d.toString(16) + '.' + this.security._n.toString(16);
        var message = sha_js__WEBPACK_IMPORTED_MODULE_4__('sha256').update(publicKey).digest('hex');
        var body = {
            publicKey: publicKey,
            AESprivateKey: this.security.encryptAES(privateKey, password),
            identity: this.security.blindSign(big_integer__WEBPACK_IMPORTED_MODULE_3__(message, 16), password).toString(16),
            token: this.token
        };
        return this.http.post(this.url + '/rsa/id/save', body);
    };
    HttpClientService.prototype.recieveIdentity = function (password) {
        var _this = this;
        this.http.post(this.url + '/rsa/id/save', { token: this.token }).subscribe(function (response) {
            var publicKey = response.body.publicKey.split('.');
            var privateKey = _this.security.decryptAES(response.body.AESprivateKey, password).split('.');
            // Set the Client's Keys
            _this.security._e = big_integer__WEBPACK_IMPORTED_MODULE_3__(publicKey[0], 16);
            _this.security._n = big_integer__WEBPACK_IMPORTED_MODULE_3__(publicKey[1], 16);
            _this.security._d = big_integer__WEBPACK_IMPORTED_MODULE_3__(privateKey[0], 16);
            //unblind ID
            return _this.security.unBlindSign(big_integer__WEBPACK_IMPORTED_MODULE_3__(response.body.identity, 16), password);
        });
    };
    HttpClientService.prototype.unblind = function (message, password, publicKey) {
        if (!publicKey) {
            publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
        }
        console.log(publicKey);
        // const publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
        var hash = sha_js__WEBPACK_IMPORTED_MODULE_4__('sha256').update(publicKey).digest('hex');
        var unblind = this.security.unBlindSign(big_integer__WEBPACK_IMPORTED_MODULE_3__(message, 16), password);
        var verify = this.security.verify(unblind).toString(16);
        console.log(hash, verify);
        if (hash === verify)
            return unblind;
        else
            return null;
    };
    HttpClientService.prototype.decryptAES = function (message, password) {
        return this.security.hexToString(this.security.decryptAES(message, password));
    };
    HttpClientService.prototype.test = function () {
        console.log('TEST: Blind Sign');
        var client = new _Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_2__["CryptographyService"](1024, 65537);
        var server = new _Cryptography_cryptography_service__WEBPACK_IMPORTED_MODULE_2__["CryptographyService"](1024, 65537);
        client.setKeys(server.sendKeys().n.toString(16), server.sendKeys().e.toString(16));
        server.setKeys(client.sendKeys().n.toString(16), client.sendKeys().e.toString(16));
        var message = 'hola';
        console.log('message: ' + message);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var encrypt = client.encrypt(big_integer__WEBPACK_IMPORTED_MODULE_3__(client.stringToHex(message), 16));
        console.log('Encrypt: ' + encrypt.toString(16));
        var decrypt = server.hexToString(server.decrypt(encrypt).toString(16));
        console.log('Decrypt: ' + decrypt);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log('Clear Sign');
        var sign_clear = server.sign(big_integer__WEBPACK_IMPORTED_MODULE_3__(server.stringToHex(message), 16));
        console.log('Sign:    ' + sign_clear.toString(16));
        var verify_clear = client.verify(sign_clear);
        console.log('clear:   ' + client.hexToString(verify_clear.toString(16)));
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log('Blind Sign');
        var blind = client.blindSign(big_integer__WEBPACK_IMPORTED_MODULE_3__(client.stringToHex(message), 16), '123');
        console.log('Blind:   ' + blind.toString(16));
        var sign_blind = server.sign(blind);
        console.log('Sign:    ' + sign_blind.toString(16));
        var unblind = client.unBlindSign(sign_blind, '123');
        console.log('Unblind: ' + unblind.toString(16));
        var verify_blind = client.hexToString(client.verify(unblind).toString(16));
        console.log('clear:   ' + verify_blind);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var AES = client.encryptAES('asd213asd', '1234');
        console.log(AES);
        var AES2 = client.hexToString(client.decryptAES(AES, '1234'));
        console.log(AES2);
        var password = '123';
        var publicKey = client._e.toString(16) + '.' + client._n.toString(16);
        var privateKey = client._d.toString(16) + '.' + client._n.toString(16);
        message = sha_js__WEBPACK_IMPORTED_MODULE_4__('sha256').update(publicKey).digest('hex');
        var body = {
            AESpublicKey: client.encryptAES(publicKey, password),
            AESprivateKey: client.encryptAES(privateKey, password),
            identity: client.blindSign(big_integer__WEBPACK_IMPORTED_MODULE_3__(message, 16), password).toString(16)
        };
        console.log(body);
    };
    HttpClientService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HttpClientService);
    return HttpClientService;
}());

/*
  public encrypt(message: string) {
    let msg = this.security.stringToHex(message);
    let body = this.security.encrypt( bigInt(msg, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/decrypt', body, {responseType: 'text'});
  }

  public decrypt (message: string): string {
    let msg = this.security.decrypt( bigInt(message, 16) ).toString(16);
    return this.security.hexToString(msg);
  }

  public signEncrypted (message: string) {
    let msg = this.security.stringToHex(message);
    let body = this.security.encrypt( bigInt(msg, 16) ).toString(16) + '.' + this.security.sign( bigInt(msg, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/decrypt/verify', body, {responseType: 'text'});
  }

  public verifyDecrypted (message: string): boolean {
    let request = message.split('.');

    let msg = this.security.decrypt( bigInt(request[0], 16) ).toString(16);

    let digest = shajs('sha256').update( this.security.hexToString(msg) ).digest('hex');
    let verify = this.security.verify( bigInt(request[1], 16) ).toString(16);

    return digest === verify;
  }

    public sign(message: string) {
    let digest = shajs('sha256').update(message).digest('hex');
    let body = message + '.' + this.security.sign( bigInt(digest, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/verify', body, {responseType: 'text'});
  }

  public verify(message: string): boolean {
    let request = message.split('.');
    let digest = shajs('sha256').update(request[0]).digest('hex');
    let verify = this.security.verify( bigInt(request[1], 16) ).toString(16);
    return digest === verify;
  }

*/


/***/ }),

/***/ "./src/app/service/UserService.ts":
/*!****************************************!*\
  !*** ./src/app/service/UserService.ts ***!
  \****************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/oscar/UNI/CITIE2/seguretat/eVote/eVote-client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map