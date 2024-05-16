import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../Model/Task.model';
import * as TaskActions from './Task.Action';

export interface TaskState extends EntityState<Task> {
 
}

export const taskAdapter = createEntityAdapter<Task>();

const initialState: TaskState = taskAdapter.getInitialState({

});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.tasksLoaded, (state, { tasks }) => taskAdapter.setAll(tasks, state)),
);