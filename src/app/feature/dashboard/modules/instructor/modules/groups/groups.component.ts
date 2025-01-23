import { Data } from './../../../../../auth/interfaces/IAuthRes';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { AddEditViewComponent } from '../../components/add-edit-view/add-edit-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { StudentsService } from '../students/services/students.service';
import { DeleteItemComponent } from '../../components/delete-item/delete-item.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit{
  groupsData:any;
  usersData:any;
  allStudents:any;
  groupsActions = [
    { label: "Update", action: "update" },
    { label: "Delete", action: "delete", isDanger: true },
  ];
    constructor(private _GroupsService:GroupsService,private dialog: MatDialog,private _StudentsService:StudentsService){}
  ngOnInit(): void {
    this.getAllGroups()
    this.getAllStudentWithoutGroup()
    this.getAllStudent()
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
  getAllStudentWithoutGroup(){
    this._StudentsService.getAllWithoutGroup().subscribe({
      next:(res)=>{
        console.log(res);
        this.usersData = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getAllStudent(){
    this._StudentsService.getAllStudents().subscribe({
      next:(res)=>{
        console.log(res);
        this.allStudents = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  openDialogAddGroup(): void {
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
        this._GroupsService.addGroup(result).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(err)=>{
            console.log(err);
          },
          complete:()=> {
            this.getAllGroups()
          },
        })
        console.log(result);
        ;
      }
    });
  }
  openDialogUpdateGroup(name?: string, students?: any, readOnly = false) {
    const dialogRef = this.dialog.open(AddEditViewComponent, {
      width: '55%',
      data: {
        fields: [
          { type: 'text', label: 'Group Name', name: 'name' ,value: name || '', validators: [Validators.required] },
          { type: 'select', label: 'List Students', name: 'students', value: this.allStudents, validators: [Validators.required] },
        ],
        readOnly
      }
    })
    return dialogRef.afterClosed();
  }
  editGroup(group:any,students:any): void {
    this.openDialogUpdateGroup(group.name,students).subscribe((result) => {
      if (result) {
        console.log(group,'ffff');
        
        this._GroupsService.updateGroup(group._id, {
          name: result.name,
          students: result.students
        }).subscribe(({
          next: () => { },
          error: ( ) => {},
          complete: () => {
            this.getAllGroups();
          }
        }))
      }
    })
  }
  onStudentAction(event: { action: string; data: any }): void {
      const { action, data } = event;
      switch (action) {
        case "update":
          console.log(data,'pp');
          this.editGroup(data,data.students)
          break;
        case "delete":
          const dialogRef = this.dialog.open(DeleteItemComponent, {
            data: {
              title: "group",
              description: `Are you sure you want to delete ${data.name} group?`,
            },
          });
  
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this._GroupsService.deleteGroup(data._id).subscribe({
                next: (res) => {
                  this.getAllGroups()
                },
              });
            }
          });
          break;
        default:
          console.error("Unknown action:", action);
      }
    }
}
