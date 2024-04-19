import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskEndpointsComponent } from './task-endpoints/task-endpoints.component';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { TaskServiceService } from './task-service.service';
import { HttpClientXsrfModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';

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
    
    NavbarComponent,
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatListItem,
    MatIcon,
    MatRadioModule,
    MatFormFieldModule,
    MatOption,
    MatSnackBarModule,
    MatTabsModule
    
  ],
})
export class AppComponent implements OnInit {
  // @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  title = 'tasks';
  action: string = 'add';
  modalRef!: NgbModalRef;
  taskform!: FormGroup;
  tasks: any[] = [];
  namectrl: any;
  descriptionctrl: any;
  statusctrl: any;
  selectedStatus: string = '';

  showfilterdrawer: boolean = false;

  @ViewChild(TaskEndpointsComponent) taskEndpoints!: TaskEndpointsComponent;
  constructor(
    private modalService: NgbModal,
    private taskservice: TaskServiceService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loadTasks();
    this.taskform = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.namectrl = this.taskform.get('name');
    this.descriptionctrl = this.taskform.get('description');
    this.statusctrl = this.taskform.get('status');
  }
  addTask() {
    this.taskservice.createTask(this.taskform.value).subscribe((response) => {
      
      this.tasks.push(response);
      this.taskEndpoints.applyFilter(this.selectedStatus);
      this.taskform.reset();
      this.modalRef.close();
    });
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

  loadTasks(): void {
    this.taskservice.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  

  onStatusSelected(): void {
    this.taskEndpoints.applyFilter(this.selectedStatus);
  }

  // selectTabBasedOnStatus(): void {
  //   switch (this.selectedStatus) {
  //     case 'Completed':
  //       this.tabGroup.selectedIndex = 0; // Index of the Completed tab
  //       break;
  //     case 'Pending':
  //       this.tabGroup.selectedIndex = 1; // Index of the Pending tab
  //       break;
  //     case 'Cancelled':
  //       this.tabGroup.selectedIndex = 2; // Index of the Cancelled tab
  //       break;
  //     // Add more cases as needed
  //     default:
  //       this.tabGroup.selectedIndex = -1; // No tab selected
  //       break;
  //   }
  // }
  // getTabIndex(status: string): number {
  //   switch (status) {
  //     case 'Completed':
  //       return 0;
  //     case 'Pending':
  //       return 1;
  //     case 'Cancelled':
  //       return 2;
  //     default:
  //       return -1;
  //   }
  // }

}
