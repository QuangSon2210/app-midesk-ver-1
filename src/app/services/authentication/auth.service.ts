import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CookieService } from 'angular2-cookie/core';
import { User } from './../../models/user';


export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {
    private isloggedIn: boolean = false;
    private loggedInUser: any; //User
    constructor(
        public _cookieService: CookieService
        ) {
    }
    getToken(): string {
        return this._cookieService.get(TOKEN_NAME);
    }
    setUserAuthenticated(userLogin): boolean {
        if (typeof userLogin.success != 'undefined' && userLogin.success.token != '') {
            this.isloggedIn = true;
            this.loggedInUser = userLogin.success;
            this._cookieService.putObject('curuser', { info: this.loggedInUser.user, user_log: this.loggedInUser.user_log });
            this._cookieService.putObject('curgroup',{ extension: this.loggedInUser.extension ,list_team: this.loggedInUser.list_team, list_agent: this.loggedInUser.list_agent });
            this._cookieService.putObject('priority',{ priority: this.loggedInUser.priority });
            this._cookieService.put(TOKEN_NAME, this.loggedInUser.token);
        } else {
            console.log('Empty token ---');
            this._cookieService.removeAll();
            this.isloggedIn = false;
        }
        return this.isloggedIn;
    }
    isUserLoggedIn(): boolean {
        if (this.getToken()) {
            this.isloggedIn = true;
        }
        return this.isloggedIn;
    }
    getLoggedInUser(): User {
        if (this._cookieService.getObject('curuser')) {
            this.loggedInUser = this._cookieService.getObject('curuser')['info'];
        }
        return this.loggedInUser;
    }
    getLoggedInListTeam(){
        if (this._cookieService.getObject('curgroup')) {
            this.loggedInUser = this._cookieService.getObject('curgroup')['list_team'];
        }
        return this.loggedInUser;
    }
    getLoggedInListAgent(){
        if (this._cookieService.getObject('curgroup')) {
            this.loggedInUser = this._cookieService.getObject('curgroup')['list_agent'];
        }
        return this.loggedInUser;
    }
    getLoggedInExtension(){
        if (this._cookieService.getObject('curgroup')) {
            this.loggedInUser = this._cookieService.getObject('curgroup')['extension'];
        }
        return this.loggedInUser;
    }
    getUserLastlogId() {
        if (this._cookieService.getObject('curuser')) {
            return this._cookieService.getObject('curuser')['user_log'].id;
        }
        return 0;
    }
    getPriority(){
        if (this._cookieService.getObject('priority')) {
            this.loggedInUser = this._cookieService.getObject('priority')['priority'];
        }
        return this.loggedInUser;
    }

    logoutUser(): void {
        this._cookieService.removeAll();
        localStorage.clear();
        // console.log(this._cookieService.getAll());
        this.isloggedIn = false;
    }
} 