import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../Model/Task.model';
import * as TaskActions from './Task.Action'
export interface TaskState extends EntityState<Task> {
 
  loading: boolean;
  error: string | null;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = taskAdapter.getInitialState({
  loading: false,
  error: null,
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.tasksLoaded, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loading: false })
  ));
  export function reducer(state: TaskState | undefined, action: Action) {
    return taskReducer(state, action);
  
}