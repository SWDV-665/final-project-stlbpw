import { Injectable } from '@angular/core';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  userLoggedIn: boolean = false;

  constructor(private userdataService: UserdataService) { }

  public async login(username: string, password: string): Promise<boolean> {
    console.log('Login');
    console.log('Username: ' + username);
    console.log('Password: ' + password);
  
    await this.userdataService.userLogin(username, password);
  
    //set username TODO:  get this from a database
    // this.userdataService.appUser.username = username;
    // this.userdataService.appUser.email = 'email@awesome.com';
    // this.userdataService.appUser.firstname = 'Bruce';
    // this.userdataService.appUser.lastname = 'Wilhelm';
    // this.userdataService.appUser.age = 30;
    // this.userdataService.appUser.password = password;
    console.log('Service Username: ' + this.userdataService.appUser.username);
  
    this.userLoggedIn = true;
  
    //todo:  populate history array with data from the service
  
    return this.userLoggedIn;
  }

  public logout(): boolean {
    console.log('Logout');
    //this.userdataService.clearHistory();
    this.userLoggedIn = false;
    return this.userLoggedIn;
  }

  public getLoggedInStatus(): boolean {
    console.log('Get Logged In Status: ' + this.userLoggedIn);
    return this.userLoggedIn;
  }

  public getUsername(): string {
    console.log('Get Username: ' + this.userdataService.appUser.username);
    return this.userdataService.appUser.username;
  }

}
