import { Component } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { AddEditViewComponent } from '../../components/add-edit-view/add-edit-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  constructor(private _GroupsService:GroupsService,private dialog: MatDialog){}
  groupsData:any;
  usersData:any;
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
    this._GroupsService.getAllUsers().subscribe({
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
}
