import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskServiceService } from '../../src/app/task-service.service';
import * as TaskActions from './Task.Action';

@Injectable()
export class TaskEffects {
    constructor(private actions$: Actions, private taskService: TaskServiceService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.tasksLoaded({ tasks })),
          catchError(error => of(/* handle error */))
        )
      )
    )
  );

}