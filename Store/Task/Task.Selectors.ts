import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskModel } from '../Model/Task.model';

const gettaskstate=createFeatureSelector<TaskModel>('task');
export const gettasklist=createSelector(gettaskstate,(state)=>{
    return state.list;
})

export const gettask=createSelector(gettaskstate,(state)=>{
    return state.taskobject;
})