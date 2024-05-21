import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable, map } from 'rxjs';
import { Tasks } from '../../../../Store/Model/Task.model';
import { AnyARecord } from 'dns';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private api = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}
  
  getTasks():Observable<Tasks[]> {
    return this.http.get<any[]>(this.api);
      
   
    
  }
  createTask(data: Tasks) {
    return this.http.post(this.api, data);
  }

  deleteTaskbyID(id: number): Observable<any> {
    return this.http.delete(this.api + '/' + id);
  }
  updateTask( data: Tasks) {
    return this.http.put(this.api + '/' + data.id, data);
  }
  getTaskStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/' + status);
  }
  gettaskbyid(code:number){
    return this.http.get<Tasks>(this.api+ '/'+code)
  }
}
