import { Data } from './../../../../../auth/interfaces/IAuthRes';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { AddEditViewComponent } from '../../components/add-edit-view/add-edit-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { StudentsService } from '../students/services/students.service';
import { DeleteItemComponent } from '../../components/delete-item/delete-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit{
  groupsData:any;
  studentsWithoutGroup:any;
  resMessage:any;
  groupsActions = [
    { label: "Update", action: "update" },
    { label: "Delete", action: "delete", isDanger: true },
  ];
    constructor(private _GroupsService:GroupsService,private dialog: MatDialog,private _StudentsService:StudentsService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this.getAllGroups()
    this.getAllStudentWithoutGroup()
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
        console.log(res,'without');
        this.studentsWithoutGroup = res
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
        { type: 'select', label: 'List Students', name: 'students', value: this.studentsWithoutGroup, validators: [Validators.required] },
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
          { type: 'select', label: 'List Students', name: 'students', value: students, validators: [Validators.required] },
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
          next: (res) => {
            this.resMessage = res.message
           },
          error: (err) => {
            this._ToastrService.error(err.error.message)
          },
          complete: () => {
            this._ToastrService.success()
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
          // let updateStudents = this.studentsWithoutGroup.concat(data.students)
          // console.log(updateStudents,'update');
          
          this.editGroup(data,this.studentsWithoutGroup)
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
                  console.log(res)
                },
                complete:()=>{
                  this.getAllGroups()
                }
              });
            }
          });
          break;
        default:
          console.error("Unknown action:", action);
      }
    }
}
