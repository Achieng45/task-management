import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {  map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskServiceService } from '../../src/app/core/services/task-service.service';
import * as TaskActions from './Task.Action';
import { showalert } from './Task.Action';
import { error } from 'console';

@Injectable()
export class TaskEffects {
    constructor(private actions$: Actions, private taskService: TaskServiceService) {}

  loadtask = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadtask),
      exhaustMap((action) =>{
        return this.taskService.getTasks().pipe(
          map((tasks) =>{ 
            return TaskActions.loadtasksuccess({ list:tasks })}),
          catchError(error => of(TaskActions.loadtaskfail({errormessage:error.message})))
        )
      })
    )
  )

  addtask=createEffect(()=>
    this.actions$.pipe(
    ofType(TaskActions.addtask),
    switchMap((action)=>{
      return this.taskService.createTask(action.inputdata).pipe(
        switchMap((data)=>{
         return of(TaskActions.addtasksuccess({inputdata:action.inputdata}),
         showalert({message:'Added successfully.',resulttype:'pass'}))
        }),
         catchError((error=>of(showalert({message:'Failed to add task',resulttype:'fail'})))
        ))
        })
    
  )

)
updateTasks=createEffect(()=>this.actions$.pipe(ofType(TaskActions.updatetask),
switchMap((action)=>{
  return this.taskService.updateTask(action.inputdata).pipe(
    switchMap((data)=>{
      return of (TaskActions.updatetasksuccess({inputdata:action.inputdata}),
    showalert({message:'Updated successfully.', resulttype:'pass'})
    )
    }),
    catchError((error)=>of(showalert({message:'Failed to update task',resulttype:'fail'})))
  )
})

))
  _gettask=createEffect(()=>
    this.actions$.pipe(
      ofType(TaskActions.gettask),
      exhaustMap((action)=>{
        return this.taskService.gettaskbyid(action.id).pipe(
          map((data=>{
            return TaskActions.gettasksuccess({obj:data})
          })),
          catchError((error)=>of (showalert({message:'Failed to fetch data:'+error.message,resulttype:'fail'})))
        )
      })
    )
  )
  _deletetask=createEffect(()=>
    this.actions$.pipe(
      ofType(TaskActions.deletetask),
      switchMap((action)=>{
        return this.taskService.deleteTaskbyID(action.code).pipe(
          switchMap((data)=>{
            return of(TaskActions.deletetasksuccess({code:action.code}),

            showalert({message:'Deleted successfuly',resulttype:'pass'}))
          
          }),
          catchError((error)=>of(showalert({message:'Failed to delete task',resulttype:'fail'})))
        )
      })
    )
  )
}