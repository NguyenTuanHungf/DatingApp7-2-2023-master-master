import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/enviroment';
import {User} from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);  
  currentUser$ = this.currentUserSource.asObservable();
  

  constructor(private http:HttpClient) { }

  login(model: any) {
    console.log('lỗi ở đây');

    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((reponse: User) => {
         const user = reponse;
         if (user) {

          this.setCurrentUser(user);
         }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
         if (user) {

          this.setCurrentUser(user);

         }
      })
    )
  }

  setCurrentUser(user: User) {



    
      user.roles = [];  
      const roles = this.getDecodedToken(user.token).role;



      Array.isArray(roles) ? user.roles =roles: user.roles.push(roles);


      localStorage.setItem('user', JSON.stringify(user));

      this.currentUserSource.next(user);
    }


    logout() {
      localStorage.removeItem('user');
      this.currentUserSource.next(null!);
    }
    getDecodedToken(token: any)
    {
      return JSON.parse(atob(token.split(".")[1]));


    }
  

}
