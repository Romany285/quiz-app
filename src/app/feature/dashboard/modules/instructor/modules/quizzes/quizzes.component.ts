import { Component, OnInit } from '@angular/core';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizzesService } from './services/quizzes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements OnInit{
  allGroups:any
  constructor(private dialog: MatDialog,private _quizzesService:QuizzesService,private _groupsService:GroupsService){}
  ngOnInit(): void {
    this.getAllGroups()
  }
  openAddQuizDialog(): void {
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      data: {groups:this.allGroups},
      width:'55%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        delete result.groups
        this.addNewQuiz(result)
        console.log(result,'res');
        
      }
    });
  }
  addNewQuiz(data:any){
    this._quizzesService.addQuiz(data).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getAllGroups(){
    this._groupsService.getAllGroups().subscribe({
      next:(res)=>{
        console.log(res);
        this.allGroups = res
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
