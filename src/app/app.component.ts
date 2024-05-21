import {
 
  Component,
  
  OnInit,
 
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskEndpointsComponent } from './features/Task-management/task-endpoints/task-endpoints.component';

import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { TaskServiceService } from './core/services/task-service.service';
import { HttpClientXsrfModule } from '@angular/common/http';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabChangeEvent,  MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';


import { MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AnalyticsComponent } from "./features/Task-management/analytics/analytics.component";
import { ChartModule, } from 'angular-highcharts';
import { StateService } from './core/services/state.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        TaskEndpointsComponent,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatToolbarModule,
        HttpClientXsrfModule,
        MatSidenavModule,
        
        MatListModule,
        MatListItem,
        MatIcon,
        MatRadioModule,
        MatFormFieldModule,
        MatOption,
        MatSnackBarModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        AnalyticsComponent,
        ChartModule,
        RouterModule
    ]
})
export class AppComponent implements OnInit  {
  
  title = 'tasks';
  action: string = 'add';
  modalRef!: NgbModalRef;
  taskform!: FormGroup;
  tasks: any[] = [];
  namectrl: any;
  descriptionctrl: any;
  statusctrl: any;
  selectedStatus: string = '';
  nameFilterValue:string='';
  showfilterdrawer: boolean = false;
  isAddingTask:boolean=true;
  dataSource=new MatTableDataSource<any>([]);
  selectedTask: any = {
    name: '',
    description: '',
    status: '',
  };
  taskSubscription!:Subscription
  @ViewChild(TaskEndpointsComponent) taskEndpoints!: TaskEndpointsComponent;

  nameFilterCtrl!: FormControl;
  constructor(
    private modalService: NgbModal,
    private taskservice: TaskServiceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private stateservice:StateService

  ) {}
  ngOnInit(): void {
    
    this.nameFilterCtrl = this.fb.control('');
    this.taskform = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.namectrl = this.taskform.get('name');
    this.descriptionctrl = this.taskform.get('description');
    this.statusctrl = this.taskform.get('status');
    this.stateservice.tasks$.subscribe(tasks=>{this.tasks=tasks});
    this.loadTasks();
  
  }


  addTask() {
    this.stateservice.addTask(this.taskform.value);
      this.taskform.reset();
      this.modalRef.close();
      this.snackBar.open('Task added successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  openAddTaskModal(AddorUpdateTaskModal: TemplateRef<any>) {
    this.isAddingTask=true
    this.action = 'add';
    this.selectedTask={};
    this.taskform.reset();
    this.modalRef = this.modalService.open(AddorUpdateTaskModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  UpdateTask() {}

   loadTasks(): void {
    this.taskSubscription=this.stateservice.tasks$.subscribe(
      (tasks: any) => {
        this.tasks ;
        this.taskEndpoints.applyFilter(this.selectedStatus,this.nameFilterValue);
        
      
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onStatusSelected(): void {
    // this.taskEndpoints.applyFilter(this.selectedStatus,this.nameFilterValue);
    this.taskEndpoints.selectedStatus=this.selectedStatus
  }
   onTabClick(event: MatTabChangeEvent): void {
    
    
    switch (event.index) {
      case 0:
        this.selectedStatus = '';
        break;
      case 1:
        this.selectedStatus = 'Completed';
        break;
      case 2:
        this.selectedStatus = 'Pending';
        break;
      case 3:
        this.selectedStatus = 'Cancelled';
        break;
      default:
        break;
    }
   
     
   this.taskEndpoints.applyFilter(this.selectedStatus,this.nameFilterValue);
   
    
  }
  Filterbyname(event:any){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.taskEndpoints.filterByName(filterValue);
  }

  applyFilters() {
    
    
    this.taskEndpoints.applyFilter(this.selectedStatus, this.nameFilterValue);
    // this.taskEndpoints.filterByName(this.nameFilterValue);
  }
  press(){
    console.log("reditrect");
  }

}
