/*Angular imports */
import {
  Component,
  OnInit,
  TemplateRef,

  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tasks } from '../../../Store/Model/Task.model';
import {  deletetask, loadtask, updatetask, } from '../../../Store/Task/Task.Action';
import { gettask, gettasklist } from '../../../Store/Task/Task.Selectors';

/*Service imports */
import { TaskServiceService } from '../task-service.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/*Component imports */


/*Angular material */
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatPaginator,
  MatPaginatorModule,
 
} from '@angular/material/paginator';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnalyticsComponent } from "../analytics/analytics.component";
import { RouterOutlet } from '@angular/router';
import { StateService } from '../state.service';
import { Subscription } from 'rxjs';
import { UpdateModeEnum } from 'chart.js';

@Component({
    selector: 'app-task-endpoints',
    standalone: true,
    templateUrl: './task-endpoints.component.html',
    styleUrl: './task-endpoints.component.css',
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatList,
        MatListItem,
        MatSnackBarModule,
        MatPaginatorModule,
        MatTableModule,
        MatIcon,
        MatFormFieldModule,
        AnalyticsComponent,
        RouterOutlet,
       
       
    ]
})
export class TaskEndpointsComponent implements OnInit, AfterViewInit {
 

 
  selectedStatus: string = '';
  taskform!: FormGroup;
  tasklist!:Tasks[];
  disableFields: boolean = false;
  tasks: any[]=[];
  namectrl: any;
  descriptionctrl: any;
  statusctrl: any;
  isAddingTask: boolean = true;
  action: string = 'add';
  modalRef!: NgbModalRef;
  selectedTask: any = {
    name: '',
    description: '',
    status: '',
  };
  filteredTasks: any[] = [];
  nameFilterValue:string=''
  dataSource = new MatTableDataSource<any>([]);
  taskSubscription!:Subscription

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private modalService: NgbModal,
    private taskservice: TaskServiceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store:Store
  ) {}

  ngOnInit(): void {
    this.taskform = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.namectrl = this.taskform.get('name');
    this.descriptionctrl = this.taskform.get('description');
    this.statusctrl = this.taskform.get('status');

    this.loadTasks()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  loadTasks() {
    this.store.dispatch(loadtask());
  this.store.select(gettasklist).subscribe(data=>{
  this.tasks=data;
   
    this.applyFilter(this.nameFilterValue,this.selectedStatus);
  },
  (error:any)=>{
   console.log("error fetching",error);
  }
);

 
  
  }

  addTask() {
    
 }

  OpenViewTask(viewtaskmodal: TemplateRef<any>, task: any) {
    this.selectedTask = { ...task };
    this.modalRef = this.modalService.open(viewtaskmodal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  DeleteTask(code:number) {
     this.store.dispatch(deletetask({code:code}))
    this.dataSource.data=this.tasks;
    
    this.modalRef.close();
    
    this.snackBar.open('Task deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });


    }
    opendeletemodal(deletetaskmodal: TemplateRef<any>, task: any) {
        this.isAddingTask = false;
        this.selectedTask = { ...task };
        this.modalRef = this.modalService.open(deletetaskmodal, {
          ariaLabelledBy: 'modal-basic-title',
        });
      }

  

  openupdatetask(AddorUpdateTaskModal: TemplateRef<any>, task: any) {
    this.isAddingTask = false;
    this.selectedTask = { ...task };
    this.action = 'update';
    this.disableFields = true;
    this.taskform.patchValue({
      name: this.selectedTask.name,
      description: this.selectedTask.description,
      status: this.selectedTask.status,
    });
    this.modalRef = this.modalService.open(AddorUpdateTaskModal, {
      ariaLabelledBy: 'modal=basic-title',
    });
  }

  applyFilter(status: string,name:string) {
  
    
      this.filteredTasks = this.tasks.filter(
        (task: any) => ((status ===''|| task.status === status)&&(name === '' || task.name.toLowerCase().includes(name.toLowerCase()))));
    
    this.dataSource.data = this.filteredTasks;
  }

  updatetask1() {
    const status = this.taskform?.get('status')?.value; 
    const name = this.taskform?.get('name')?.value; 
    const description = this.taskform?.get('description')?.value; 
    const updatedTask = {
      id: this.selectedTask.id, 
      ...this.taskform.value  
    };
    
    
    this.store.dispatch(updatetask({inputdata:updatedTask}));
    this.modalRef.close()
    
    this.snackBar.open('Task updated successfully!', 'Close', {
      duration: 3000,
       verticalPosition: 'top',
     });
  }
  filterByName(name: string) {
    const filteredTasks = this.tasks.filter((task: any) =>
      task.name.toLowerCase().includes(name.toLowerCase())
    );
    this.dataSource.data = filteredTasks;
  }

}
