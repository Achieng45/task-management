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
  selector: 'app-resgister',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,FormsModule,CommonModule],
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.css'
})
export class ResgisterComponent implements OnInit {
  taskform!:FormGroup
  users:[]=[]
  // email = new FormControl('',[Validators.required,Validators.email]);
  // password=new FormControl('',[Validators.required])
  
  constructor( private userservice:UsersService,private fb:FormBuilder,private router:Router){}
  
  ngOnInit(): void {
    this.taskform=this.fb.group({
      email:['',Validators.required,Validators.email],
     password:['',Validators.required]
    });
     
  }
  AddUser(){
    this.userservice.createUser(this.taskform.value).subscribe((response:any)=>{
      this.users=response
      console.log(response);
      this.taskform.reset();
  
    },
    (error)=>{
      console.error('Error adding user',error);
    }
    );
  }
}
