import { createReducer, on } from '@ngrx/store';
import { TaskState } from './Task.State';
import { Tasks } from '../Model/Task.model';
import * as TaskActions from './Task.Action';



 export const _TaskReducer = createReducer(TaskState,
  
  on(TaskActions.loadtasksuccess, (state, action) =>{
    return{
      ...state,
      list:[...action.list],
      errormessage:''
    }
  }),
  on(TaskActions.loadtaskfail,(state,action)=>{
    return {
      ...state,
      list:[],
      errormessage:action.errormessage
    }
  }),
  on(TaskActions.addtasksuccess,(state,action)=>{
    const maxid=Math.max(...state.list.map(o=>o.id));
    const newdata={...action.inputdata};
    newdata.id=maxid+1;
    return{...state,list:[...state.list,newdata],
      errormessage:''
    }
    
  }),
  on(TaskActions.updatetasksuccess,(state,action)=>{
    const newdata=state.list.map(o=>{
      return o.id===action.inputdata.id?action.inputdata:o

    })
    return {
      ...state,
      list:newdata,
      errormessage:''
    }

  }),
  on(TaskActions.gettasksuccess,(state,action)=>{
    return {
      ...state,
      taskobject:action.obj,
      errormessage:''
    }
  }),
  on(TaskActions.deletetasksuccess,(state,action)=>{
    const newdata=state.list.filter(o=>o.id!==action.code);
    return {
      ...state,
      list:newdata,
      errormessage:''
    }
  })
 

 )
 export function TaskReducer(state: any, action: any) {
  return _TaskReducer(state, action);
}