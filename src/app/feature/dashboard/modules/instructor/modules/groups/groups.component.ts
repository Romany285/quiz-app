import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { AddEditViewComponent } from '../../components/add-edit-view/add-edit-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { StudentsService } from '../students/services/students.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit{
  groupsData:any;
  usersData:any;
  groupsActions = [
    { label: "Update", action: "update" },
    { label: "Delete", action: "delete", isDanger: true },
  ];
    constructor(private _GroupsService:GroupsService,private dialog: MatDialog,private _StudentsService:StudentsService){}
  ngOnInit(): void {
    this.getAllGroups()
  }
     
  getAllGroups(){
    this._GroupsService.getAllGroups().subscribe({
      next:(res)=>{
        console.log(res);
        this.groupsData = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getAllUsers(){
    this._StudentsService.getAllStudents().subscribe({
      next:(res)=>{
        console.log(res);
        this.usersData = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditViewComponent, {
      data: {fields: [
        { type: 'text', label: 'Group Name', name: 'name' , validators: [Validators.required] },
        { type: 'select', label: 'List Students', name: 'students', value: this.usersData, validators: [Validators.required] },
      ],},
      width:'50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        ;
      }
    });
  }
  onStudentAction(event: { action: string; data: any }): void {
      const { action, data } = event;
      switch (action) {
        case "update":
          console.log("Update Student:", data);
          break;
        case "delete":
          if (confirm(`Are you sure you want to delete ${data.first_name}?`)) {
            console.log("Delete Student:", data);
            // Call the service to delete the student
          }
          break;
        default:
          console.error("Unknown action:", action);
      }
    }
}
