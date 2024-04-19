import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  NgZone,
} from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    NavbarComponent,
    MatSnackBarModule,
  ],
})
export class TaskEndpointsComponent implements OnInit {
  taskform!: FormGroup;
  selectedStatus: string = '';
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


 

  constructor(
    private modalService: NgbModal,
    private taskservice: TaskServiceService,
    private fb: FormBuilder,
   
    
    private snackBar: MatSnackBar
  ) {}


   
  currentPage=1;
 itemsPerPage=2;
 totalItems=5;
 active=2;
 page=2;

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

  onPageChange(){
    this.currentPage=this.page;
    this.loadTasks();
  }

  loadTasks() {
    this.taskservice.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;

        this.applyFilter(this.selectedStatus);
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

        this.applyFilter(this.selectedStatus);
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
        console.log(this.selectedTask.id);

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
  applyFilter(status: string): void {
    if (
      status === 'Completed' ||
      status === 'Pending' ||
      status == 'Cancelled'
    ) {
      this.filteredTasks = this.tasks.filter((task) => task.status === status);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
  updatetask1() {
    const status = this.taskform!.get('status')!.value; // Get the status from the form
    const name = this.taskform!.get('name')!.value; // Get the current value of the name field
    const description = this.taskform!.get('description')!.value; // Get the current value of the description field

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
}