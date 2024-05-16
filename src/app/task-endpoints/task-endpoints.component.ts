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
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../../Store/Model/Task.model';
import {  loadTasks, } from '../../../Store/Task/Task.Action';
import { selectAllTasks } from '../../../Store/Task/Task.Selectors';

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
        RouterOutlet
    ]
})
export class TaskEndpointsComponent implements OnInit, AfterViewInit {
  tasks$?: Observable<Task[]>;

 
  selectedStatus: string = '';
  taskform!: FormGroup;

  disableFields: boolean = false;
  tasks: any[] = [];
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

    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.select(selectAllTasks);
    // this.loadTasks()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  loadTasks() {
    this.taskservice.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;

        this.applyFilter(this.nameFilterValue,this.selectedStatus);
      },
      (error: any) => {
        console.error('error fetching', error);
      }
    );
  }

  addTask() {
    this.taskservice.createTask(this.taskform.value).subscribe(
      (response: any) => {
        this.tasks.push(response);
       
         this.dataSource.data=this.tasks
        
        this.taskform.reset();
       
        this.modalRef.close();
      },
      
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
    this.snackBar.open('Task added successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  openAddTaskModal(AddorUpdateTaskModal: TemplateRef<any>) {
    this.isAddingTask = true;
    this.selectedTask = {};
    this.taskform.reset();
    // this.action = 'add';
    this.modalRef = this.modalService.open(AddorUpdateTaskModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  OpenViewTask(viewtaskmodal: TemplateRef<any>, task: any) {
    this.selectedTask = { ...task };
    this.modalRef = this.modalService.open(viewtaskmodal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  DeleteTask() {
    this.taskservice.deleteTaskbyID(this.selectedTask.id).subscribe(
      (response) => {
        this.tasks = this.tasks.filter(
          (task: { id: any }) => task.id !== this.selectedTask.id
        );
         this.dataSource.data=this.tasks;

        this.modalRef.close();
      },
      (error) => {
        console.log('error deleting employee:', error);
      }
    );
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
  
    // if (
    //   status === 'Completed' ||
    //   status === 'Pending' ||
    //   status === 'Cancelled'
    // ) {
      this.filteredTasks = this.tasks.filter(
        (task: any) => ((status ===''|| task.status === status)&&(name === '' || task.name.toLowerCase().includes(name.toLowerCase()))));
      
    // } else {
    //   this.filteredTasks = this.tasks;
    // }
    this.dataSource.data = this.filteredTasks;
  }

  updatetask1() {
    const status = this.taskform?.get('status')?.value; // Get the status from the form
    const name = this.taskform?.get('name')?.value; // Get the current value of the name field
    const description = this.taskform?.get('description')?.value; // Get the current value of the description field

    this.taskservice
      .updateTask(this.selectedTask.id, { name, description, status })
      .subscribe(
        (response) => {
          // Update the task in the tasks array with the response data
          const index = this.tasks.findIndex(
            (task) => task.id === this.selectedTask.id
          );
          if (index !== -1) {
            this.tasks[index] = response;
          }
          this.dataSource.data=this.tasks;
         
          this.modalRef.close(); // Close the modal
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
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
