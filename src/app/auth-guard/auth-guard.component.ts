import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UsersService } from '../users.service';
import { error } from 'console';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,FormsModule,CommonModule],
  templateUrl: './auth-guard.component.html',
  styleUrl: './auth-guard.component.css'
})
export class AuthGuardComponent implements OnInit{
taskform!:FormGroup
constructor(private userservice:UsersService,private router:Router,private fb:FormBuilder){
  
}
ngOnInit(): void {
  this.taskform=this.fb.group({
    email:['',Validators.required,Validators.email],
   password:['',Validators.required]
  });
   
    
}
UserLogin(){
  const email=this.taskform.get('email')?.value;
  const password=this.taskform.get('password')?.value;
  this.userservice.login(email,password).subscribe(
    (isAuthenticated:boolean)=>{
     if (isAuthenticated){
      sessionStorage.setItem("isloggedIn","true");
      this.router.navigate(['/']);
     }else{
         sessionStorage.setItem("isloggedIn","false");
         this.router.navigate(['/register']);
     }
     },
     (error)=>{
      console.log("wrong user name or password");
     }
    );
    }

}

