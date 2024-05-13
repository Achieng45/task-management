import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api='http://localhost:3000/users';
  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(this.api);
  }
  createUser(data:object){
    return this.http.post(this.api,data)
  }
  login(email:string,password:string):Observable<boolean>{
    return this.http.get<any[]>(this.api).pipe(
      map(users=>{
        const authenticatedUser=users.find(user=>user.email===email&&user.password===password);
        return !!authenticatedUser;
      })
    );
  
  }
  loggedin(){
    return !!sessionStorage.getItem("isloggedIn")
  }
}
