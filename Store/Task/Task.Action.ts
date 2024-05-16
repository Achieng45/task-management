import { createAction, props } from '@ngrx/store';
import {Task} from '../Model/Task.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const tasksLoaded = createAction('[Task] Tasks Loaded', props<{ tasks: Task[] }>());