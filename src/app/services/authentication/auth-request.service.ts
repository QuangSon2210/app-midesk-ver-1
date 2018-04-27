import { Injectable } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthRequestOptions extends BaseRequestOptions {

     constructor(private _authService: AuthService) {
          super();
          this.headers.append('Content-Type', 'application/json');
          //Auto append token to header
          let token = this._authService.getToken();
          if (token) {
            //    console.log("Token: "+token);
               // console.log(this._authService.getLoggedInUser());
               this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
          }
     }

}