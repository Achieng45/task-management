import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskEndpointsComponent } from '../task-endpoints/task-endpoints.component';
import { TaskServiceService } from '../../../core/services/task-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import {
  MatFormField,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ChartModule } from 'angular-highcharts';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { addtask } from '../../../../../Store/Task/Task.Action';
@Component({
  selector: 'app-taskbar',
  standalone: true,
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIcon,
    MatDrawer,
    MatDrawerContainer,
    MatNavList,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    MatCardContent,
    MatCard,
    MatOption,
    MatCardHeader,
    TaskEndpointsComponent,
    MatTabGroup,
    MatTab,
    ChartModule,
    ReactiveFormsModule,
    MatFormField,
    RouterModule,
    RouterOutlet,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class TaskbarComponent implements OnInit {
  title = 'tasks';
  action: string = 'add';
  modalRef!: NgbModalRef;
  taskform!: FormGroup;
  tasks: any[] = [];
  namectrl: any;
  descriptionctrl: any;
  statusctrl: any;
  selectedStatus: string = '';
  nameFilterValue: string = '';
  showfilterdrawer: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(TaskEndpointsComponent) taskEndpoints!: TaskEndpointsComponent;

  nameFilterCtrl!: FormControl;
  constructor(
    private modalService: NgbModal,
    private taskservice: TaskServiceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}
  ngOnInit(): void {
    // this.loadTasks();
    this.nameFilterCtrl = this.fb.control('');
    this.taskform = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.namectrl = this.taskform.get('name');
    this.descriptionctrl = this.taskform.get('description');
    this.statusctrl = this.taskform.get('status');
    // this.stateservice.tasks$.subscribe(tasks=>{
    //   this.tasks=tasks;
    // });
    // this.loadTasks();
  }

  addTask() {
    this.store.dispatch(addtask({ inputdata: this.taskform.value }));
    this.taskEndpoints.applyFilter(this.nameFilterValue, this.selectedStatus);
    this.taskform.reset();
    this.modalRef.close();

    this.snackBar.open('Task added successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  openAddTaskModal(AddorUpdateTaskModal: TemplateRef<any>) {
    this.action = 'add';
    this.modalRef = this.modalService.open(AddorUpdateTaskModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  UpdateTask() {}

 
  onStatusSelected(): void {
    this.taskEndpoints.selectedStatus = this.selectedStatus;
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

    this.taskEndpoints.applyFilter(this.selectedStatus, this.nameFilterValue);
  }

  applyFilters() {
    this.taskEndpoints.applyFilter(this.selectedStatus, this.nameFilterValue);
  }
}
