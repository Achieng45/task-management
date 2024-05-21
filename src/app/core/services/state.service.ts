import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskServiceService } from './task-service.service';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  taskSubject:BehaviorSubject<any[]> =new BehaviorSubject<any[]>([]);
  tasks$=this.taskSubject.asObservable();

  constructor(private taskservice:TaskServiceService) { 
    this.loadTasks();
  }
  loadTasks(){
    this.taskservice.getTasks().subscribe(
      (tasks:any)=>{this.taskSubject.next(tasks)},
      (error:any)=>{console.log('Error fetching tasks:',error)});
  }
  addTask(taskData:any){
    this.taskservice.createTask(taskData).subscribe(
      (response:any)=>{
        const currentTasks=this.taskSubject.getValue();
        this.taskSubject.next([...currentTasks,response]);
      },
      (error:any)=>{console.log('Error adding task');

      }
    );
  }
  deleteTasks(taskId:number)
  {
    this.taskservice.deleteTaskbyID(taskId).subscribe(
      ()=>{
        const currentTasks=this.taskSubject.getValue();
        const updatedTasks=currentTasks.filter((task)=>task.id!==taskId);
        this.taskSubject.next(updatedTasks);
      },
      (error:any)=>{
        console.log('Error adding task',error);
      }

    );

  }
  // updateTask(taskId:number,UpdatedTaskData:any){
  //   this.taskservice.updateTask(data).subscribe(
  //     (response)=>{
  //       const currentTasks=this.taskSubject.getValue();
  //       const updatedTasks=currentTasks.map((task)=>task.id===taskId?{...task,...UpdatedTaskData}:task);
  //       this.taskSubject.next(updatedTasks);
  //     },
  //       (error:any)=>{
  //         console.log('Error updateing task',error)
  //       }
  //   );
  // }
}
