export interface Tasks {
    id:number;
    name: string;
    description: string;
    status: string;
  }
export interface TaskModel{
  list:Tasks[],
  taskobject:Tasks,
  errormessage:string
}