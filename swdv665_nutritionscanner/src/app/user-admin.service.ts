import { Injectable } from '@angular/core';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  userLoggedIn: boolean = false;
  userName: string = '';

  constructor(private userdataService: UserdataService) { }

  public login(username: string, password: string): boolean {
    console.log('Login');
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    //set username
    this.userName = username;
    console.log('Service Username: ' + this.userName);

    this.userLoggedIn = true;

    //todo:  populate history array with data from the service

    return this.userLoggedIn;
  }

  public logout(): boolean {
    console.log('Logout');
    this.userdataService.clearHistory();
    this.userLoggedIn = false;
    return this.userLoggedIn;
  }

  public getLoggedInStatus(): boolean {
    console.log('Get Logged In Status: ' + this.userLoggedIn);
    return this.userLoggedIn;
  }

  public getUsername(): string {
    console.log('Get Username: ' + this.userName);
    return this.userName;
  }

}
