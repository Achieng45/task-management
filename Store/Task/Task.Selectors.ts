import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from './Task.Reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const { selectAll: selectAllTasks } = taskAdapter.getSelectors(selectTaskState);