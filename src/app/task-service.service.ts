import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private api = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}
  
  getTasks() {
    return this.http.get(this.api);
  }
  createTask(data: object) {
    return this.http.post(this.api, data);
  }

  deleteTaskbyID(id: number): Observable<any> {
    return this.http.delete(this.api + '/' + id);
  }
  updateTask(id: number, data: object) {
    return this.http.put(this.api + '/' + id, data);
  }
  getTaskStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/' + status);
  }
}
