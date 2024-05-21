import { createAction, props } from '@ngrx/store';
import {Tasks} from '../Model/Task.model';


export const SHOW_ALERT='[app]show alert'
export const EMPTY_ACTION='[app]empty'
export const showalert=createAction(SHOW_ALERT,props<{message:string,resulttype:string}>())
export const emptyaction=createAction(EMPTY_ACTION)

export const LOAD_TASK='[task page]load task'
export const LOAD_TASK_SUCCESS='[task page] load task success'
export const LOAD_TASK_FAIL='[task page]load task fail'
export const GET_TASK='[task page]get task'
export const GET_TASK_SUCCESS='[task page]get task success'

export const ADD_TASK='[task page] add task'
export const ADD_TASK_SUCCESS='[task page] add task success'
export const ADD_TASK_FAIL='[task page] add task fail'

export const UPDATE_TASK='[task page] update task'
export const UPDATE_TASK_SUCCESS='[task page] update task success'
export const UPDATE_TASK_FAIL='[task page] update task fail'

export const DELETE_TASK='[task page] delete task'
export const DELETE_TASK_SUCCESS='[task page]delete task success'
export const DELETE_TASK_FAIL='[task page] delete task fail'

export const loadtask = createAction(LOAD_TASK);
export const loadtasksuccess= createAction(LOAD_TASK_SUCCESS, props<{ list: Tasks[] }>());
export const loadtaskfail=createAction(LOAD_TASK_FAIL,props<{errormessage:string}>());

export const gettask=createAction(GET_TASK,props<{id:number}>());
export const gettasksuccess=createAction(GET_TASK_SUCCESS,props<{obj:Tasks}>());

export const addtask=createAction(ADD_TASK,props<{inputdata:Tasks}>());
export const addtasksuccess=createAction(ADD_TASK_SUCCESS,props<{inputdata:Tasks}>());
// export const addtaskfail=createAction(ADD_TASK_FAIL,props<{errormessage:string}>());

export const updatetask=createAction(UPDATE_TASK,props<{inputdata:Tasks}>());
export const updatetasksuccess=createAction(UPDATE_TASK_SUCCESS,props<{inputdata:Tasks}>());

export const deletetask=createAction(DELETE_TASK,props<{code:number}>());
export const deletetasksuccess=createAction(DELETE_TASK_SUCCESS,props<{code:number}>());